export class HashedPassword {
  private constructor(private readonly value: string) {}

  static fromHash(hash: string): HashedPassword {
    if (!hash) throw new Error('Hash cannot be empty');
    return new HashedPassword(hash);
  }

  toString(): string {
    return this.value;
  }
}
