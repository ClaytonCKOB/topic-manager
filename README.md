# Topic Manager

A meeting management system that enables organizations to organize, track, and vote on discussion topics during meetings.

## What It Does

Topic Manager is a collaborative meeting platform that allows administrators to create structured meetings with hierarchical topics and subtopics. Participants can review meeting agendas, attach relevant documents, and vote on topics to prioritize discussions. The system automatically sends email invitations to new users and maintains a complete history of meetings, topics, and voting outcomes.

**Functionalities:**
- Create meetings with structured agendas (topics and nested subtopics)
- Attach PDF files to any topic for context
- Invite users via email with role-based access (Admin/Participant)
- Vote on topics to measure participant preferences
- Track meeting participants and their engagement
- Manage action items arising from meetings

---

### Technologies

**Frontend Layer**
- **Framework**: React 19 with Vite
- **UI Library**: Material-UI (MUI) for consistent design
- **State Management**: React hooks and local component state
- **Routing**: React Router for client-side navigation
- **HTTP Client**: Axios with interceptors for authentication
- **Build Tool**: Vite for fast development and optimized production builds

**Backend Layer**
- **Framework**: Spring Boot 3.5 with Java 17
- **Security**: Spring Security with JWT-based authentication
- **Database**: PostgreSQL with Flyway for schema migrations
- **Email**: JavaMailSender for invitation notifications
- **API**: RESTful endpoints with JSON payloads
- **Build Tool**: Maven for dependency management

**Data Layer**
- **Database**: PostgreSQL 12+
- **ORM**: Spring Data JPA with Hibernate
- **Migrations**: Flyway for version-controlled schema changes
- **Connection Pooling**: HikariCP (default in Spring Boot)

---

## License

MIT License
