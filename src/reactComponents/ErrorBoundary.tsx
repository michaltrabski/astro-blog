import React, { Component, Fragment, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can log the error here or send it to a logging service
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render an error message or fallback UI here
      return <h1>Something went wrong.</h1>;
    }

    // Render the wrapped component
    return this.props.children;
  }
}
 
export default ErrorBoundary;