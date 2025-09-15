# 📸 Photography Portfolio Website

A modern, responsive photography portfolio website built with **React (frontend)** and **Express (backend)**.
Designed for professional photographers to showcase their work, connect with clients, and integrate **AI-powered customer support**.

---

## 🚀 Tech Stack

* **Frontend:** React + TypeScript, Tailwind CSS, React Router
* **Backend:** Express.js, Gemini AI API
* **Other Tools:** EmailJS (for booking requests via contact form)

---

## ✨ Features

* 📂 **Portfolio with Categories** – Organize photos into Events, Portraits, Campus, Beach, Shows, etc.
* 🎨 **Attractive UI/UX Design** – Black-themed, clean layout with grid-based portfolio
* 📧 **Contact Form** – Customers can send booking details; photographer receives email notification via EmailJS
* 🤖 **AI Chatbot (Gemini API)** – Customers can ask questions and get instant AI-powered responses
* 📱 **Responsive Design** – Works across desktop, tablet, and mobile

---

## 📂 Project Structure

```
/project-root
 ┣ 📂 frontend   # React + Tailwind frontend
 ┣ 📂 backend    # Express.js backend with Gemini API integration
 ┗ 📄 README.md  # Project documentation
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/yasindugunasekara/yasindu-gunasekara-photography.git
cd yasindu-gunasekara-photography
```

### 2. Install Frontend

```bash
cd frontend
npm install
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173) to view the frontend.

### 3. Install Backend

```bash
cd ../backend
npm install
node server.js
```

Open your browser at [http://localhost:5000](http://localhost:5000) to see the backend server running.

---

## 📬 Contact & Booking

Visitors can fill in the **Contact Form** with their requirements.
Booking details are automatically sent to your email using **EmailJS**.
✅ You receive instant notifications for new booking requests.

---

## 🤖 AI Chatbot (Gemini API)

Customers can interact with an AI-powered chatbot for quick answers about photography-related services and packages.
Uses **Google Gemini API** for natural conversations.

---

## 🔑 Setup Instructions for API Keys

### 1. EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Get your **Service ID, Template ID, and Public Key**
3. Add them to your frontend `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 2. Gemini API Setup

1. Get an API key from [Google AI Studio](https://ai.google/)
2. Add it to your backend `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

---

## 💻 Usage

* **Frontend:** Users can browse portfolio, check services, and submit booking requests
* **Backend:** Handles contact form submissions and AI chatbot queries
* **AI Chatbot:** Responds automatically to user messages via Gemini API

---

## 📝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make changes and commit (`git commit -m "Add new feature"`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is **open-source** and available under the MIT License.

---

## 👨‍💻 Author

**Yasindu Gunasekara Photography**

