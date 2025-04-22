import { DOLLAR, TOKEN_TYPE_MATH_BLOCK, TOKEN_TYPE_MATH_INLINE } from '../constants';
import { createMathTokenizer } from './createMathTokenizer';
import { type TokenizeContext } from 'micromark-util-types';
import { markdownLineEnding } from 'micromark-util-character';

export const tokenizeDollarMath = createMathTokenizer({
  triggerCode: DOLLAR,
  isInline: true, // Default to inline, will be updated based on context
  openDelimiter: DOLLAR,
  closeDelimiter: DOLLAR,
  tokenType: TOKEN_TYPE_MATH_INLINE, // Default to inline, will be updated based on context
  contextCheck: (context: TokenizeContext) => {
    // Check if we're at the start of a line or document
    const isBlock = markdownLineEnding(context.previous) || context.previous === null;
    return {
      isBlock,
      tokenType: isBlock ? TOKEN_TYPE_MATH_BLOCK : TOKEN_TYPE_MATH_INLINE
    };
  }
});