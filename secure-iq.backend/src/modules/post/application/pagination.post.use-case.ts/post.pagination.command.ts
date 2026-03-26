export class PostPaginationCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly token: string
    ) { }
}