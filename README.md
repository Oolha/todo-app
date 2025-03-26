# Todo App

A simple todo list application built with Next.js and JSONPlaceholder API. The app allows users to view, add, and delete tasks.

## 🚀 Features

- **Fetch and display** todos from JSONPlaceholder API
- **Add** new todos
- **Delete** existing todos
- **Optimistic UI updates** for instant feedback
- **Data persistence** between sessions via localStorage
- **Responsive design** with a pleasant spring-themed UI

## 🛠️ Technologies

- **Next.js 14** - React framework with App Router
- **React Query (TanStack Query)** - State management and API requests
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations and transitions
- **Axios** - HTTP requests
- **TypeScript** - Type safety
- **localStorage API** - Browser data persistence

## 🏗️ Architecture

The project follows a clean, modular architecture:

```
├── app                  # Next.js App Router
├── components           # React components
│   ├── Icons.tsx        # SVG icons
│   ├── Providers.tsx    # Context providers
│   ├── TodoItem.tsx     # Individual todo component
│   └── TodoList.tsx     # Todo list component
├── hooks                # Custom React hooks
│   ├── useTodoMutations.tsx  # Mutations hook (add, delete)
│   └── useTodoQueries.tsx    # Queries hook (fetch)
├── services             # API services
│   └── todoService.ts   # Todo API service
├── types                # TypeScript types
│   └── index.ts         # Todo types
└── utils                # Utility functions
    ├── constants.ts     # Constants
    └── localStorage.ts  # localStorage utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Oolha/todo-app.git
cd todo-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔍 Technical Details

### Optimistic Updates

The app uses React Query's optimistic updates pattern for a seamless user experience:

1. Updates local state immediately
2. Sends API request in the background
3. Restores previous state if the API call fails

### Persistence Strategy

Since JSONPlaceholder doesn't actually save changes, the app implements its own persistence strategy:

1. Initial data is loaded from the API
2. All changes are saved to localStorage
3. On page refresh, the app loads data from localStorage
