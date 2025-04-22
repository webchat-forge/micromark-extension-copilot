import { isTerminal, isEscaped } from '../src/syntax/utils';
import { BACKSLASH, CODE_BREAK, CODE_EOF, CODE_EOL, EOF } from '../src/syntax/constants';
import { describe, it, expect } from 'vitest';

describe('utils', () => {
  describe('isTerminal', () => {
    it('should return true for EOF', () => {
      expect(isTerminal(EOF)).toBe(true);
    });

    it('should return true for CODE_EOL', () => {
      expect(isTerminal(CODE_EOL)).toBe(true);
    });

    it('should return true for CODE_EOF', () => {
      expect(isTerminal(CODE_EOF)).toBe(true);
    });

    it('should return true for CODE_BREAK', () => {
      expect(isTerminal(CODE_BREAK)).toBe(true);
    });

    it('should return false for non-terminal codes', () => {
      expect(isTerminal(65)).toBe(false); // 'A'
      expect(isTerminal(97)).toBe(false); // 'a'
      expect(isTerminal(48)).toBe(false); // '0'
    });
  });

  describe('isEscaped', () => {
    it('should return true when previous character is the same as current', () => {
      expect(isEscaped(BACKSLASH, BACKSLASH)).toBe(true);
      expect(isEscaped(97, 97)).toBe(true); // 'a', 'a'
    });

    it('should return false when previous character is different from current', () => {
      expect(isEscaped(BACKSLASH, 97)).toBe(false); // '\', 'a'
      expect(isEscaped(97, 98)).toBe(false); // 'a', 'b'
    });

    it('should return false when previous is null', () => {
      expect(isEscaped(null, BACKSLASH)).toBe(false);
    });
  });
});