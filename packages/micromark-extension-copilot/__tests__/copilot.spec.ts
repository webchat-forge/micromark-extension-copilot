import { describe, it, expect } from 'vitest';
import { copilot } from '../src/index';
import { BACKSLASH, DOLLAR } from '../src/syntax/constants';
import { inlineMathConstruct } from '../src/syntax/constructs/inlineMathConstruct';
import { blockMathConstruct } from '../src/syntax/constructs/blockMathConstruct';
import { dollarMathConstruct } from '../src/syntax/constructs/dollarMathConstruct';

describe('copilot extension', () => {
  it('should return an extension object with correct structure', () => {
    const extension = copilot();
    
    // Test structure of the extension
    expect(extension).toHaveProperty('text');
    expect(extension).toHaveProperty('flow');
    
    // Check text constructs
    expect(extension.text).toHaveProperty(String(BACKSLASH));
    expect(extension.text).toHaveProperty(String(DOLLAR));
    
    // Check flow constructs
    expect(extension.flow).toHaveProperty(String(BACKSLASH));
    expect(extension.flow).toHaveProperty(String(DOLLAR));
  });

  it('should register the correct constructs for text mode', () => {
    const extension = copilot();
    
    // Check that the backslash trigger has both inline and block math constructs
    expect(Array.isArray(extension.text[BACKSLASH])).toBe(true);
    expect(extension.text[BACKSLASH]).toContain(inlineMathConstruct);
    expect(extension.text[BACKSLASH]).toContain(blockMathConstruct);
    
    // Check that dollar trigger has dollar math construct
    expect(Array.isArray(extension.text[DOLLAR])).toBe(true);
    expect(extension.text[DOLLAR]).toContain(dollarMathConstruct);
  });

  it('should register the correct constructs for flow mode', () => {
    const extension = copilot();
    
    // Check that the backslash trigger has block math construct in flow mode
    expect(Array.isArray(extension.flow[BACKSLASH])).toBe(true);
    expect(extension.flow[BACKSLASH]).toContain(blockMathConstruct);
    
    // Check that dollar trigger has dollar math construct in flow mode
    expect(Array.isArray(extension.flow[DOLLAR])).toBe(true);
    expect(extension.flow[DOLLAR]).toContain(dollarMathConstruct);
  });
});