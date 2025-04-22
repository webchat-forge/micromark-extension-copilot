import { type TokenizeContext } from 'micromark-util-types';
import { BACKSLASH, DOLLAR, OPEN_BRACKET, CLOSE_BRACKET, OPEN_PAREN, CLOSE_PAREN, TOKEN_TYPE_MATH_BLOCK, TOKEN_TYPE_MATH_INLINE } from '../../src/syntax/constants';
import { createMathTokenizer } from '../../src/syntax/tokenizers/createMathTokenizer';
import { describe, it, expect, vi } from 'vitest';

function processTokens(tokenizer: ReturnType<typeof createMathTokenizer>, context: TokenizeContext, input: (number | null)[]) {
  let events: Array<[string, string, number]> = [];
  const effects = {
    enter(type: string) {
      events.push(['enter', type, input.length]);
    },
    exit(type: string) {
      events.push(['exit', type, input.length]);
    },
    consume(code: number | null) {
      events.push(['consume', String(code), input.length]);
      input.shift();
    },
    check(construct: any, checkOk: any, checkNok: any) {
      return function(code: number | null) {
        events.push(['check', String(code), input.length]);
        const inputCopy = input.slice();
        let state = construct.tokenize(effects, ok, nok)(code);

        // Process until we get to ok or nok
        while (state && typeof state === 'function' && state !== ok && state !== nok) {
          if (input.length === 0) break;
          const nextCode = input[0];
          state = state(nextCode);
          input.shift();
        }
        
        // Reset input
        input = inputCopy;
        return state === ok ? checkOk : checkNok;
      };
    }
  };

  const ok = () => {
    events.push(['ok', '', input.length]);
    return true;
  };
  const nok = () => {
    events.push(['nok', '', input.length]);
    return false;
  };

  let state = tokenizer.bind(context)(effects, ok, nok);
  
  // Process tokens until we reach a terminal state
  while (state && typeof state === 'function') {
    if (input.length === 0) break;
    const code = input[0];
    state = state(code);
    // If state returned another function, continue processing
    // Otherwise, it's a final state (ok or nok)
  }

  return { events, ok, nok };
}

