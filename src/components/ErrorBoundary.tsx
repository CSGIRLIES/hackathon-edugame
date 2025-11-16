import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    // You can log the error to an error reporting service here
    console.error('[ErrorBoundary] Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page">
          <header className="page-header">
            <h1 className="page-title">Oops! Something went wrong 💔</h1>
            <p className="page-subtitle">
              Don't worry, our magical companions are on it! Try refreshing the page or go back to your dashboard.
            </p>
          </header>

          <main>
            <section className="card">
              <div className="card-header">
                <h2 className="card-title">Error Details</h2>
                <p className="card-subtitle">
                  This information might be helpful for our development team. Feel free to share it with them!
                </p>
              </div>

              <div style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(248, 250, 252, 0.2)',
                borderRadius: '0.5rem',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#6b7280',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                <p style={{ margin: 0, color: '#fb7185', fontWeight: 'bold' }}>
                  {this.state.error?.message || 'Unknown error'}
                </p>
                {this.state.errorInfo && (
                  <pre style={{
                    margin: '0.5rem 0 0',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    color: '#9ca3af'
                  }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>

              <div className="btn-row" style={{ marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  🔄 Refresh Page
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  🏠 Back to Dashboard
                </button>
              </div>
            </section>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks inside class component context
const ErrorBoundaryWithTranslation = ({ children }: Props) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWithTranslation;
