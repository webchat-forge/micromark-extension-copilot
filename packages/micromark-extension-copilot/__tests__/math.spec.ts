import { micromark } from 'micromark';
import { copilot, copilotHtml } from '../src/index';
import { describe, expect, it } from 'vitest';

describe('math extension', () => {
  const render = (markdown: string) =>
    micromark(markdown, 'utf-8', {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });

  describe('inline math', () => {
    it('should render inline math with \\(...\\)', () => {
      expect(render('\\(x^2\\)')).toMatchInlineSnapshot(`"<p><span class="math-inline" data-math-type="inline"><code>x^2</code></span></p>"`);
    });

    it('should handle empty inline math', () => {
      expect(render('\\(\\)')).toMatchInlineSnapshot(`"<p></p>"`);
    });

    it('should ignore unclosed inline math', () => {
      expect(render('\\(x^2')).toMatchInlineSnapshot(`"<p>(x^2</p>"`);
    });
  });

  describe('block math', () => {
    it('should render block math with \\[...\\]', () => {
      expect(render('\\[x^2\\]')).toMatchInlineSnapshot(`"<pre class="math-block" data-math-type="block"><code>x^2</code></pre>"`);
    });

    it('should handle empty block math', () => {
      expect(render('\\[\\]')).toMatchInlineSnapshot(`""`);
    });

    it('should ignore unclosed block math', () => {
      expect(render('\\[x^2')).toMatchInlineSnapshot(`"<p>[x^2</p>"`);
    });
  });

  describe('dollar math', () => {
    it('should render inline dollar math', () => {
      expect(render('$$ x^2 $$')).toMatchInlineSnapshot(`"<pre class="math-block" data-math-type="block"><code> x^2 </code></pre>"`);
    });

    it('should render block dollar math', () => {
      expect(render('$$\nx^2\n$$')).toMatchInlineSnapshot(`
        "<pre class="math-block" data-math-type="block"><code>
        x^2
        </code></pre>"
      `);
    });

    it('should handle escaped dollars', () => {
      expect(render('\\$$ not math $$')).toMatchInlineSnapshot(`"<p>$$ not math $$</p>"`);
      expect(render('$\\$ not math $$')).toMatchInlineSnapshot(`"<p>$$ not math $$</p>"`);
    });
  });
});