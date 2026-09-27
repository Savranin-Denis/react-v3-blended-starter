import axios from "axios";
import type { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsReturn {
  posts: Post[];
  totalCount: number;
}

export interface NewPost {
  title: string;
  body: string;
}

export const fetchPosts = async (searchText: string, page: number): Promise<FetchPostsReturn> => {
  const resp = await axios.get<Post[]>("/posts", {
    params: {
      q: searchText,
      _page: page,
      _limit: 8,
    },
  });

  const totalCount = Number(resp.headers["x-total-count"]);
  return {
    posts: resp.data,
    totalCount,
  };
};

export const createPost = async (newPost: NewPost): Promise<Post> => {
  const { data } = await axios.post<Post>("/posts", newPost);
  return data;
};

export const editPost = async (newDataPost) => {};

export const deletePost = async (postId: number): Promise<Post> => {
  const { data } = await axios.delete<Post>(`/posts/${postId}`);
  return data;
};
