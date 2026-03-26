import { uuidv7 } from 'uuidv7';

export const ID_GENERATOR = Symbol('ID_GENERATOR');

export interface IIdGenerator {
  generate(): string;
}

export class UuidV7Generator implements IIdGenerator {
  generate(): string {
    return uuidv7();
  }
}
