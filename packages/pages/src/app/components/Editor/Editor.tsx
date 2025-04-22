import React, { type ChangeEvent } from 'react';
import { EditorTextArea } from './EditorTextArea.tsx';

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
      <EditorTextArea onChange={handleChange} value={value} />
    </div>
  );
};
