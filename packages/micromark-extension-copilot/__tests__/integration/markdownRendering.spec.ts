import { describe, it, expect } from 'vitest';
import { micromark } from 'micromark';
import { copilot, copilotHtml } from '../../src/index';

describe('markdown rendering with copilot extension', () => {
  const render = (markdown: string) => 
    micromark(markdown, 'utf-8', {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });

  describe('mixed math in markdown', () => {
    it('should handle a mix of markdown and math syntax', () => {
      const markdown = `
# Heading with inline math \\(x^2\\)

This is a paragraph with inline math \\(E = mc^2\\) and $$\\pi r^2$$.

## Block math

\\[
\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}
\\]

And dollar block math:

$$
\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}
$$

* List item with math \\(a^2 + b^2 = c^2\\)
* Another item

> Blockquote with math $$E = mc^2$$
      `;
      
      const result = render(markdown);
      
      // Heading with inline math
      expect(result).toContain('<h1>Heading with inline math <span class="math-inline"');
      expect(result).toContain('x^2');
      
      // Paragraph with inline math
      expect(result).toContain('<p>This is a paragraph with inline math <span class="math-inline"');
      expect(result).toContain('E = mc^2');
      expect(result).toContain('\\pi r^2');
      
      // Block math
      expect(result).toContain('<pre class="math-block"');
      expect(result).toContain('\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}');
      
      // Dollar block math
      expect(result).toContain('\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}');
      
      // List item with math
      expect(result).toContain('<li>List item with math <span class="math-inline"');
      expect(result).toContain('a^2 + b^2 = c^2');
      
      // Blockquote with math
      expect(result).toContain('<blockquote>\n<p>Blockquote with math ');
      expect(result).toContain('E = mc^2');
    });
    
    it('should handle math with markdown syntax inside', () => {
      const markdown = `
\\[
f(x) = \\begin{cases}
x^2 & \\text{if } x > 0 \\\\
0 & \\text{otherwise}
\\end{cases}
\\]

$$
\\begin{align}
a &= b + c \\\\
&= d + e
\\end{align}
$$
      `;
      
      const result = render(markdown);
      
      // Math with cases environment
      expect(result).toContain('<pre class="math-block"');
      expect(result).toContain('f(x) = \\begin{cases}');
      expect(result).toContain('x^2 & \\text{if } x > 0 \\\\');
      
      // Math with align environment
      expect(result).toContain('\\begin{align}');
      expect(result).toContain('a &= b + c \\\\');
    });
    
    it('should handle escaped math delimiters', () => {
      const markdown = `
This shows a literal \\\\(x\\) and \\\\[y\\].

Escaped dollar signs: \\$$ not math $$.
      `;
      
      const result = render(markdown);
      
      // Escaped inline math
      expect(result).not.toContain('<span class="math-inline"');
      expect(result).toContain('This shows a literal \\(x) and \\[y].');
      
      // Escaped dollar math
      expect(result).toContain('Escaped dollar signs: $$ not math $$.');
    });
  });
});