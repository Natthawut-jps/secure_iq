export class ChangePasswordCommand {
  constructor(
    public readonly userId: string,
    public readonly currentPassword: string,
    public readonly newPassword: string,
  ) {
    if (newPassword.length < 8)
      throw new Error('Password must be at least 8 characters long');
  }
}
