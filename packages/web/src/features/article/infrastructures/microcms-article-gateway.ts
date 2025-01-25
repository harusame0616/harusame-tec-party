import { createClient } from "microcms-js-sdk";
import { type ArticleGateway } from "@features/article/usecases/article-gateway";
import { getLogger } from "@/lib/logger/get-logger";
import { fail, succeed, type Result } from "@/lib/result";

export class MicroCmsArticleGateway implements ArticleGateway {
  constructor(private microcms: ReturnType<typeof createClient>) {}

  async getAllArticleSlugs(): Promise<Result<string[]>> {
    try {
      const res = await this.microcms.getAllContentIds({
        endpoint: "blogs",
      });

      return succeed(res);
    } catch (error) {
      const logger = getLogger();
      logger.error(JSON.stringify({ error }));

      return fail("記事の取得に失敗しました");
    }
  }
}
