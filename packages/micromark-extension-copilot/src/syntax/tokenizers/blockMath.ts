import { BACKSLASH, OPEN_BRACKET, CLOSE_BRACKET, TOKEN_TYPE_MATH_BLOCK } from '../constants.ts';
import { createMathTokenizer } from './createMathTokenizer.ts';

export const tokenizeBlockMath = createMathTokenizer({
  triggerCode: BACKSLASH,
  isInline: false,
  openDelimiter: OPEN_BRACKET,
  closeDelimiter: CLOSE_BRACKET,
  tokenType: TOKEN_TYPE_MATH_BLOCK
});
