export class CreateUserResult {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly status: string,
    public readonly createdAt: Date,
  ) {}
}
