# 🚀 AI-Powered Ideation and Project Management Platform

An intelligent and collaborative **AI-powered project management platform** developed using **Java Full Stack technologies**.  
The platform integrates **Spring Boot**, **React.js**, **JWT Authentication**, and **AI APIs (OpenAI/Gemini)** to help users generate innovative project ideas, manage teams, organize workflows, and improve productivity.

The application provides:
- AI-powered idea generation
- Team collaboration
- Task and project management
- Real-time notifications
- Invitation management
- Secure authentication & authorization
- Responsive modern dashboard UI

---

# 📌 Features

## 🤖 AI Features
- AI-based project idea generation
- Smart workflow recommendations
- Intelligent task planning
- AI-assisted productivity enhancement

---

## 🔐 Authentication & Security
- JWT Authentication
- Role-Based Access Control (RBAC)
- Spring Security Integration
- Protected REST APIs
- Secure Login & Registration

---

## 📋 Project Management
- Create and manage tasks
- Team collaboration system
- Kanban-style workflow
- Event management
- Notifications & invitations

---

## 👥 Team Collaboration
- Invite team members
- Manage teams
- Shared project environment
- Task assignment system

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Context API
- Tailwind CSS
- Axios
- React Router

## Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs

## Database
- MySQL

## AI Integration
- OpenAI API / Gemini API

## Tools
- Git & GitHub
- Maven
- Postman
- VS Code / IntelliJ IDEA

---

# 📂 Project Structure

```bash
AI-Powered-Ideation_And_Project_Management_Platform/
│
├── backend/
│   ├── src/main/java/com/rbac/auth/
│   │
│   ├── config/
│   │   ├── CorsConfig.java
│   │   └── SecurityConfig.java
│   │
│   ├── controller/
│   │   ├── AIController.java
│   │   ├── EventController.java
│   │   ├── InvitationController.java
│   │   ├── NotificationController.java
│   │   ├── TaskController.java
│   │   ├── TeamController.java
│   │   └── UserController.java
│   │
│   ├── dto/
│   │   ├── CreateTaskRequest.java
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   └── RegisterRequest.java
│   │
│   ├── entity/
│   │   ├── Event.java
│   │   ├── Invitation.java
│   │   ├── Notification.java
│   │   ├── Role.java
│   │   ├── Task.java
│   │   ├── Team.java
│   │   └── User.java
│   │
│   ├── exception/
│   │   └── GlobalExceptionHandler.java
│   │
│   ├── mapper/
│   │   └── UserMapper.java
│   │
│   ├── repository/
│   │   ├── EventRepository.java
│   │   ├── InvitationRepository.java
│   │   ├── NotificationRepository.java
│   │   ├── TaskRepository.java
│   │   ├── TeamRepository.java
│   │   └── UserRepository.java
│   │
│   ├── security/
│   │   ├── JwtAuthenticationFilter.java
│   │   └── JwtService.java
│   │
│   ├── service/
│   │   ├── AiService.java
│   │   ├── EmailService.java
│   │   ├── EventService.java
│   │   ├── InvitationService.java
│   │   ├── NotificationService.java
│   │   ├── TaskService.java
│   │   ├── TeamService.java
│   │   └── UserService.java
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Calendar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── IdeaGeneration.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── Notifications.jsx
│   │   ├── Profile.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SignupPage.jsx
│   │   ├── Tasks.jsx
│   │   └── Teams.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── TeamContext.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── index.js
│
├── .gitignore
├── .project
└── README.md
```

---

# ⚙️ Backend Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/komalgithub677/AI-Powered-Ideation_And_Project_Management_Platform.git
```

---

## 2️⃣ Navigate to Backend Folder

```bash
cd backend
```

---

# 🗄️ Configure Database

Open:

```bash
src/main/resources/application.properties
```

Replace the database credentials according to your MySQL setup.

## Example Configuration

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/rbac_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# ================= MAIL CONFIG =================
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_APP_PASSWORD

spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.ssl.trust=smtp.gmail.com
spring.mail.properties.mail.smtp.starttls.required=true

# ================= OPENAI CONFIG =================
openai.api.key=YOUR_OPENAI_API_KEY
```

---

# ⚠️ Important Note

For security reasons:

❌ Do NOT use the original database password, mail password, or API key directly from this repository.

Every user should replace:
- MySQL Password
- Gmail App Password
- OpenAI API Key

with their own credentials before running the project.

---

# 📧 Gmail App Password Setup

To enable email functionality:

1. Enable 2-Step Verification in Gmail
2. Generate App Password
3. Replace:

```properties
spring.mail.password=YOUR_APP_PASSWORD
```

---

# 🤖 OpenAI API Key Setup

Replace:

```properties
openai.api.key=YOUR_OPENAI_API_KEY
```

with your own OpenAI key.

---

# ▶️ Run Backend

## Install Dependencies

```bash
mvn clean install
```

## Start Backend Server

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 💻 Frontend Setup

## Navigate to Frontend Folder

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Frontend

```bash
npm run dev```

Frontend runs on:

```bash
http://localhost:3000/5173
```

---

# 🔐 Authentication Flow

1. User Registration/Login
2. JWT Token Generation
3. JWT Validation using `JwtAuthenticationFilter`
4. Secure API Authorization

---

# 📡 API Modules

| Module | Description |
|--------|-------------|
| AI API | AI-powered idea generation |
| User API | Authentication & user management |
| Task API | Task management |
| Team API | Team collaboration |
| Event API | Event handling |
| Invitation API | Invitation management |
| Notification API | Notification system |

---

# 🎨 Frontend Components

| Component | Purpose |
|-----------|---------|
| Dashboard.jsx | Main dashboard |
| IdeaGeneration.jsx | AI idea generation |
| KanbanBoard.jsx | Task workflow management |
| Tasks.jsx | Task management |
| Teams.jsx | Team collaboration |
| Notifications.jsx | Notification system |
| LoginPage.jsx | User login |
| SignupPage.jsx | User registration |
| Profile.jsx | User profile |
| Calendar.jsx | Event scheduling |

---

# 🔒 Security Features

- JWT Authentication
- Spring Security
- RBAC Authorization
- Protected Routes
- CORS Configuration
- Global Exception Handling

---

# 🌟 Future Enhancements

- Real-time Chat
- Video Meeting Integration
- AI Analytics Dashboard
- Mobile Application
- Cloud Deployment
- Drag & Drop Kanban Workflow

---

# 👩‍💻 Author

## Komal Narawade

- GitHub: https://github.com/komalgithub677

---

# ⭐ Project Highlights

✔ Java Full Stack Project  
✔ AI Integration  
✔ Secure REST APIs  
✔ JWT Authentication  
✔ Spring Boot Backend  
✔ React Frontend  
✔ Production-Level Architecture  
✔ Team Collaboration Platform  

---

# 📄 License

This project is developed for educational and learning purposes.

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.
