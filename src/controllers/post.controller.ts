import { PostService } from "../services";
import { Request, Response } from "express";
import { CREATED, OK } from "../core/success.response";

export default class PostController {
  static async createPost(req: Request, res: Response) {
    new CREATED({
      message: "Create payment successfully",
      metadata: await PostService.createPost(req, res),
    }).send(res);
  }
  static async getPost(req: Request, res: Response) {
    new OK({
      message: "Get post successfully",
      metadata: await PostService.getPost(req, res),
    }).send(res);
  }
  static async getAllPosts(req: Request, res: Response) {
    new OK({
      message: "Get all posts successfully",
      metadata: await PostService.getAllPosts(req, res),
    }).send(res);
  }
  static async searchPosts(req: Request, res: Response) {
    new OK({
      message: "Search post successfully",
      metadata: await PostService.searchPosts(req, res),
    }).send(res);
  }
  static async updatePost(req: Request, res: Response) {
    new OK({
      message: "Update post successfully",
      metadata: await PostService.updatePost(req, res),
    }).send(res);
  }
  static async deletePost(req: Request, res: Response) {
    new OK({
      message: "Delete post successfully",
      metadata: await PostService.deletePost(req, res),
    }).send(res);
  }
}

// module.exports = PostController;
