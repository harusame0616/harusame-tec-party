import type { Result } from "@/lib/result";

export interface ArticleGateway {
  getAllArticleSlugs(): Promise<Result<string[]>>;
}
