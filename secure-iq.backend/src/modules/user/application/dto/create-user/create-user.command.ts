export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    if (password.length < 8)
      throw new Error('Password must be at least 8 characters long');
  }
}
