# AnonDev - Anonymous Developer Reviews Platform

-**Live:-** https://anondev-three.vercel.app/

-**Frontend source code:** https://github.com/Shrawan0701/anondev

AnonDev is a full-stack web platform for software developers to anonymously share work experiences and company reviews. The platform provides a safe space for developers to share insights about work culture, salary, management, and more.  

---

## Features

- **Anonymous Posting:** Users can create posts without revealing their identity.
- **Post Feed:**  
  - Default view shows **popular posts** based on upvotes.  
  - Option to view **recent posts**.
- **Voting System:** Users can **upvote** or **downvote** both posts and comments.
- **Commenting:** Users can comment on posts and engage with others’ experiences.
- **Search & Filter:** Search posts by company name for targeted insights.


---

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Java Spring Boot  
- **Database:** PostgreSQL  
- **Hosting:** Vercel (Frontend), Render (Backend & DB)  

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/Shrawan0701/anondev.git
cd anondev
```
2. **Backend setup**
```bash
DB_HOST=<your-db-host>
DB_PORT=<your-db-port>
DB_NAME=<your-db-name>
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
```
3. **Run Spring Boot server**
```bash
./mvnw spring-boot:run
```
4. **Frontend setup**
```bash
cd frontend
npm install
npm start
```

