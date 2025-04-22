import React from 'react';
import type { MathExample } from '../../types';

interface ExampleCardProps extends MathExample {
  onSelect: (content: string) => void;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  description,
  content,
  onSelect
}) => (
  <div className="example-item">
    <h3>{title}</h3>
    <p>{description}</p>
    <button onClick={() => onSelect(content)} className="example-button">
      Try it
    </button>
  </div>
);