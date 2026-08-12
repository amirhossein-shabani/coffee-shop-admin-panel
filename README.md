# Restaurant Admin Panel

A React-based admin dashboard for managing the restaurant menu system.

This project is built with **React + Vite** and uses **Supabase** as the backend for authentication, database, and storage.

> **Status:** 🟡 In Development
> The core admin functionality is implemented, but some sections and features are still under development.

---

## ✨ Features

### 🔐 Authentication & Authorization

- Admin login
- Supabase Authentication
- Protected routes
- Session persistence
- Role-based access control
- Support for different user roles such as:
  - `admin`
  - `viewer`

- Profile loading and authorization handling
- Protected admin routes

### 📋 Menu Management

- View menu items
- Search menu items
- View menu item details
- Add menu items
- Edit menu items
- Delete menu items
- Upload menu item images
- Manage menu item categories
- Support for suggested/recommended items

### 🗂️ Category Management

- View categories
- Add categories
- Edit categories
- Delete categories
- Upload category images

### ⚙️ Restaurant Settings

Manage restaurant information including:

- Address
- Telephone numbers
- Email
- Description
- Opening and closing times
- Instagram
- Telegram
- Landing page text
- Logo
- Background image
- Coffee bean image

### 🖼️ Supabase Storage

The admin panel uses Supabase Storage for managing uploaded images.

Storage buckets include:

- `categorie-images`
- `items-images`
- `setting`

### 🔄 Data Fetching

The application uses **TanStack Query (React Query)** for:

- Server state management
- Caching
- Loading states
- Error handling
- Mutations
- Query invalidation

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- Tailwind CSS

### State & Data Management

- TanStack Query
- React Hook Form

### Backend

- Supabase
  - Authentication
  - PostgreSQL Database
  - Storage
  - Row Level Security (RLS)

### UI & Utilities

- SweetAlert2
- React Icons

---

## 📁 Project Structure

```text
src/
├── components/      # Reusable UI components
├── contexts/        # React contexts
├── hooks/           # Custom React Query and application hooks
├── layouts/         # Application layouts
├── pages/           # Application pages
├── routes/          # Route configuration
├── services/        # Supabase/API service functions
├── utils/           # Utility functions
├── App.jsx
└── main.jsx
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

> Never commit your `.env` file or other files containing secret credentials to Git.

The required environment variables must also be configured in the deployment platform.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add the required Supabase variables.

### 4. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

### 5. Build for production

```bash
npm run build
```

---

## 🔒 Security

The project uses Supabase Row Level Security (RLS) to control access to database resources.

Different operations are restricted based on the authenticated user's role.

For example:

- Public users can read appropriate public data.
- Authenticated administrators can create, update, and delete protected data.
- Viewer users have more limited permissions.

Authentication and authorization are handled through Supabase Auth and application-level route protection.

---

# 🚧 Current Development Status

The main admin functionality is implemented, but the project is **not considered fully complete yet**.

The following areas still need additional development.

### 👥 User Management — Planned

A dedicated User Management section still needs to be implemented.

Planned functionality includes:

- Create users internally from the admin panel
- View existing users
- Change user roles
- Update user information
- Manage administrator/viewer permissions
- Possibly disable or remove users
- Improve the overall user/role management workflow

A dedicated route and UI for this functionality still need to be added.

---

### 📊 Dashboard — Needs Improvement

The Dashboard currently exists, but it does not yet provide meaningful application data.

It should eventually include useful statistics and information such as:

- Number of menu items
- Number of categories
- Number of users
- Restaurant status
- Recently added items
- Recently modified items
- Other useful restaurant management statistics

The Dashboard UI and data layer still need to be expanded.

---

### 🔐 Authentication Improvements

The authentication system is functional, but further testing and refinement are still required.

Possible future improvements include:

- Better error handling
- Improved session handling
- More complete role-based authorization
- Better feedback for unauthorized users
- Password management
- Additional authentication-related UX improvements

---

### 🎨 UI/UX Improvements

Some parts of the admin panel still require visual and UX refinement.

Planned improvements include:

- More consistent loading states
- Better empty states
- Improved error states
- Responsive design improvements
- UI consistency across pages
- Accessibility improvements
- General visual polish

---

## 🗺️ Roadmap

- [x] Admin authentication
- [x] Protected routes
- [x] Role-based authorization
- [x] Menu item management
- [x] Category management
- [x] Restaurant settings
- [x] Supabase Storage integration
- [x] React Query integration
- [x] Form handling
- [x] Image upload functionality
- [ ] User Management
- [ ] Internal user creation
- [ ] Role management UI
- [ ] Dashboard statistics
- [ ] Dashboard data visualization
- [ ] Authentication refinements
- [ ] UI/UX refinements
- [ ] Final production testing
- [ ] Production deployment

---

## 📌 Notes

This project is being developed as the administration panel for a restaurant menu and reservation system.

The customer-facing application is maintained separately from this repository.

The project is currently functional for the main restaurant management workflows, while several administrative features are still being developed.
