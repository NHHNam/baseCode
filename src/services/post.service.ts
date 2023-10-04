import { postModel } from "../models";
import { Request, Response } from "express";
import { IPost, IQuery } from "../interface";
import { PostRepository } from "../repositories";
import { BadRequestError, NotFoundError } from "../core/error.response";

export default class PostService {
  static async createPost(req: Request, res: Response) {
    const payload = req.body as IPost;
    const dataCreate: IPost = {
      ...payload,
      post_userId: req.app.locals.user.userId,
    };
    const newPost = await postModel.create(dataCreate);
    return newPost;
  }

  static async getPost(req: Request, res: Response) {
    const { postId } = req.params;
    const post = await PostRepository.getPost(postId);
    if (!post) throw new NotFoundError("Bài post không tồn tại");
    return post;
  }

  static async getAllPosts(req: Request, res: Response) {
    const { limit, page } = req.query as unknown as IQuery;
    const posts = await PostRepository.getAllPosts(limit, page);
    return posts;
  }

  static async searchPosts(req: Request, res: Response) {
    const { keySearch, limit, page } = req.query as unknown as IQuery;
    const posts = await PostRepository.searchPosts(limit, page, keySearch);
    return posts;
  }

  static async updatePost(req: Request, res: Response) {
    const { postId } = req.params;
    const payload = req.body as IPost;
    const postUpdated = await PostRepository.updatePost(postId, payload);
    if (!postUpdated)
      throw new NotFoundError("Cập nhật bài viết không thành công");
    return postUpdated;
  }

  static async deletePost(req: Request, res: Response) {
    const { postId } = req.params;
    const postDeleted = await PostRepository.deletePost(postId);
    if (!postDeleted) throw new NotFoundError("Xóa bài viết không thành công");
    return postDeleted;
  }
}
