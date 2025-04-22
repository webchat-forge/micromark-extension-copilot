import React, { useCallback, useState } from 'react';
import { DEFAULT_MARKDOWN } from '../constants/defaultMarkdown';
import { Editor } from './Editor';
import { ExamplePanel } from './Examples';
import { Preview } from './Preview';
import { Header } from './Header';

export const Playground: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);

  const handleMarkdownChange = useCallback((value: string) => setMarkdown(value), []);

  const handleExampleSelect = useCallback((example: string) => setMarkdown(example), []);

  return (
    <div className="playground">
      <Header />
      <div className="playground-main">
        <div className="playground-editor">
          <Editor value={markdown} onChange={handleMarkdownChange} />
        </div>
        <div className="playground-preview">
          <Preview markdown={markdown} />
        </div>
      </div>
      <ExamplePanel onSelect={handleExampleSelect} />
    </div>
  );
};