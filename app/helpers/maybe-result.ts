import { ifElse } from 'ramda';

interface MaybeResult<T> {
  ok: boolean;
  result?: T;
  error?: Error;
}

export const maybeResult = <T>(promise: Promise<any>): MaybeResult<T> =>
  promise
    .then((result: T) => ({ ok: true, result }))
    .catch(error => Promise.resolve({ ok: false, error: new Error(error) }));

export const isOk = (maybeResult: MaybeResult): boolean => maybeResult.ok;

export const checkMaybeResult = (onOk: Function, onError: Function) => (
  result: MaybeResult
) => ifElse(isOk, onOk, onError)(result);
