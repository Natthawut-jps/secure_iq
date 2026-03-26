export class PostParamsResult {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly content: string,
        public readonly tag: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}