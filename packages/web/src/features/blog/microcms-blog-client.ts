// SDK利用準備
import { createClient } from "microcms-js-sdk";
import type {
  BlogClient,
  GetAllPostResponse,
  GetAllPostsProps,
  GetPostProps,
  GetPostResponse,
  GetPostsProps,
  GetPostsResponse,
  Post,
  PostField,
  TagDto,
} from "./blog-client";

type MicroCMSCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

type MicroCMSTag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

type MicroCMSPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: MicroCMSCategory;
  tags: MicroCMSTag[];
};

type ConstructorProps = {
  serviceDomain: string;
  apiKey: string;
};

function toFieldPickedPost<U extends PostField>(
  post: Partial<MicroCMSPost>,
  fields: PostField[],
): Pick<Post, U> {
  const translatedPost: Partial<Post> = {};

  if (fields.includes("category") && "category" in post) {
    translatedPost.category = post.category
      ? {
          id: post.category.id,
          name: post.category.name,
        }
      : {
          id: "",
          name: "",
        };
  }

  if (fields.includes("content") && "content" in post) {
    translatedPost.content = post.content;
  }

  if (fields.includes("id") && "id" in post) {
    translatedPost.id = post.id;
  }

  if (fields.includes("tags") && "tags" in post) {
    translatedPost.tags = post.tags
      ? post.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        }))
      : [];
  }

  if (fields.includes("title") && "title" in post) {
    translatedPost.title = post.title;
  }

  if (fields.includes("publishedAt")) {
    if (!post.publishedAt) {
      throw new Error("publishedAt is not defined");
    }

    translatedPost.publishedAt = new Date(post.publishedAt);
  }

  return translatedPost as Pick<Post, U>;
}

export class MicroCMSBlogClient implements BlogClient {
  private readonly client: ReturnType<typeof createClient>;

  constructor(props: ConstructorProps) {
    this.client = createClient({
      serviceDomain: props.serviceDomain,
      apiKey: props.apiKey,
    });
  }

  async getAllPost<U extends PostField>({
    fields,
  }: GetAllPostsProps<U>): GetAllPostResponse<U> {
    const posts = await this.client.getAllContents<Pick<MicroCMSPost, U>>({
      endpoint: "blogs",
      queries: {
        fields: fields.join(","),
      },
    });

    return {
      posts: posts.map((post) => toFieldPickedPost(post, fields)),
      totalCount: posts.length,
    };
  }

  async getPost(props: GetPostProps): GetPostResponse {
    const response = await this.client.get<MicroCMSPost>({
      endpoint: "blogs",
      contentId: props.id,
    });

    return {
      title: response.title,
      content: response.content,
      id: response.id,
      publishedAt: new Date(response.publishedAt),
      category: response.category,
      tags: response.tags,
    };
  }

  async getPosts<U extends PostField>({
    count,
    page,
    fields,
  }: GetPostsProps<U>): GetPostsResponse<U> {
    const { contents, totalCount } = await this.client.getList<
      Pick<MicroCMSPost, PostField>
    >({
      endpoint: "blogs",
      queries: {
        fields: fields.join(","),
        limit: count,
        offset: count * (page - 1),
      },
    });

    return {
      posts: contents.map((post) => toFieldPickedPost(post, fields)),
      totalCount,
    };
  }

  async getAllTags(): Promise<TagDto[]> {
    const tags = await this.client.getAllContents<MicroCMSTag>({
      endpoint: "tags",
    });

    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));
  }
}
