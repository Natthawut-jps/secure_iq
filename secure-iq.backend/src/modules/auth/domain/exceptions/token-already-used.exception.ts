// auth/domain/exceptions/token-already-used.exception.ts
export class TokenAlreadyUsedException extends Error {
  public readonly code = 'TOKEN_ALREADY_USED';

  constructor() {
    super('Token has already been used');
    this.name = 'TokenAlreadyUsedException';
  }
}
