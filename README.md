# 🌈 ManifestAI – Your AI-Powered Vision Board Generator ✨

ManifestAI turns your dreams, thoughts, and intentions into a stunning AI-generated **vision board**. Just answer a few soulful questions, and let AI visualize your goals in a personalized, artistic way.

---

## ✨ Features

- 🔐 **Google Login** – Simple and secure authentication.
- 🧠 **Meaningful Questions** – Curated prompts to bring out your authentic goals and desires.
- 🤖 **OpenAI Integration** – Generates a descriptive master prompt based on your answers.
- 🖼️ **Replicate API (BlackForest)** – Generates 6 AI images from separate sub-prompts to match your dreams.
- 🧩 **Custom Collage Layouts** – Multiple layout options with 6-image auto-fit grids.
- 📥 **Download Options** – Export your board in Instagram Post, Story, LinkedIn, and custom sizes.
- 📤 **Share-Friendly** – Easily share on platforms like Twitter, Facebook, and LinkedIn.
- 🪄 **Aesthetic UI/UX** – Animated transitions, beautiful backgrounds, motivational facts, and vibrant color themes.

---

## 📖 About the Project

**Manifest.ai** was built by a team of three with a shared vision: help people gain clarity on their goals and bring them to life in a way that feels inspiring and personal.

We were inspired by how many people struggle to articulate what they really want—let alone visualize it. We realized traditional vision boards were either too time-consuming or too superficial. So we created a tool that could do more: guide users through meaningful questions and instantly turn their answers into beautiful, AI-generated boards that actually reflect who they are.

---

## 🔍 What We Learned

- People open up when you ask the right questions.
- Visual clarity often leads to mental clarity.
- Design and emotion matter just as much as functionality.

---

## 🛠️ How We Built It

We combined a thoughtfully crafted questionnaire with an AI layer that interprets user responses and generates a cohesive vision board using OpenAI + Replicate API. The frontend is built with **Next.js**, **TailwindCSS**, and **Framer Motion** for smooth, animated UI. The backend processes prompts and image generation and formats everything into beautiful layouts, downloadable and shareable with a single click.

---

## 🚧 Challenges We Faced

- Balancing depth and simplicity in the questionnaire — too complex and users felt overwhelmed; too simple and it lost meaning.
- Ensuring consistent aesthetic quality across all generated vision boards.
- Keeping users engaged after their first visit, which led us to add layout choices and share/download functionality.
- Handling image overflow, responsiveness, and download/export accuracy in complex grid layouts.

---

## 💻 Tech Stack

- **Next.js 14**
- **TypeScript**
- **TailwindCSS**
- **Firebase Auth**
- **OpenAI (GPT-4 / gpt-3.5-turbo)**
- **Replicate (BlackForest Flux)**
- **Framer Motion**
- **html-to-image**

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/manifestai.git
cd manifestai
