# LAN File Transfer

A simple web-based file transfer application built with **Python and Flask**.  
It allows devices on the **same local network (LAN)** to upload, download, and manage files through a clean web interface — no cables, no external services.

This project is intentionally lightweight and framework-free on the frontend.

---

## ✨ Features

- 📤 Upload single or multiple files
- 📥 Download files from the host machine
- 🗑 Delete files from the client (with confirmation)
- 📊 Upload progress bar with percentage
- 📱 Mobile-friendly responsive UI
- 💻 Works on **Windows** and **Linux**
- 🌐 Accessible from any device on the same network (phone, tablet, PC)

---

## 🧠 How It Works

- The **host machine** runs a Flask server
- Other devices access it via the host’s **local IP address**
- Files are stored in a local `uploads/` directory
- Frontend uses **plain HTML, CSS, and JavaScript**
- Upload progress is handled with `XMLHttpRequest`

No database, no authentication, no cloud — just local networking.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MikoKB1/LAN-file-transfere
cd lan-file-transfer
