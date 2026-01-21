# Prime Video Clone - High Performance Movie Discovery

A robust, scalable, and clean-coded movie discovery application built with **React 19** and **Vite**, focusing on high-performance filtering and persistent user experience.

## 🏗 Architecture & Principles

This project follows **Clean Architecture** and **SOLID** principles to ensure maintainability and a clear separation of concerns:

- **Repository Pattern**: Abstraction of data sources to allow seamless transition between LocalStorage and future MongoDB integration.
- **Feature-Based Structure**: Modular organization focusing on domain logic (Movies) separated from generic UI components.
- **Persistence Layer**: Custom-built hydration system to sync UI state with `localStorage` without blocking the main thread.
- **Performance First**: Implementation of debouncing, memoization, and optimized asset loading.

## 🚀 Tech Stack

- **Core**: React 19 (Functional Components & Hooks)
- **Build Tool**: Vite (Ultra-fast HMR)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 3.4 (Utility-first CSS)
- **Networking**: Axios with Interceptors
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📂 Project Structure

```text
src/
  ├── assets/             # Static assets (images, global CSS)
  ├── components/
  │   ├── common/         # Reusable UI atoms (Buttons, MovieCards)
  │   └── layout/         # Structural components (Navbar, Footer)
  ├── features/
  │   └── movies/         # Domain-specific logic
  │       ├── hooks/      # Business hooks (useDiscovery)
  │       └── services/   # Data fetching and filtering logic
  ├── hooks/              # Global utility hooks (useDebounce, useLocalStorage)
  ├── pages/              # Route-level components (Home, Details)
  ├── services/           # Infrastructure (API Axios instance)
  └── routes/             # Navigation configuration
```

## 🔧 Setup & Installation

**Clone the repository**

```
git clone [https://github.com/your-username/prime-video-clone.git](https://github.com/your-username/prime-video-clone.git)
```

**Install dependencies**

## Bash
  **npm install**

```Configure Environment Variables Create a .env file in the root directory:```

 ## Snippet de código
 ```text
VITE_OMDB_API_KEY=your_omdb_key_here
Launch Development Server
```

 ## Bash
```text
npm run dev
```
### ⚠️ Engineering Notes
API Security: The OMDb key is handled via environment variables and injected through Axios interceptors to keep the business logic clean.

I/O Management: localStorage operations are handled asynchronously to the user input to avoid UI freezing.

Scalability Path: The service layer is designed to be swapped for a MongoDB/Node.js backend with zero impact on the UI components.
