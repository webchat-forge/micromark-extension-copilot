import { describe, it, expect } from 'vitest';
import { micromark } from 'micromark';
import { copilot, copilotHtml } from '../../src/index';

describe('inlineMath tokenizer', () => {
  it('should correctly tokenize inline math with \\(...\\)', () => {
    const markdown = 'This is \\(x^2\\) equation.';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<span class="math-inline"');
    expect(result).toContain('x^2');
  });
  
  it('should handle inline math with special characters', () => {
    const markdown = 'The formula is \\(\\alpha + \\beta = \\gamma\\).';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<span class="math-inline"');
    expect(result).toContain('\\alpha + \\beta = \\gamma');
  });
  
  it('should not tokenize escaped inline math markers', () => {
    const markdown = 'This is \\\\(not math\\).';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).not.toContain('<span class="math-inline"');
    expect(result).toContain('(not math)');
  });
  
  it('should not tokenize unclosed inline math', () => {
    const markdown = 'This is \\(unclosed math.';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).not.toContain('<span class="math-inline"');
    expect(result).toContain('(unclosed math');
  });
  
  it('should handle inline math within other markdown elements', () => {
    const markdown = '# Title with \\(x^2\\)\n\nParagraph with \\(E = mc^2\\).';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result).toContain('<h1>Title with <span class="math-inline"');
    expect(result).toContain('x^2');
    expect(result).toContain('<p>Paragraph with <span class="math-inline"');
    expect(result).toContain('E = mc^2');
  });
  
  it('should handle multiple inline math expressions in a single paragraph', () => {
    const markdown = 'This paragraph contains \\(x^2\\) and \\(y^2\\) variables.';
    const result = micromark(markdown, {
      extensions: [copilot()],
      htmlExtensions: [copilotHtml()]
    });
    
    expect(result.match(/<span class="math-inline"/g)?.length).toBe(2);
    expect(result).toContain('x^2');
    expect(result).toContain('y^2');
  });
});