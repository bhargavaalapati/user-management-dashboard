<div align="center">
    <img src="./public/dashboard-graph.svg" alt="User Management Dashboard Logo" width="110"/>

# 📊 User Management Dashboard

### Modern • Responsive • CRUD Operations • React + Vite

A clean and responsive **User Management Dashboard** built with **React**, **Vite**, and **Tailwind CSS**, interacting with the **JSONPlaceholder REST API** to demonstrate complete CRUD workflows, search, pagination, validation, and reusable component architecture.

<br>

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

</div>

---

## ✨ Overview

Managing users efficiently requires an intuitive interface, responsive interactions, and clean architecture. This project demonstrates a production-inspired **User Management Dashboard** capable of performing CRUD operations using the **JSONPlaceholder Mock REST API** while maintaining a scalable React component architecture.

The application focuses on:
- 📋 User listing
- ➕ Create users
- ✏️ Update user information
- 🗑 Delete users (with safety interceptors)
- 🔍 Instant search & sorting
- 📄 Dynamic Pagination
- ✅ Client-side Form validation
- ⚡ Responsive UI
- 🧪 Unit testing

---

## 🚀 Live Demo & Walkthrough

| Resource | Link |
|----------|------|
| 🌐 Live Application | **[Insert Vercel/Netlify Link Here]** |
| 🎥 Video Walkthrough | **[Insert Loom/YouTube Link Here]** |

---

## 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React 18 |
| Bundler | Vite |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Testing | Vitest |
| API | JSONPlaceholder |

---

## 📂 Project Structure

```text
src/
├── api/             # Axios API service layer (userService.js)
├── components/      # Reusable UI components (UserTable, Pagination, UserForm, ConfirmDelete)
├── hooks/           # Custom React hooks (useUsers state management)
├── utils/           # Pure utility functions and validators (validators.js)
├── App.jsx          # Main application orchestrator
└── main.jsx         # React entry point

```

---

## ⚙️ Installation & Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd user-management-dashboard

```


2. **Install Dependencies**
```bash
npm install

```


3. **Start Development Server**
```bash
npm run dev

```


*Application runs at `http://localhost:5173*`

4. **Run Tests**
```bash
npm run test

```



---

## 🧠 Engineering Decisions & Assumptions

Since JSONPlaceholder is a generic mock REST API, several client-side strategies were implemented to meet business requirements:

1. **Name Parsing:** The API returns a single `name` field (e.g., "Leanne Graham"). The custom `useUsers` hook splits this internally into `firstName` (Leanne) and `lastName` (Graham).
2. **Department Mapping:** The API provides no department information. Departments are assigned deterministically using `departments[user.id % departments.length]` to keep assignments consistent across renders without backend support.
3. **Local CRUD State:** Although JSONPlaceholder accepts POST, PUT, and DELETE requests, it does not permanently store changes. The `useUsers()` hook maintains local React state so that new users appear instantly, updates reflect immediately, and deleted users disappear without a browser refresh.

---

## ⚠ Challenges Faced

**Duplicate IDs on POST:**
JSONPlaceholder always returns `id: 11` for newly created users. To prevent duplicate React keys and UI rendering bugs in the data grid, locally created users receive `Date.now()` as a fallback unique identifier.

---

## 🚀 Future Improvements

If expanded into a production application, the following enhancements would be implemented:

* **Global State Management:** Replace prop drilling with Redux Toolkit or Zustand.
* **Debounced Search:** Implement a reusable `useDebounce()` hook to minimize unnecessary renders while typing.
* **Server-side Pagination:** Instead of slicing arrays locally, pass parameters to the backend (`GET /users?page=2&limit=10`).

---

*Made with ❤️ using React, Vite & Tailwind CSS*