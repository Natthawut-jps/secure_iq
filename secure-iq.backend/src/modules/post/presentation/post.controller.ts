import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { PostCreateUseCase } from "../application/create.post.use-case.ts/post.create.use-case";
import { PostUpdateUseCase } from "../application/update.post.use-case.ts/post.update.use-case";
import { PostDeleteUseCase } from "../application/delete.post.use-case.ts/post.delete.use-case";
import { PostPaginationUseCase } from "../application/pagination.post.use-case.ts/post.pagination.use-case";
import { PostParamsUseCase } from "../application/params.post.use-case.ts/post-params.use-case";
import { PostPaginationDto } from "./dto/post-pagination.dto";
import { PostDeleteDto } from "./dto/post-delete.dto";
import { PostUpdateDto } from "./dto/post-update.dto";
import { PostCreateDto } from "./dto/post-create.dto";
import type { Request } from "express";

@Controller({
  path: 'posts',
  version: '1'
})
export class PostController {
  constructor(
    private readonly postCreateUseCase: PostCreateUseCase,
    private readonly postUpdateUseCase: PostUpdateUseCase,
    private readonly postDeleteUseCase: PostDeleteUseCase,
    private readonly postPaginationUseCase: PostPaginationUseCase,
    private readonly postParamsUseCase: PostParamsUseCase
  ) {}

  @Get()
  pagination(@Query() query: PostPaginationDto, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.postPaginationUseCase.execute({ ...query, token: token! });
  }

  @Delete()
  delete(@Query() query: PostDeleteDto) {
    return this.postDeleteUseCase.execute(query.id);
  }

  @Put()
  update(@Body() body: PostUpdateDto) {
    return this.postUpdateUseCase.execute({
      id: body.id!,
      title: body.title!,
      content: body.content!,
      tag: body.tag!,
    });
  }

  @Get('update')
  async getPost(@Query('id') id: string) {
    return await this.postParamsUseCase.execute({ id });
  }

  @Post()
  async create(@Body() body: PostCreateDto, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    return await this.postCreateUseCase.execute({
      ...body,
      token: token!,
    });
  }
}