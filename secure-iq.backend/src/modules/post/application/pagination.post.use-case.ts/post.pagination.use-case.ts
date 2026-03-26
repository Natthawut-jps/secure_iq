import { ITokenService } from "src/shared/ports/token-service.port";
import { IPostRepository } from "../../domain/post.repository";
import { PostPaginationCommand } from "./post.pagination.command";
import { PostPaginationResult } from "./post.pagination.result";

export class PostPaginationUseCase {
    constructor(
        private readonly postRepository: IPostRepository,
        private readonly tokenService: ITokenService
    ) { }

    async execute(command: PostPaginationCommand) {
        if (!command.token) {
            throw new Error('Token is required');
        }
        const token = await this.tokenService.verifyAccessToken(command.token);
        
        const result = await this.postRepository.paginate(token.sub, command.page, command.limit);
        return new PostPaginationResult(result.posts, result.total, command.page, command.limit);
    }
}