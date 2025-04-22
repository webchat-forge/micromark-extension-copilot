import { type Extension } from 'micromark-util-types';
import { BACKSLASH, DOLLAR } from './syntax/constants.ts';
import { blockMathConstruct } from './syntax/constructs/blockMathConstruct.ts';
import { dollarMathConstruct } from './syntax/constructs/dollarMathConstruct.ts';
import { inlineMathConstruct } from './syntax/constructs/inlineMathConstruct.ts';

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