describe('createMathTokenizer', () => {
  describe('block math tokenizer', () => {
    const blockConfig = {
      triggerCode: BACKSLASH,
      isInline: false,
      openDelimiter: OPEN_BRACKET,
      closeDelimiter: CLOSE_BRACKET,
      tokenType: TOKEN_TYPE_MATH_BLOCK
    } as const;

    it('should process complete block math', () => {
      const tokenizer = createMathTokenizer(blockConfig);
      const context = { previous: null } as TokenizeContext;
      
      const { events } = processTokens(tokenizer, context, [
        BACKSLASH,
        OPEN_BRACKET,
        65, // 'A'
        66, // 'B'
        67, // 'C'
        BACKSLASH,
        CLOSE_BRACKET
      ]);

      // Verify the token sequence
      expect(events.find(e => e[0] === 'enter' && e[1] === 'math')).toBeTruthy();
      expect(events.find(e => e[0] === 'enter' && e[1] === 'mathFence')).toBeTruthy();
      expect(events.find(e => e[0] === 'enter' && e[1] === TOKEN_TYPE_MATH_BLOCK)).toBeTruthy();
      expect(events.find(e => e[0] === 'consume' && e[1] === '65')).toBeTruthy(); // 'A'
      expect(events.find(e => e[0] === 'consume' && e[1] === '66')).toBeTruthy(); // 'B'
      expect(events.find(e => e[0] === 'consume' && e[1] === '67')).toBeTruthy(); // 'C'
      expect(events.find(e => e[0] === 'exit' && e[1] === 'mathFence')).toBeTruthy();
      expect(events.find(e => e[0] === 'exit' && e[1] === TOKEN_TYPE_MATH_BLOCK)).toBeTruthy();
      expect(events.find(e => e[0] === 'exit' && e[1] === 'math')).toBeTruthy();
    });

    it('should reject if trigger code is escaped', () => {
      const tokenizer = createMathTokenizer(blockConfig);
      const context = { previous: BACKSLASH } as TokenizeContext;

      const { events } = processTokens(tokenizer, context, [BACKSLASH]);
      
      // Should reject with nok
      expect(events.find(e => e[0] === 'nok')).toBeTruthy();
      expect(events.find(e => e[0] === 'enter' && e[1] === 'math')).toBeFalsy();
    });

    it('should handle newlines in block math', () => {
      const tokenizer = createMathTokenizer(blockConfig);
      const context = { previous: null } as TokenizeContext;
      
      const { events } = processTokens(tokenizer, context, [
        BACKSLASH,
        OPEN_BRACKET,
        65, // 'A'
        10, // newline
        66, // 'B'
        BACKSLASH,
        CLOSE_BRACKET
      ]);

      // Verify the token sequence handles newlines correctly
      expect(events.find(e => e[0] === 'enter' && e[1] === 'math')).toBeTruthy();
      expect(events.find(e => e[0] === 'consume' && e[1] === '10')).toBeTruthy(); // newline
      expect(events.find(e => e[0] === 'exit' && e[1] === 'math')).toBeTruthy();
    });
  });

  describe('inline math tokenizer', () => {
    const inlineConfig = {
      triggerCode: BACKSLASH,
      isInline: true,
      openDelimiter: OPEN_PAREN,
      closeDelimiter: CLOSE_PAREN,
      tokenType: TOKEN_TYPE_MATH_INLINE
    } as const;

    it('should process complete inline math', () => {
      const tokenizer = createMathTokenizer(inlineConfig);
      const context = { previous: null } as TokenizeContext;
      
      const { events } = processTokens(tokenizer, context, [
        BACKSLASH,
        OPEN_PAREN,
        65, // 'A'
        66, // 'B'
        BACKSLASH,
        CLOSE_PAREN
      ]);

      // Verify the token sequence
      expect(events.find(e => e[0] === 'enter' && e[1] === 'math')).toBeTruthy();
      expect(events.find(e => e[0] === 'enter' && e[1] === 'mathFence')).toBeTruthy();
      expect(events.find(e => e[0] === 'enter' && e[1] === TOKEN_TYPE_MATH_INLINE)).toBeTruthy();
      expect(events.find(e => e[0] === 'consume' && e[1] === '65')).toBeTruthy(); // 'A'
      expect(events.find(e => e[0] === 'consume' && e[1] === '66')).toBeTruthy(); // 'B'
      expect(events.find(e => e[0] === 'exit' && e[1] === 'mathFence')).toBeTruthy();
      expect(events.find(e => e[0] === 'exit' && e[1] === TOKEN_TYPE_MATH_INLINE)).toBeTruthy();
      expect(events.find(e => e[0] === 'exit' && e[1] === 'math')).toBeTruthy();
    });
  });

  describe('dollar math tokenizer', () => {
    const dollarConfig = {
      triggerCode: DOLLAR,
      isInline: true, // Default value, context check may change this
      openDelimiter: DOLLAR,
      closeDelimiter: DOLLAR,
      tokenType: TOKEN_TYPE_MATH_INLINE, // Default value, context check may change this
      contextCheck: vi.fn().mockReturnValue({
        isBlock: false,
        tokenType: TOKEN_TYPE_MATH_INLINE
      })
    } as const;

    it('should process complete dollar math', () => {
      const tokenizer = createMathTokenizer(dollarConfig);
      const context = { previous: null } as TokenizeContext;
      
      const { events } = processTokens(tokenizer, context, [
        DOLLAR,
        DOLLAR,
        65, // 'A'
        66, // 'B'
        DOLLAR,
        DOLLAR
      ]);

      // Verify the token sequence
      expect(events.find(e => e[0] === 'enter' && e[1] === 'math')).toBeTruthy();
      expect(events.find(e => e[0] === 'enter' && e[1] === 'mathFence')).toBeTruthy();
      expect(events.find(e => e[0] === 'consume' && e[1] === '65')).toBeTruthy(); // 'A'
      expect(events.find(e => e[0] === 'consume' && e[1] === '66')).toBeTruthy(); // 'B'
      expect(events.find(e => e[0] === 'exit' && e[1] === 'mathFence')).toBeTruthy();
      expect(events.find(e => e[0] === 'exit' && e[1] === 'math')).toBeTruthy();
    });

    it('should use contextCheck to determine if math is block or inline', () => {
      dollarConfig.contextCheck.mockReturnValue({
        isBlock: true,
        tokenType: TOKEN_TYPE_MATH_BLOCK
      });
      
      const tokenizer = createMathTokenizer(dollarConfig);
      const context = { previous: null } as TokenizeContext;
      
      const { events } = processTokens(tokenizer, context, [
        DOLLAR,
        DOLLAR,
        65, // 'A'
        DOLLAR,
        DOLLAR
      ]);

      expect(dollarConfig.contextCheck).toHaveBeenCalled();
      expect(events.find(e => e[0] === 'enter' && e[1] === TOKEN_TYPE_MATH_BLOCK)).toBeTruthy();
    });
  });
});