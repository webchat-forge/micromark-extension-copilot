import { type Code, type State } from 'micromark-util-types';

export function createCloseDelimiterConstruct(triggerCode: number, closeDelimiter: number) {
  return {
    tokenize: function closeDelimiterTokenize(effects: any, ok: State, nok: State) {
      return start;

      function start(code: Code): State | undefined {
        if (code === triggerCode) {
          effects.enter('mathFence');
          effects.consume(code);
          return after;
        }
        return nok(code);
      }

      function after(code: Code): State | undefined {
        if (code === closeDelimiter) {
          effects.consume(code);
          effects.exit('mathFence');
          return ok;
        }
        return nok(code);
      }
    }
  };
}