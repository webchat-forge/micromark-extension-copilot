import React, { type ChangeEvent } from 'react';

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor: React.FC<EditorProps> = ({ onChange, value }) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="editor">
      <textarea
        className="editor-textarea"
        onChange={handleChange}
        placeholder="Enter your LaTeX math here..."
        value={value}
      />
    </div>
  );
};