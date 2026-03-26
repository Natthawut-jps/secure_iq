import { IPostRepository } from "../../domain/post.repository";
import { PostEntity } from "../../domain/post.entity";
import { PostCreateCommand } from "./post.create.command";
import { IIdGenerator } from "src/common/id/id.generator";
import { IClock } from "src/common/clock/clock.port";
import { PostCreateResult } from "./post.create.result";
import { ITokenService } from "../../../../shared/ports/token-service.port";

export class PostCreateUseCase {

    constructor(
        private readonly idGenerator: IIdGenerator,
        private readonly clock: IClock,
        private readonly postRepository: IPostRepository,
        private readonly tokenService: ITokenService
    ) {
    }

    async execute(command: PostCreateCommand) {
        const token = await this.tokenService.verifyAccessToken(command.token);
        const post = PostEntity.create({
            id: this.idGenerator.generate(),
            title: command.title,
            content: command.content,
            tag: command.tag,
            userId: token.sub,
            now: this.clock.now(),
        });
        await this.postRepository.create(post);
        return new PostCreateResult(
            post.id,
            post.title,
            post.content,
            post.tag,
            post.createdAt,
            post.updatedAt,
        );
    }
}