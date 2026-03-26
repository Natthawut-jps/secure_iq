export class ChangePasswordResult {
  constructor(
    public readonly userId: string,
    public readonly updatedAt: Date,
  ) {}
}
