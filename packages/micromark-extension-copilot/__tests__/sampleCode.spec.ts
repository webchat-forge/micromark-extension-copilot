import { micromark } from 'micromark';
import { copilot, copilotHtml } from '../src/index';

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
