import type { createClient } from "@supabase/supabase-js";
import type { Database } from "types/supabase";
import { Article } from "@features/article/models/article";
import { type ArticleRepository } from "@features/article/usecases/article-repository";
import { fail, type Result, succeed } from "@/lib/result";
import { getLogger } from "@/lib/logger/get-logger";

const TABLE_NAME = "article";
export class SupabaseArticleRepository implements ArticleRepository {
  constructor(private supabase: ReturnType<typeof createClient<Database>>) {}

  async getByArticleId(articleId: string): Promise<Result<Article>> {
    const result = await this.supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("id", articleId)
      .single();

    if (result.error) {
      const logger = getLogger();
      logger.error(JSON.stringify(result.error));

      return fail("記事の取得に失敗しました");
    }

    return succeed(
      Article.fromDto({
        articleId: result.data.id,
        slug: result.data.slug,
      }),
    );
  }

  async saveMany(articles: Article[]): Promise<Result> {
    const result = await this.supabase.from(TABLE_NAME).upsert(
      articles.map((article) => {
        const { articleId: id, slug } = article.toDto();
        return { id, slug };
      }),
    );

    if (result.error) {
      const logger = getLogger();
      logger.error(JSON.stringify(result.error));

      return fail("記事の保存に失敗しました");
    }

    return succeed();
  }

  async deleteManyBySlug(slugs: string[]): Promise<Result> {
    const result = await this.supabase
      .from(TABLE_NAME)
      .delete()
      .in("slug", slugs);

    if (result.error) {
      const logger = getLogger();
      logger.error(JSON.stringify(result.error));

      return fail("記事の削除に失敗しました");
    }

    return succeed();
  }

  async listAll(): Promise<Result<Article[]>> {
    const result = await this.supabase.from(TABLE_NAME).select("*");
    if (result.error) {
      const logger = getLogger();
      logger.error(JSON.stringify(result.error));

      return fail("記事リストの取得に失敗しました");
    }

    return succeed(
      result.data.map((article) =>
        Article.fromDto({
          articleId: article.id,
          slug: article.slug,
        }),
      ),
    );
  }
}
