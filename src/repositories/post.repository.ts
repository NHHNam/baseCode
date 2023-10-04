import { skipPage } from "../utils";
import { postModel } from "../models";

export default class PostRepository {
  static async getPost(postId: string) {
    return await postModel.findById(postId).lean().exec();
  }
  static async getAllPosts(limit: number, page: number) {
    return await postModel
      .find()
      .limit(limit)
      .skip(skipPage({ limit, page }))
      .lean()
      .exec();
  }
  static async searchPosts(limit: number, page: number, keySearch: string) {
    // const regSearch = new RegExp(keySearch, "i");
    return await postModel
      .find({ $text: { $search: keySearch } })
      .limit(limit)
      .skip(skipPage({ limit, page }))
      .lean()
      .exec();
  }
  static async updatePost(postId: string, payload: any) {
    return await postModel
      .findByIdAndUpdate(postId, payload, { new: true })
      .lean()
      .exec();
  }

  static async deletePost(postId: string) {
    return await postModel.findByIdAndDelete(postId).lean().exec();
  }
}
