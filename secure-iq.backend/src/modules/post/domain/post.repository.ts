import { PostEntity } from "./post.entity";

export const POST_REPOSITORY = Symbol('POST_REPOSITORY');
export interface IPostRepository {
  create(post: any): Promise<any>;
  findById(id: string): Promise<PostEntity | null>;
  paginate(userId: string | undefined, page: number, limit: number): Promise<{ posts: any[], page: number, limit: number, total: number }>;
  update(id: string, post: any): Promise<PostEntity | null>;
  delete(id: string): Promise<void>;
}