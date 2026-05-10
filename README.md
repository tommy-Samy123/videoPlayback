<div align="center">

# ⏩ Video Speed Controller

**A sleek and intelligent Chrome Extension to seamlessly control video playback speed across the web.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

</div>

## ✨ Features

- **Quick Shortcuts:** Effortlessly slow down (`S`) or speed up (`D`) the current video without touching your mouse.
- **Smart Detection:** Automatically disables shortcuts when you are typing in search bars, comment fields, or any text area to prevent accidental speed changes.
- **In-Page Overlay:** A beautiful, glassmorphic UI overlay instantly appears in the top-right corner to display the current speed whenever adjustments are made.
- **YouTube Full-Screen Ready:** The overlay seamlessly injects itself into full-screen containers, ensuring your controls are always visible during your movie or lecture.
- **Extension Popup:** Access precise speed controls through a polished toolbar popup, completely synced with the video's active state.

## 🚀 Installation

Currently, this extension can be installed as an unpacked extension in Google Chrome.

1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle the **Developer mode** switch ON in the top right corner.
4. Click the **Load unpacked** button in the top left corner.
5. Select the `videoPlayback` directory you just downloaded.
6. **Pin the extension** to your toolbar for quick access!

## 🎮 How to Use

1. Navigate to any website playing a video (e.g., YouTube).
2. Ensure you are not actively focused on a text input field.
3. Press <kbd>D</kbd> to speed up the video by `0.1x`.
4. Press <kbd>S</kbd> to slow down the video by `0.1x`.
5. *Alternatively*, click the extension icon in your browser toolbar to use the dedicated control slider.

## 🛠️ Technology Stack

- **Manifest V3** for modern, secure Chrome Extension architecture.
- **Vanilla JavaScript** for high-performance, dependency-free content injection.
- **Modern CSS** with glassmorphism and subtle animations.

## 📄 License

This project is licensed under the MIT License.
