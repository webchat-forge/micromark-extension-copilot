import { type Construct } from 'micromark-util-types';
import { type TokenizerFn } from '../types';

export function createMathConstruct(tokenizer: TokenizerFn): Construct {
  return {
    name: 'math',
    tokenize: tokenizer,
  };
}