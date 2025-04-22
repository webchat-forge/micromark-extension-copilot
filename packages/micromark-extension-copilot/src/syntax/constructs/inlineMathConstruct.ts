import { tokenizeInlineMath } from '../tokenizers/inlineMath.ts';
import { createMathConstruct } from './createMathConstruct.ts';

export const inlineMathConstruct = createMathConstruct(tokenizeInlineMath);
