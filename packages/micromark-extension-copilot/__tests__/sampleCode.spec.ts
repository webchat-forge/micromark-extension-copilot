import { micromark } from 'micromark';
import { copilot, copilotHtml } from '../src/index';
import { describe, expect, test, beforeEach } from 'vitest';

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
    expect(result).toMatchInlineSnapshot(`
      "<h1>LaTeX</h1>
      <pre class="math-block" data-math-type="block"><code>
      \\frac{1}{2}
      </code></pre>
      "
    `);
  });
});
