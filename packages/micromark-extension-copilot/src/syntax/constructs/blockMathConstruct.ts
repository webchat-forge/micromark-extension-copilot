import { tokenizeBlockMath } from '../tokenizers/blockMath';
import { createMathConstruct } from './createMathConstruct';

export const blockMathConstruct = createMathConstruct(tokenizeBlockMath);