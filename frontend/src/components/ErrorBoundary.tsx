import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  // RENDERIZAR MENSAJE DE ERROR CAPTURADO POR REACT
  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div style={{ padding: '2rem', backgroundColor: '#ffe6e6', color: '#a00' }}>
          <h2>Algo salió mal.</h2>
          <p>
            <strong>Error:</strong> {this.state.error.toString()}
          </p>
          <details style={{ whiteSpace: 'pre-wrap' }}>{this.state.errorInfo?.componentStack}</details>
        </div>
      );
    }

    return this.props.children;
  }
}
