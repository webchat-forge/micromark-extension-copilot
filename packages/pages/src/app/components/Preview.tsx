import React, { useEffect, useState } from 'react';
import { useMathMarkdown } from '../hooks/useMathMarkdown';
import { ErrorBox } from './ErrorBox';

interface PreviewProps {
  markdown: string;
}

export const Preview: React.FC<PreviewProps> = ({ markdown }) => {
  const { renderMarkdown } = useMathMarkdown();
  const [error, setError] = useState<Error | null>(null);
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    try {
      const renderedHtml = renderMarkdown(markdown);
      setHtml(renderedHtml);
      setError(null);
    } catch (err) {
      console.error('Markdown rendering error:', err);
      setHtml('');
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [markdown, renderMarkdown]);

  return (
    <div className="preview">
      {error ? (
        <ErrorBox error={error} />
      ) : (
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
};