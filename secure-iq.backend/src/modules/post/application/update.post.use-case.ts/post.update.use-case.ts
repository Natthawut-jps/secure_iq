import { IClock } from "src/common/clock/clock.port";
import { IPostRepository } from "../../domain/post.repository";
import { PostUpdateCommand } from "./post.update.command";
import { PostUpdateResult } from "./post.update.result";

export class PostUpdateUseCase {
    constructor(
        private readonly postRepository: IPostRepository,
        private readonly clock: IClock
    ) { }
    
    async execute(command: PostUpdateCommand) {
        const post = await this.postRepository.findById(command.id);
        if (!post) {
            throw new Error('Post not found');
        }

        post.updatePost({
            title: command.title,
            content: command.content,
            tag: command.tag,
        }, this.clock.now());
        await this.postRepository.update(post.id, post);

        return new PostUpdateResult(
            post.id,
            post.title,
            post.content,
            post.tag,
            post.updatedAt
        );
    }
}