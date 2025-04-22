import { type Code, type State, type TokenizeContext } from 'micromark-util-types';

export type TokenizerFn = (this: TokenizeContext, effects: any, ok: State, nok: State) => (code: Code) => State | undefined;