import { copilot, copilotHtml } from '@webchat-forge/micromark-extension-copilot';
import { expect } from 'expect';
import { micromark } from 'micromark';
import { beforeEach, describe, it } from 'node:test';

const MARKDOWN = `# LaTeX

$$
\\frac{1}{2}
$$
`;

describe('ES Modules', () => {
  describe('with copilot extension', () => {
    /** @type {string} */
    let result;

    beforeEach(() => {
      result = micromark(MARKDOWN, 'utf-8', { extensions: [copilot()], htmlExtensions: [copilotHtml()] });
    });

    it('should transform LaTeX in $$', () => {
      expect(result).toEqual('<h1>LaTeX</h1>\n<p>$$\n\\frac{1}{2}\n$$</p>\n');
    });
  });
});
