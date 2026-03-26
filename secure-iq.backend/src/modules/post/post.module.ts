import { Module } from "@nestjs/common";
import { PostCreateUseCase } from "./application/create.post.use-case.ts/post.create.use-case";
import { PostRepositoryImpl } from "./infrastructure/post.repository.impl";
import { ID_GENERATOR, UuidV7Generator } from "src/common/id/id.generator";
import { CLOCK, IClock, SystemClock } from "src/common/clock/clock.port";
import { POST_REPOSITORY } from "./domain/post.repository";
import { IPostRepository } from "./domain/post.repository";
import { IIdGenerator } from "src/common/id/id.generator";
import { PostDeleteUseCase } from "./application/delete.post.use-case.ts/post.delete.use-case";
import { PostUpdateUseCase } from "./application/update.post.use-case.ts/post.update.use-case";
import { PostPaginationUseCase } from "./application/pagination.post.use-case.ts/post.pagination.use-case";
import { PostController } from "./presentation/post.controller";
import { TOKEN_SERVICE } from "../../shared/ports/token-service.port";
import { ITokenService } from "../../shared/ports/token-service.port";
import { SharedModule } from "../../shared/shared.module";
import { PostParamsUseCase } from "./application/params.post.use-case.ts/post-params.use-case";

@Module({
    imports: [SharedModule],
    controllers: [PostController],
    providers: [
            { provide: POST_REPOSITORY, useClass: PostRepositoryImpl },
            { provide: CLOCK, useClass: SystemClock },
            { provide: ID_GENERATOR, useClass: UuidV7Generator },
        {
            provide: PostCreateUseCase,
            useFactory: (idGenerator: IIdGenerator, clock: IClock, postRepository: IPostRepository, tokenService: ITokenService) => new PostCreateUseCase( idGenerator, clock, postRepository, tokenService),
            inject: [ID_GENERATOR, CLOCK, POST_REPOSITORY, TOKEN_SERVICE]
        },
        {
            provide: PostDeleteUseCase,
            useFactory: (postRepository: IPostRepository) => new PostDeleteUseCase(postRepository),
            inject: [POST_REPOSITORY]
        },
        {
            provide: PostUpdateUseCase,
            useFactory: (postRepository: IPostRepository, clock: IClock) => new PostUpdateUseCase(postRepository, clock),
            inject: [POST_REPOSITORY, CLOCK]
        },
        {
            provide: PostPaginationUseCase,
            useFactory: (postRepository: IPostRepository, tokenService: ITokenService) => new PostPaginationUseCase(postRepository, tokenService),
            inject: [POST_REPOSITORY, TOKEN_SERVICE]
        },
        {
            provide: PostParamsUseCase,
            useFactory: (postRepository: IPostRepository) => new PostParamsUseCase(postRepository),
            inject: [POST_REPOSITORY]
        }
    ],
})
export class PostModule {}