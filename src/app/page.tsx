import ErrorBoundary from "@/components/ErrorBoundary";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <ErrorBoundary>
        <TodoList />
      </ErrorBoundary>
    </main>
  );
}
