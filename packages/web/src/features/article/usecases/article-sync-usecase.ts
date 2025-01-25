import { Article } from "@features/article/models/article";
import { type ArticleGateway } from "@features/article/usecases/article-gateway";
import { type ArticleRepository } from "@features/article/usecases/article-repository";
import { type Result, succeed } from "@/lib/result";
import { getLogger } from "@/lib/logger/get-logger";

export class ArticleSyncUsecase {
  constructor(
    private readonly articleGateway: ArticleGateway,
    private articleRepository: ArticleRepository,
  ) {}

  async execute(): Promise<Result> {
    const [slugsResult, articlesResult] = await Promise.all([
      this.articleGateway.getAllArticleSlugs(),
      this.articleRepository.listAll(),
    ]);

    const logger = getLogger();

    if (!slugsResult.success) {
      logger.error(slugsResult.message);
      return slugsResult;
    }
    if (!articlesResult.success) {
      logger.error(articlesResult.message);
      return articlesResult;
    }

    const articleSlugMap = new Map(
      articlesResult.data.map((article) => [article.getSlug(), article]),
    );
    const newArticles = slugsResult.data
      .filter((slug) => !articleSlugMap.has(slug))
      .map((slug) => Article.create(slug));

    const lostArticles = articlesResult.data.filter(
      (article) => !slugsResult.data.includes(article.getSlug()),
    );

    const deleteResult = await this.articleRepository.deleteManyBySlug(
      lostArticles.map((article) => article.getSlug()),
    );
    const saveResult = await this.articleRepository.saveMany(newArticles);

    if (!deleteResult.success) {
      logger.error(deleteResult.message);
      return deleteResult;
    }
    if (!saveResult.success) {
      logger.error(saveResult.message);
      return saveResult;
    }

    return succeed();
  }
}
