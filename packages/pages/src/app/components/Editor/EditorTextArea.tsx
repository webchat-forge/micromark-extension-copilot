import React, { type ChangeEvent } from 'react';

interface EditorTextAreaProps {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

export const EditorTextArea: React.FC<EditorTextAreaProps> = ({ onChange, value }) => (
  <textarea
    className="editor-textarea"
    onChange={onChange}
    placeholder="Enter your LaTeX math here..."
    value={value}
  />
);