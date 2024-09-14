import { Component, ErrorInfo } from "react";

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          <h1 className="text-xl font-semibold">Something went wrong.</h1>
          <p>We are sorry, but something went wrong. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
