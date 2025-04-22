import React from 'react';
import { MATH_EXAMPLES } from '../../examples';
import { ExampleCard } from './ExampleCard';

interface ExamplePanelProps {
  onSelect: (content: string) => void;
}

export const ExamplePanel: React.FC<ExamplePanelProps> = ({ onSelect }) => (
  <div className="example-panel">
    <h2>Examples</h2>
    <div className="examples-list">
      {MATH_EXAMPLES.map(example => (
        <ExampleCard
          key={example.title}
          {...example}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);