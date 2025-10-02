# HireTone 🎤

HireTone is a **full-stack real-time AI voice interview platform** that enables automated, human-like interview experiences using live audio, AI-driven questioning, and transcript generation.  
It integrates **Firebase** for authentication/storage, **VAPI** for real-time audio streaming, and **Google Generative AI** for intelligent responses.


> ⚠️ **Note:** The live demo may not work properly because **VAPI has changed its policy** and no longer offers free usage.  
> To use this project fully, you will need to configure your own **VAPI credentials**.

---

## ✨ Features

- 🎙️ **AI-Powered Voice Interviews** – Conduct interactive, real-time voice-based interviews.  
- 🗣️ **Speech-to-Text & Text-to-Speech** – Converts candidate speech into text and responds with natural voice.  
- 🤖 **AI-Driven Interview Logic** – Dynamically adapts questions and evaluates responses.  
- 📜 **Transcript & Scoring** – Generates transcripts and performance insights after each interview.  
- 🌐 **Responsive Web App** – Modern, mobile-friendly UI built with Next.js and Tailwind CSS.  

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS  
- **Backend / API**: Next.js server routes  
- **Database & Auth**: Firebase (Auth, Firestore, Storage)  
- **AI / NLP**: Google Generative AI API  
- **Voice Streaming**: VAPI (Voice Agent API) for real-time audio conversations  
- **Hosting**: Vercel  

---

## 📂 Project Structure
```bash
/
├─ app/ # App Router pages & APIs
├─ components/ # Reusable UI components
├─ constants/ # Config and constants
├─ firebase/ # Firebase setup
├─ lib/ # Utility functions
├─ public/ # Static assets
├─ types/ # TypeScript types
├─ package.json # Dependencies & scripts
└─ ...
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js **18+**  
- npm / yarn / pnpm
- Firebase project credentials  
- Google Generative AI API key  
- VAPI (Voice Agent API) credentials  

### Installation
```bash
git clone https://github.com/ArunVarma78/HireTone.git
cd HireTone
npm install
```

### Environment Variables
Create a .env.local file in the project root and add:
```bash
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google Generative AI
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_api_key

# VAPI Config
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id
```

### Run Locally
```bash
npm install
npm run dev
```
Visit: http://localhost:3000

---

## 🚀 Deployment

HireTone is optimized for Vercel:
1. Push your code to GitHub.
2. Import into Vercel dashboard.
3. Add all environment variables in Vercel → Project Settings → Environment Variables.
4. Deploy with one click.

Live demo: https://hiretone.vercel.app