import { PrismaService } from "src/prisma.service";
import { IPostRepository } from "../domain/post.repository";
import { Injectable } from "@nestjs/common";
import { PostEntity } from "../domain/post.entity";
import { Post } from "src/generated/prisma/client";

@Injectable()
export class PostRepositoryImpl implements IPostRepository {
 constructor(
    private readonly prismaService: PrismaService
 ) {}

 async create(post: any): Promise<any> {
    return await this.prismaService.post.create({
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        tag: post.tag,
        userId: post.userId,
        created_at: post.createdAt,
        updated_at: post.updatedAt,
      },
    });
 }

 async findById(id: string): Promise<PostEntity | null> {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    return post ? this.toDomain(post) : null;
 }

 async paginate(userId: string | undefined, page: number, limit: number): Promise<any> {
     if(!userId) {
        throw new Error('User ID is required');
     }
    const posts = await this.prismaService.post.findMany({ where: { userId }, skip: (Number(page) - 1) * Number(limit), take: Number(limit) });
    const total = await this.prismaService.post.count({ where: { userId } });
    return { posts, total };
 }

 async update(id: string, post: any): Promise<PostEntity | null> {
    const updatedPost = await this.prismaService.post.update({ where: { id }, data: {
      title: post.title,
      content: post.content,
      tag: post.tag,
      updated_at: post.updatedAt,
    } });
    return updatedPost ? this.toDomain(updatedPost) : null;
 }

 async delete(id: string): Promise<any> {
    return await this.prismaService.post.delete({ where: { id } });
 }
   

   // ── Mapper ───────────────────────────────────────────────────────
   private toDomain(record: Post): PostEntity {
     return PostEntity.reconstitute({
       id: record.id,
       title: record.title,
       content: record.content,
       tag: record.tag,
       userId: record.userId,
       createdAt: record.created_at,
       updatedAt: record.updated_at,
     });
   }
 
   private toPersistence(post: PostEntity): Post {
     const persistenceData = {
       id: post.id,
       title: post.title,
       content: post.content,
       tag: post.tag,
       userId: post.userId,
       created_at: post.createdAt,
       updated_at: post.updatedAt,
     };
     return persistenceData;
   }
}