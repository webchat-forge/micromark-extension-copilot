import { tokenizeDollarMath } from '../tokenizers/dollarMath';
import { createMathConstruct } from './createMathConstruct';

export const dollarMathConstruct = createMathConstruct(tokenizeDollarMath);