## Construction DPR App

A small, single–page React app for **daily progress reporting (DPR)** on construction projects. It includes:

- **Login** screen with mock authentication
- **Project list** with filters and attractive card UI
- **DPR form** with validation, worker count, weather, and photo upload (with previews)

Built with **React + Vite + React Router + Tailwind CSS**.

### 1. Getting started

- **Install dependencies**:

```bash
npm install
```

- **Run the dev server**:

```bash
npm run dev
```

Then open the printed URL in your browser (by default `http://localhost:5173`).

### 2. Login

- **Demo credentials**:
  - **Email**: `test@test.com`
  - **Password**: `123456`
- On successful login you are redirected to the **Project List**.
- Invalid credentials show a **friendly error message**.

### 3. Screens

- **Login**
  - Email + password fields
  - Basic client-side validation
  - Mock auth against the demo credentials

- **Project List**
  - Static list of 3–5 projects (see `src/constants/projects.js`)
  - Cards show **name, status badge, progress, start date, location, PM, budget**
  - **Search** by name and **filter** by status/location
  - Click a project card to open the **DPR Form** for that project

- **DPR Form**
  - Project dropdown (preselected when navigating from a card)
  - Fields:
    - Date (date input)
    - Weather (Sunny / Cloudy / Rainy / Windy)
    - Work description (textarea with character counter)
    - Worker count (number input)
    - Photo upload (1–3 images with thumbnail previews)
  - Full client-side validation with **clear, user-friendly messages**
  - On submit:
    - DPR data is logged to the console
    - A **success toast** appears
    - User is navigated back to the **Project List** shortly after

### 4. Routing

Routing is handled with **React Router** (`react-router-dom`):

- `/` → `Login`
- `/projects` → `ProjectList`
- `/dpr/:id` → `DPRForm` for a specific project

### 5. Project structure (src)

- `pages/`
  - `Login.jsx`
  - `ProjectList.jsx`
  - `DPRForm.jsx`
- `components/`
  - `ProjectCard.jsx`
  - `PhotoUpload.jsx`
  - `Toast.jsx`
  - `SearchFilter.jsx`
- `constants/`
  - `projects.js`
- `App.jsx`, `main.jsx`, `index.css`

### 6. Styling & responsiveness

- **Tailwind CSS** for styling (`index.css` wires Tailwind layers)
- **Mobile‑first** layout:
  - Stacks nicely on small screens
  - Expands to multi‑column layouts on tablet/desktop
- No horizontal scrolling on common breakpoints (375px, 768px, 1280px+)

You can freely extend this project with features like dark mode, DPR history, or API integration.
