// Token types
export const TOKEN_TYPE_MATH_INLINE = 'mathInline';
export const TOKEN_TYPE_MATH_BLOCK = 'mathBlock';
export const TOKEN_TYPE_MATH_CHUNK = 'mathChunk';

// Character codes
export const BACKSLASH = 92; // \
export const DOLLAR = 36;    // $
export const OPEN_PAREN = 40;  // (
export const CLOSE_PAREN = 41; // )
export const OPEN_BRACKET = 91; // [
export const CLOSE_BRACKET = 93; // ]
export const NEWLINE = 10;      // \n

// Special codes
export const EOF = null;
export const CODE_EOL = -5;
export const CODE_EOF = -4;
export const CODE_BREAK = -3;