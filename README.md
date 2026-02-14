# 🛡️ CodeVault - Secure Ephemeral Clipboard

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blueviolet?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-AES--256-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

> **"Share code, passwords, and secrets securely. No login. No traces. Just a 6-digit PIN."**

CodeVault is a **Zero-Trust Data Transfer Platform** built to solve the problem of sharing sensitive information over insecure channels. It encrypts your text in the browser, stores it temporarily, and allows retrieval via a simple 6-digit PIN before self-destructing.

---

## 🚀 Key Features

### 🔒 **Military-Grade Security**
* **AES-256 Encryption:** Every snippet is encrypted with a unique Initialization Vector (IV). Even the database admin cannot read your data.
* **Zero-Knowledge Architecture:** The server only sees encrypted gibberish.

### ⏳ **Ephemeral by Design**
* **Auto-Destruct:** Uses MongoDB TTL (Time-To-Live) indexes to automatically hard-delete every record **10 minutes** after creation.
* **No Logs:** We do not track IP addresses or user agents.

### ⚡ **High-Speed Transfer Protocol**
* **6-Digit PIN System:** Replaces long, ugly URLs with a simple code (e.g., `842 190`) for easy verbal or cross-device sharing.
* **Smart Detection:** Automatically detects programming languages (Python, C++, SQL, etc.) for accurate syntax highlighting upon retrieval.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas), Mongoose |
| **Security** | Crypto (Node.js native module), CORS, Helmet |
| **Tools** | Git, Vercel (Frontend), Render (Backend) |

---

## 🔧 Installation & Setup

Clone the repository and install dependencies for both frontend and backend.

### **1. Clone the Repo**
```bash
git clone [https://github.com/YOUR_USERNAME/CodeVault.git](https://github.com/YOUR_USERNAME/CodeVault.git)
cd CodeVault
