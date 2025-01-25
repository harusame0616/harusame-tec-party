import type { ArticleRepository } from "@features/article/usecases/article-repository";
import type { NotificationGateway } from "@features/comment/usecases/notification-gateway";

export class CommentNotificationUsecase {
  constructor(
    private notificationGateway: NotificationGateway,
    private articleRepository: ArticleRepository,
    private articlesUrl: URL,
  ) {}

  async execute(articleId: string, name: string, text: string) {
    const articleGetResult =
      await this.articleRepository.getByArticleId(articleId);
    if (!articleGetResult.success) {
      return { success: false, message: "記事が見つかりませんでした" };
    }

    const notificationMessage = `コメントが投稿されました。\n${name} さんからのコメント：\n${text}\n\n記事はこちら：${new URL(
      articleGetResult.data.getSlug(),
      this.articlesUrl,
    ).toString()}`;
    await this.notificationGateway.notify(notificationMessage);
    return { success: true };
  }
}
