import { v4 as uuid } from "uuid";

type ArticleDto = {
  slug: string;
  articleId: string;
};

export class Article {
  private articleId: string;

  private slug: string;

  private constructor({ slug, articleId }: ArticleDto) {
    this.articleId = articleId;
    this.slug = slug;
  }

  static create(slug: string) {
    return new Article({ slug, articleId: uuid() });
  }

  static fromDto({ slug, articleId }: ArticleDto) {
    return new Article({ slug, articleId });
  }

  toDto(): ArticleDto {
    return {
      slug: this.slug,
      articleId: this.articleId,
    };
  }

  getArticleId() {
    return this.articleId;
  }

  getSlug() {
    return this.slug;
  }
}
