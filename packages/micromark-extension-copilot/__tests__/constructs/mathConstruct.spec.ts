import { describe, it, vi, expect } from 'vitest';
import { createMathConstruct } from '../../src/syntax/constructs/createMathConstruct';
import { BACKSLASH, OPEN_BRACKET, CLOSE_BRACKET, TOKEN_TYPE_MATH_BLOCK } from '../../src/syntax/constants';
import { createMathTokenizer } from '../../src/syntax/tokenizers/createMathTokenizer';

describe('createMathConstruct', () => {
  it('should create a construct with the correct name and tokenize function', () => {
    const mockTokenizer = createMathTokenizer({
      triggerCode: BACKSLASH,
      isInline: false,
      openDelimiter: OPEN_BRACKET,
      closeDelimiter: CLOSE_BRACKET,
      tokenType: TOKEN_TYPE_MATH_BLOCK
    });
    
    const construct = createMathConstruct(mockTokenizer);
    
    expect(construct).toHaveProperty('name', 'math');
    expect(construct).toHaveProperty('tokenize');
    expect(typeof construct.tokenize).toBe('function');
  });

  it('should pass the context to the tokenizer when tokenize is called', () => {
    // Create a spy tokenizer
    const mockTokenizerFn = vi.fn((effects, ok, nok) => {
      // Just return ok to simulate successful tokenization
      return ok;
    });
    
    const construct = createMathConstruct(mockTokenizerFn);
    
    // Create a mock context
    const mockContext = { foo: 'bar' } as any;
    
    // Mock effects, ok and nok functions
    const mockEffects = {};
    const mockOk = () => true;
    const mockNok = () => false;
    
    // Call the tokenize function with the mock context
    const result = construct.tokenize.call(mockContext, mockEffects, mockOk, mockNok);
    
    // Verify the tokenizer was called with the correct arguments
    expect(mockTokenizerFn).toHaveBeenCalledWith.apply(expect(mockTokenizerFn), [mockEffects, mockOk, mockNok]);
    expect(result).toBe(mockOk); // The tokenizer should return ok
  });
});