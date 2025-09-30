# Secure-Encrypted-Notes-Storage-using-RSA-and-Passphrase-Authentication

## Overview
The Secure Notes App is a simple web application that allows users to write, encrypt, and store personal notes securely in their browser. It uses RSA asymmetric encryption via the Web Crypto API to ensure that notes remain private and can only be decrypted by the authorized user with the correct passphrase.

This mini project demonstrates a practical use of cryptography for secure local data storage in a browser environment.

## Features

RSA Key Pair Generation: Generates a public/private key pair for encryption and decryption.

Encrypt & Save Notes: Encrypt notes with the public key and save them safely in localStorage.

Passphrase Protection: Only the user who knows the passphrase can decrypt the note.

Decrypt Notes: Retrieve and decrypt notes securely using the private key and passphrase.

Safe UI: After encryption, plaintext is cleared from the input box for safety.

Dark Mode Interface: Stylish black/dark UI for a modern look.

## Technologies Used

HTML – User interface structure

CSS – Styling and dark mode interface

JavaScript – RSA encryption/decryption logic with Web Crypto API

Browser LocalStorage – Securely store encrypted notes

## How to Use

Clone the repository or download the project folder.

Open the project in VS Code.

Launch with Live Server (recommended) to run in a secure context.

Generate RSA Keys: Click “Generate Keys” and set a passphrase.

Write a Note: Enter your note in the textarea.

Encrypt & Save: Click “Encrypt & Save” to store the note. The text box will clear automatically.

Decrypt Note: Click “Decrypt & Show” and enter your passphrase to view the note.

## Security Notes

Notes are encrypted using RSA-OAEP (2048-bit) for strong security.

A passphrase adds an extra layer of authorization.

Encrypted notes are stored in browser localStorage – the app works offline.

The plaintext note is cleared after encryption for safety.
