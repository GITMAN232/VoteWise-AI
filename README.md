# VoteWise AI – Election Assistant 🗳️🤖

**VoteWise AI** is a complete, production-ready interactive web application designed to help users understand the election process, timelines, and voting steps in a simple, engaging, and personalized way.

## 🌟 Features

1. **AI Chat Assistant**: A ChatGPT-style interface powered by Google Gemini API.
2. **User Personalization**: Tailored guidance for First-time voters, General voters, and NRI voters.
3. **Step-by-Step Voting Guide**: Interactive cards displaying crucial voting steps based on user type.
4. **Election Timeline Visualizer**: A beautiful horizontal timeline showing all election phases.
5. **Booth Locator**: A quick mock feature to search for the nearest polling booth via PIN code.
6. **Smart Decision Logic**: The AI dynamically renders interactive UI components directly into the chat based on your questions!

## 🛡️ API Key Security Note

For this hackathon prototype, the Google Gemini API is called directly from the frontend using environment variables for simplicity and performance.

In a production environment, this would be secured using a backend proxy to prevent API key exposure.

## 🚀 Tech Stack

- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Google GenAI SDK (`@google/genai`)

## 🛠️ Setup Instructions

1. **Clone the repository:**
   \`\`\`bash
   git clone <repo-url>
   cd VoteWise-AI
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Environment Variables:**
   Create a \`.env\` file in the root directory and add your Google Gemini API key:
   \`\`\`env
   VITE_GEMINI_API_KEY=your_key_here
   \`\`\`

4. **Run the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🧠 How It Works

- The app utilizes \`UserContext\` to maintain the selected user demographic, allowing the chatbot to contextualize responses.
- It uses \`ChatContext\` to manage the history of the conversation, sending engineered prompts to the Gemini API.
- If Gemini detects an intent related to voting steps, timelines, or polling booths, it outputs a special token. The React frontend intercepts this token and dynamically renders the appropriate UI component right into the chat stream!

## 📌 Assumptions Made

- The Gemini API model \`gemini-2.5-flash\` is used for rapid responses.
- The polling booth locator uses mock data to keep the setup lightweight and simple, designed to be swapped with Google Maps API later.
