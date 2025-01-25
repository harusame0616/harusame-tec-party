export type Category = {
  id: string;
  name: string;
};

export type TagDto = {
  id: string;
  name: string;
};

export type Post = {
  id: string;
  publishedAt: Date;
  title: string;
  content: string;
  category: Category;
  tags: TagDto[];
};

export type PostField = keyof Post;

export type GetPostProps = {
  id: string;
};

export type GetPostsProps<U extends PostField> = {
  count: number;
  page: number;
  fields: U[];
};

export type GetAllPostsProps<U extends PostField> = Omit<
  GetPostsProps<U>,
  "count" | "page"
>;

export type GetPostResponse = Promise<Post>;

export type GetPostsResponse<U extends PostField> = Promise<{
  posts: Pick<Post, U>[];
  totalCount: number;
}>;

export type GetAllPostResponse<U extends PostField> = GetPostsResponse<U>;

export interface BlogClient {
  getPost(props: GetPostProps): GetPostResponse;
  getPosts<U extends PostField>(props: GetPostsProps<U>): GetPostsResponse<U>;
  getAllPost<U extends PostField>(
    props: GetAllPostsProps<U>,
  ): GetAllPostResponse<U>;
  getAllTags(): Promise<TagDto[]>;
}
