import { PostParamsCommand } from "./post-params.command";
import { IPostRepository } from "../../domain/post.repository";
import { PostParamsResult } from "./post.params.result";

export class PostParamsUseCase {
    constructor(
        private readonly postRepository: IPostRepository
    ) {}
  async execute(command: PostParamsCommand) {
    if (!command.id) {
      throw new Error('Post ID is required');
    }
    const post = await this.postRepository.findById(command.id)
    if (!post) {
      throw new Error('Post not found');
    }
    return new PostParamsResult(
      post.id,
      post.title,
      post.content,
      post.tag,
      post.createdAt,
      post.updatedAt,
    );
  }
}