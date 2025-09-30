let publicKey = null;
let privateKey = null;
let passphraseHash = null; // store hashed password

// Utility: Convert ArrayBuffer <-> Base64
function ab2b64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
function b642ab(base64) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

// Hash function (SHA-256 for passphrase)
async function hashText(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return ab2b64(hashBuffer);
}

// Generate RSA Key Pair
document.getElementById("generateKeys").addEventListener("click", async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true, // extractable
    ["encrypt", "decrypt"]
  );

  publicKey = keyPair.publicKey;
  privateKey = keyPair.privateKey;

  // Ask user for a passphrase
  const passphrase = prompt("Set a passphrase for decryption (don’t forget it!):");
  if (passphrase) {
    passphraseHash = await hashText(passphrase);
    localStorage.setItem("notePassphrase", passphraseHash);
    alert("RSA Key Pair Generated ✅\nPassphrase set for decryption.");
  } else {
    alert("Passphrase is required! Keys not saved.");
    publicKey = null;
    privateKey = null;
  }
});

// Encrypt & Save Note
document.getElementById("encryptBtn").addEventListener("click", async () => {
  if (!publicKey) return alert("Generate keys first!");

  const note = document.getElementById("noteInput").value;
  if (!note) return alert("Write something!");

  const encoded = new TextEncoder().encode(note);

  const encrypted = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    encoded
  );

  const encryptedB64 = ab2b64(encrypted);
  localStorage.setItem("secureNote", encryptedB64);

  document.getElementById("encryptedNote").textContent = encryptedB64;

  // Clear text box for safety
  document.getElementById("noteInput").value = "";

  alert("Note encrypted and saved locally! 🔒");
});

// Decrypt Note (requires passphrase)
document.getElementById("decryptBtn").addEventListener("click", async () => {
  if (!privateKey) return alert("Generate keys first!");

  const encryptedB64 = localStorage.getItem("secureNote");
  if (!encryptedB64) return alert("No saved note!");

  const storedHash = localStorage.getItem("notePassphrase");
  if (!storedHash) return alert("No passphrase stored!");

  // Ask for passphrase
  const inputPass = prompt("Enter your passphrase to decrypt:");
  const inputHash = await hashText(inputPass);

  if (inputHash !== storedHash) {
    return alert("❌ Unauthorized: Wrong passphrase!");
  }

  const encryptedArray = b642ab(encryptedB64);

  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      encryptedArray
    );

    const decoded = new TextDecoder().decode(decrypted);
    document.getElementById("decryptedNote").textContent = decoded;
  } catch (err) {
    alert("Decryption failed ❌ (Wrong key or corrupted data)");
  }
});
