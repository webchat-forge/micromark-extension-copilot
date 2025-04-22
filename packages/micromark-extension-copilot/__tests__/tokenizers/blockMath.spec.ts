import { describe, it, expect } from 'vitest';
import { micromark } from 'micromark';
import { copilot, copilotHtml } from '../../src/index';

describe('blockMath tokenizer', () => {
  it('should correctly tokenize block math with \\[...\\]', () => {
    const markdown = '\\[x^2\\]';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<pre class="math-block"');
    expect(result).toContain('x^2');
  });
  
  it('should handle multiline block math', () => {
    const markdown = '\\[\nx^2 + y^2 = z^2\n\\]';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<pre class="math-block"');
    expect(result).toContain('x^2 + y^2 = z^2');
  });
  
  it('should handle block math with special characters', () => {
    const markdown = '\\[\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\\]';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<pre class="math-block"');
    expect(result).toContain('\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}');
  });
  
  it('should not tokenize escaped block math markers', () => {
    const markdown = '\\\\[not math\\]';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).not.toContain('<pre class="math-block"');
    expect(result).toContain('[not math]');
  });
  
  it('should not tokenize unclosed block math', () => {
    const markdown = '\\[unclosed math';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).not.toContain('<pre class="math-block"');
    expect(result).toContain('[unclosed math');
  });
});