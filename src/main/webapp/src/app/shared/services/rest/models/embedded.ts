import { ObjectWithLinks } from './objectWithLinks';

export interface Embedded<T> {
  [key: string]: ObjectWithLinks[];
}
