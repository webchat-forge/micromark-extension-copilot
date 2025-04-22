import { BACKSLASH, OPEN_PAREN, CLOSE_PAREN, TOKEN_TYPE_MATH_INLINE } from '../constants';
import { createMathTokenizer } from './createMathTokenizer';

export const tokenizeInlineMath = createMathTokenizer({
  triggerCode: BACKSLASH,
  isInline: true,
  openDelimiter: OPEN_PAREN,
  closeDelimiter: CLOSE_PAREN,
  tokenType: TOKEN_TYPE_MATH_INLINE
});