import { not, isNil } from 'ramda';
export * from './status-codes';
export * from './maybe-result';

export const isNotNil = (value: any): boolean => not(isNil(value));
