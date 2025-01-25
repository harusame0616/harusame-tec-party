import type { Result } from "@/lib/result";
import type { Article } from "@features/article/models/article";

export interface ArticleRepository {
  getByArticleId(articleId: string): Promise<Result<Article>>;
  listAll(): Promise<Result<Article[]>>;
  saveMany(articles: Article[]): Promise<Result>;
  deleteManyBySlug(slugs: string[]): Promise<Result>;
}
