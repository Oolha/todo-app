"use client";

import { useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback = (
    <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-500">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p>Please try refreshing the page</p>
    </div>
  ),
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Error caught by ErrorBoundary:", error);
      setHasError(true);
    };

    // Add global error listener
    window.addEventListener("error", errorHandler);

    // Cleanup listener
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  // Render the fallback UI if there's an error
  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
