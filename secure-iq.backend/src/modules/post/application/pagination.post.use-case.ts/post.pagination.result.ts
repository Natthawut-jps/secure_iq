export class PostPaginationResult {
    constructor(
        public readonly posts: any[],
        public readonly total: number,
        public readonly page: number,
        public readonly limit: number
    ) { }
}