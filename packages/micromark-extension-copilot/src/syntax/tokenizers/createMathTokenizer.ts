import { markdownLineEnding } from 'micromark-util-character';
import { type Code, type State, type TokenizeContext } from 'micromark-util-types';
import { BACKSLASH, DOLLAR, TOKEN_TYPE_MATH_CHUNK } from '../constants.ts';
import { createCloseDelimiterConstruct } from './closeDelimiter.ts';

interface TokenizerConfig {
  triggerCode: typeof BACKSLASH | typeof DOLLAR;
  isInline: boolean;
  openDelimiter: number;
  closeDelimiter: number;
  tokenType: string;
  contextCheck?: (context: TokenizeContext) => { isBlock: boolean; tokenType: string };
}

export function createMathTokenizer(config: TokenizerConfig) {
  const { triggerCode, openDelimiter, closeDelimiter, contextCheck } = config;
  const closeDelimiterConstruct = createCloseDelimiterConstruct(triggerCode, closeDelimiter);

  return function tokenize(this: TokenizeContext, effects: any, ok: State, nok: State) {
    const context = this;
    let escaped = false;
    let currentTokenType = config.tokenType;
    let { isInline } = config;
    let hasContent = false;

    // Check context if provided
    if (contextCheck) {
      const result = contextCheck(context);
      isInline = !result.isBlock;
      currentTokenType = result.tokenType;
    }

    return start;

    function start(code: Code): State | undefined {
      if (code !== triggerCode || context.previous === BACKSLASH) {
        return nok(code);
      }

      effects.enter('math');
      effects.enter('mathFence');
      effects.consume(code);
      return afterTrigger;
    }

    function afterTrigger(code: Code): State | undefined {
      if (code !== openDelimiter) {
        return nok(code);
      }

      effects.consume(code);
      effects.exit('mathFence');

      return inside;
    }

    function openContent() {
      if (!hasContent) {
        hasContent = true;
        effects.enter(currentTokenType);
        effects.enter('mathContent');
        effects.enter(TOKEN_TYPE_MATH_CHUNK);
      }
    }

    function inside(code: Code): State | undefined {
      if (code === null) {
        return nok(code);
      }

      if (code === triggerCode && !escaped) {
        return effects.check(closeDelimiterConstruct, afterTriggerClose, consumeContent)(code);
      }

      openContent();

      if (code === BACKSLASH) {
        escaped = true;
      } else {
        escaped = false;
      }

      // Handle newlines in block math
      if (!isInline && markdownLineEnding(code)) {
        effects.consume(code);
        effects.exit(TOKEN_TYPE_MATH_CHUNK);
        effects.enter(TOKEN_TYPE_MATH_CHUNK);
        return inside;
      }

      return consumeContent(code);
    }

    function consumeContent(code: Code): State | undefined {
      openContent();
      effects.consume(code);
      return inside;
    }

    function afterTriggerClose(code: Code): State | undefined {
      // First close all content tokens
      if (hasContent) {
        effects.exit(TOKEN_TYPE_MATH_CHUNK);
        effects.exit('mathContent');
        effects.exit(currentTokenType);
      }

      // Open fence token and consume trigger
      effects.enter('mathFence');
      effects.consume(code);

      // Move to consuming the closing delimiter
      return consumeClose;
    }

    function consumeClose(code: Code): State | undefined {
      // Consume the closing delimiter
      effects.consume(code);

      // Close fence and math tokens
      effects.exit('mathFence');
      effects.exit('math');

      return ok;
    }
  };
}
