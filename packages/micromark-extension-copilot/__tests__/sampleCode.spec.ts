/// <reference types="node" />

import { expect } from 'expect';
import { micromark } from 'micromark';
import { beforeEach, describe, test } from 'node:test';
import { copilot, copilotHtml } from '../src/index.ts';

describe('with copilot extension', () => {
  let result: string;

  beforeEach(() => {
    result = micromark(
      `# LaTeX

$$
\\frac{1}{2}
$$
`,
      'utf-8',
      {
        extensions: [copilot()],
        htmlExtensions: [copilotHtml()]
      }
    );
  });

  test('should transform LaTeX in $$', () => {
    expect(result).toEqual('<h1>LaTeX</h1>\n<p>$$\n\\frac{1}{2}\n$$</p>\n');
  });
});
