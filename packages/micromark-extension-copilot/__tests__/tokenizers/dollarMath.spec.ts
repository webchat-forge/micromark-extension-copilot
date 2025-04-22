import { describe, it, expect } from 'vitest';
import { micromark } from 'micromark';
import { copilot, copilotHtml } from '../../src/index';

describe('dollarMath tokenizer', () => {
  it('should correctly tokenize inline dollar math with $$ ... $$', () => {
    const markdown = 'This is $$ E = mc^2 $$ equation.';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<span class="math-inline"');
    expect(result).toContain('E = mc^2');
  });
  
  it('should correctly tokenize block dollar math with $$ on separate lines', () => {
    const markdown = '$$\nE = mc^2\n$$';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<pre class="math-block"');
    expect(result).toContain('E = mc^2');
  });
  
  it('should handle multiline block dollar math', () => {
    const markdown = '$$\nx^2 + y^2 = z^2\ny = mx + b\n$$';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<pre class="math-block"');
    expect(result).toContain('x^2 + y^2 = z^2');
    expect(result).toContain('y = mx + b');
  });
  
  it('should handle dollar math with special characters', () => {
    const markdown = '$$ \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2} $$';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<pre class="math-block"');
    expect(result).toContain('\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}');
  });
  
  it('should not tokenize escaped dollar math markers', () => {
    const markdown = '\\$$ not math $$';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).not.toContain('<pre class="math-block"');
    expect(result).toContain('$$ not math $$');
  });
  
  it('should not tokenize unclosed dollar math', () => {
    const markdown = '$$ unclosed math';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).not.toContain('<pre class="math-block"');
    expect(result).toContain('$$ unclosed math');
  });
  
  it('should handle dollar math within other markdown', () => {
    const markdown = '# Title\n\n$$\nE = mc^2\n$$\n\nParagraph after.';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<h1>Title</h1>');
    expect(result).toContain('<pre class="math-block"');
    expect(result).toContain('E = mc^2');
    expect(result).toContain('<p>Paragraph after.</p>');
  });
});