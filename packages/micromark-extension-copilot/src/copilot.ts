import { type Extension } from 'micromark-util-types';
import { BACKSLASH, DOLLAR } from './syntax/constants';
import { blockMathConstruct } from './syntax/constructs/blockMathConstruct';
import { dollarMathConstruct } from './syntax/constructs/dollarMathConstruct';
import { inlineMathConstruct } from './syntax/constructs/inlineMathConstruct';

export default function copilot(): Extension {
  return {
    text: {
      [BACKSLASH]: [inlineMathConstruct, blockMathConstruct],
      [DOLLAR]: [dollarMathConstruct]
    },
    flow: {
      [BACKSLASH]: [blockMathConstruct],
      [DOLLAR]: [dollarMathConstruct]
    }
  };
}