import { type Code } from 'micromark-util-types';
import { CODE_BREAK, CODE_EOF, CODE_EOL, EOF } from './constants.ts';

export const isTerminal = (code: Code): boolean =>
  code === EOF || code === CODE_EOL || code === CODE_EOF || code === CODE_BREAK;

export const isEscaped = (previous: Code, code: Code): boolean => previous === code;
