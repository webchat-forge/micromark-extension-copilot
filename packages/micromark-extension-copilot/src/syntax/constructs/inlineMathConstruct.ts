import { tokenizeInlineMath } from '../tokenizers/inlineMath';
import { createMathConstruct } from './createMathConstruct';

export const inlineMathConstruct = createMathConstruct(tokenizeInlineMath);