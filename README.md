# NyayaSaathi

### A multilingual, voice-first AI companion for understanding and navigating legal and government processes.

> **You don't need to know the law to start. Just tell NyayaSaathi what happened.**

---

## 🌱 About NyayaSaathi

NyayaSaathi is a multilingual, voice-first AI companion designed to help people understand and navigate legal and government-related processes without requiring them to know complex legal terminology or digital procedures.

Instead of asking users to identify the correct law, form, department, or process, NyayaSaathi starts with the user's real-life situation.

For example, a user can simply say:

> "मेरे मालिक ने मुझे नौकरी से निकाल दिया और मेरी आखिरी तनख्वाह नहीं दी। मुझे समझ नहीं आ रहा क्या करना है।"

NyayaSaathi can then help structure the situation, ask relevant clarifying questions, explain possible next steps, identify useful documents or records, and guide the user through the relevant process.

### Core philosophy

**Start with the person's life, not the law.**

---

## 🎯 Problem

Many people struggle with legal and government systems because:

- Legal terminology is difficult to understand.
- Government processes can be confusing and fragmented.
- Important documents may contain complex language.
- People may not know which department or service they need.
- Digital literacy can be a barrier.
- Language can become an additional barrier.
- Users may not know what information or documents they need.
- Elderly, low-literacy, and digitally inexperienced users may find conventional digital portals difficult to navigate.

NyayaSaathi aims to reduce this initial barrier by allowing users to communicate naturally through **voice or text**.

---

## 💡 Solution

NyayaSaathi combines:

- 🗣️ Natural-language interaction
- 🎙️ Voice-first accessibility
- 🌐 Multilingual assistance
- 📄 AI-powered document understanding
- 🛡️ Document Safety Screening
- 🧭 Step-by-step process guidance
- 📋 Records and pending-work tracking
- 🤝 Trusted Helpers
- 🔔 Reminders and follow-ups

The goal is not to replace lawyers, government officials, or authoritative sources.

The goal is to help users **understand what they are dealing with and what they may need to do next.**

---

## ✨ Key Features

### 🎤 Tell Me What Happened

Users can describe their situation in everyday language instead of knowing the legal name of their problem.

NyayaSaathi can:

1. Understand the user's description.
2. Identify the likely type of issue.
3. Ask simple clarifying questions.
4. Identify potentially relevant documents or evidence.
5. Explain possible next steps.
6. Create a structured process journey.

---

### 📄 Document Understanding

Users can upload a legal or government document and receive a simplified explanation.

The system can help identify:

- Important dates
- Names and parties
- Reference numbers
- Required actions
- Important sections or information
- Potential next steps

The original document remains unchanged.

---

### 🛡️ Document Safety Screening

NyayaSaathi provides a cautious screening layer to identify information that may require verification.

Possible outcomes include:

- 🟢 Looks consistent with available references
- 🟡 Unable to fully verify
- 🟠 Some details appear inconsistent
- 🔴 Strong warning signs — verify with the relevant official authority

This is **not document authentication** and does not guarantee that a document is genuine or legally valid.

---

### 🧭 Process Journey

Instead of presenting users with a long list of instructions, NyayaSaathi can organize a process into understandable steps.

For example:

**Understand → Prepare → Submit → Receive acknowledgement → Follow up → Complete**

Users can see:

- Current step
- Completed steps
- Pending actions
- Required records
- Important dates

---

### 🤝 Trusted Helpers

Users can add a trusted person who can assist them.

Permissions can be controlled individually, such as:

- View process status
- View selected documents
- View simplified explanations
- Upload supporting documents
- Help provide information
- Request an action

Sensitive actions require the user's approval.

---

### 🌐 Multilingual Support

NyayaSaathi is designed around a centralized language system.

Supported languages include:

- Hindi — हिंदी
- English
- Gujarati — ગુજરાતી
- Bengali — বাংলা
- Marathi — मराठी
- Tamil — தமிழ்
- Telugu — తెలుగు
- Kannada — ಕನ್ನಡ
- Malayalam — മലയാളം
- Punjabi — ਪੰਜਾਬੀ
- Odia — ଓଡ଼ିଆ

Once a language is selected, the interface, AI responses, guidance, and voice experience follow that language.

---

### 🔊 Voice-First Accessibility

Voice is a primary interaction method rather than simply a "read aloud" feature.

Users can:

- Ask questions through voice
- Hear page explanations
- Hear document explanations
- Ask for the next step
- Replay or pause explanations
- Continue an explanation
- Use the application with reduced dependence on reading

Every major page provides contextual voice guidance.

---

## 🧠 Generative AI

NyayaSaathi uses **Google Gemini / Google AI Studio** as its core Generative AI technology.

Gemini is used for:

- Natural-language understanding
- Understanding everyday descriptions of problems
- Document understanding
- Information extraction
- Simplifying complex documents
- Multilingual responses
- Step-by-step guidance
- Structured process generation
- Conversational assistance

Gemini Text-to-Speech is used for the voice-first accessibility experience.

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      User            │
                    │ Voice / Text / File  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   NyayaSaathi UI     │
                    │ React + Tailwind     │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       Language Engine    Voice / TTS     Accessibility
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │    Gemini AI         │
                    │ Natural Language     │
                    │ Document Understanding│
                    │ Guidance             │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
       Documents          Process Journey    User Records
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │ Trusted Helpers      │
                    │ & Reminders          │
                    └──────────────────────┘
