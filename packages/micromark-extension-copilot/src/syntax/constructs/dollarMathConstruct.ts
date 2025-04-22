import { tokenizeDollarMath } from '../tokenizers/dollarMath.ts';
import { createMathConstruct } from './createMathConstruct.ts';

export const dollarMathConstruct = createMathConstruct(tokenizeDollarMath);
