import { tokenizeBlockMath } from '../tokenizers/blockMath.ts';
import { createMathConstruct } from './createMathConstruct.ts';

export const blockMathConstruct = createMathConstruct(tokenizeBlockMath);
