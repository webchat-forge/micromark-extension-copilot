import { BACKSLASH, OPEN_BRACKET, CLOSE_BRACKET, TOKEN_TYPE_MATH_BLOCK } from '../constants';
import { createMathTokenizer } from './createMathTokenizer';

export const tokenizeBlockMath = createMathTokenizer({
  triggerCode: BACKSLASH,
  isInline: false,
  openDelimiter: OPEN_BRACKET,
  closeDelimiter: CLOSE_BRACKET,
  tokenType: TOKEN_TYPE_MATH_BLOCK
});