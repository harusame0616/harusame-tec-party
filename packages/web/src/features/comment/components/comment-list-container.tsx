import { useQueryComments } from "../hooks/use-comments";
import { CommentList } from "./comment-list";

type Props = {
  articleSlug: string;
};
export function CommentListContainer({ articleSlug }: Props) {
  const comments = useQueryComments(articleSlug);

  if (comments.isLoading) {
    return <CommentList skeleton />;
  }

  if (!comments.success) {
    return <div>{comments.message}</div>;
  }

  return comments.data.length ? (
    <CommentList comments={comments.data} />
  ) : (
    <div className="flex justify-center text-sm text-muted-foreground">
      コメントはありません
    </div>
  );
}
