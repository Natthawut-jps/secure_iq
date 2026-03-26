export class UpdateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly name?: string,
    public readonly email?: string,
  ) {
    if (!name && !email)
      throw new Error('At least one field must be provided');
  }
}
