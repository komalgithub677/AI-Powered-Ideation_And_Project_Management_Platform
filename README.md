🚀 Collaborative AI-Powered Ideation & Project Management Platform

An advanced, intelligent platform built to elevate brainstorming, task planning & team workflow automation.
Powered by MERN + AI Integration (Gemini / ChatGPT API) for smart real-time ideation and project execution.

📌 Overview

Most project-management tools track tasks —
but cannot think, suggest, or ideate like a human brain.

This platform solves that.

It transforms raw ideas into structured tasks using LLM-powered AI
and enables teams to collaborate, visualize, plan & manage projects in one connected system.

✔ AI-driven Ideation
✔ Auto-generated tasks from ideas
✔ Kanban workflow management
✔ Real-time collaboration (Chat + Teams + Notifications)
✔ Analytics Dashboard for insights & performance

✨ Features
Feature	Description
🤖 AI-Powered Idea Generation	Uses Gemini/ChatGPT API for ideation, refinement & expansion
🔥 Automatic Project Structuring	Ideas convert into tasks & milestones instantly
📌 Kanban Board	To-Do → In-Progress → Completed workflow
💬 Real-Time Chat	Team messaging with live sync
📊 Analytics Dashboard	Team insights, performance, task metrics
🔐 Role Based Auth	Admin / Member access control
🗂 Documents + Version History	Upload & maintain multiple versions
🔔 Smart Notifications	Alerts for updates, completion & status change
🔧 Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS, Material UI
Backend	Node.js, Express.js
Database	MongoDB / MongoDB Atlas
AI Engine	Gemini API or ChatGPT API Integration
Hosting	Vercel (FE) + Render/AWS/Node VM (BE)
Tools	Git, GitHub, VS Code
🤖 AI Integration (Gemini + ChatGPT)

The platform supports hybrid AI integration, meaning you can connect:

AI Model	Use-Case
Google Gemini AI	Vision + text reasoning + brainstorming
OpenAI GPT (ChatGPT API)	Creativity, task breakdown, project planning
Hybrid Mode	Both work together — best results
AI Performs:

✔ Idea Expansion
✔ Keyword Extraction
✔ Similar Idea Identification
✔ Auto Task Generation
✔ Document Summary + Suggestions
✔ Smart Recommendations for Scheduling

🔥 AI Workflow
User submits idea
    ↓
Backend sends it to Gemini/ChatGPT API
    ↓
AI generates suggestions, workflows, tasks
    ↓
Backend structures result into project board
    ↓
UI displays tasks, insights & actions to team

🗂 Database Design — E-R Model
Entity	Attributes
User	UserID, Name, Email, Password, Role
Project	ProjectID, Title, Description, Owner
Task	TaskID, ProjectID, AssignedTo, Status, Deadline
Chat	MessageID, UserID, ProjectID, Message, Timestamp
Document	FileID, Version, Uploader, Date
Analytics	Completion Rate, Suggestions, Active Members
📐 System Architecture
┌────────────┐       ┌─────────────┐       ┌───────────┐
│  Frontend  │  →→→  │  Backend    │  →→→  │ MongoDB DB│
│ (React.js) │       │ (Node + Exp)│       │           │
└────────────┘       └───────┬─────┘       └─────┬─────┘
                             │                AI Engine
                             │          (Gemini/ChatGPT API)
                             └───────────────────────────────

📝 Algorithm Summary

Idea Submission & Validation

Keyword Extraction + Idea Understanding

AI Processing (Gemini/ChatGPT)

Similarity Check + Collaboration Suggestion

Automatic Project + Task Generation

Task Assignment by Roles

Notifications + Real-time Updates

Sync to Database + Analytics Record Update

📸 UI Screens (From Report)

🟦 Login | 🟦 Signup | 🟦 Dashboard
🟦 Teams | 🟦 Tasks | 🟦 Idea Generation
🟦 Notifications | 🟦 Calendar | 🟦 Profile Panel

(Add screenshots here in /assets/images)

👥 Project Team
Member	Exam No.	Role
Swayam Ritesh Ingle	—	Developer
Monika Rajendra Jadhav	—	Developer
Tejas Lahu Kamble	—	Developer
Komal Mahadev Narawade	—	Lead Developer

Guide: Prof. Anoop Kushwaha
College: Alard College of Engineering & Management, Pune
University: Savitribai Phule Pune University (SPPU)

📚 References

Academic references, journals & research papers are listed inside /report/References.
