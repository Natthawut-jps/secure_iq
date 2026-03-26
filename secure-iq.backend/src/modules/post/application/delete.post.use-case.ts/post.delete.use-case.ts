import { IPostRepository } from "../../domain/post.repository";
import { PostDeleteResult } from "./post.delete.result";

export class PostDeleteUseCase {
    constructor(
        private readonly postRepository: IPostRepository
    ) { }

    async execute(id: string) {
         await this.postRepository.delete(id);
         return new PostDeleteResult(id);
    }
}
