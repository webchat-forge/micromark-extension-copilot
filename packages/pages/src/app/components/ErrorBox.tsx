import React from 'react';

interface ErrorBoxProps {
  error: Error;
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ error }) => {
  return (
    <div className="error-box">
      <h3>Error</h3>
      <pre className="error-message">{error.message}</pre>
      {error.stack && (
        <details>
          <summary>Stack trace</summary>
          <pre className="error-stack">{error.stack}</pre>
        </details>
      )}
    </div>
  );
};
