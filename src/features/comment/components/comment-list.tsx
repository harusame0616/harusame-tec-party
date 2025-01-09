import type { CommentDto } from "../models/comment";
import { CommentListItem } from "./comment-list-item";

type Props =
  | { comments: CommentDto[]; skeleton?: false }
  | { comments?: undefined; skeleton: true };

export function CommentList({ skeleton, comments }: Props) {
  const liClass = "border-t py-6 last:border-b";

  return (
    <ul className="flex flex-col" aria-label="コメント">
      {skeleton
        ? Array.from({ length: 3 }).map((_, i) => (
            <li
              key={i}
              className={liClass}
              aria-busy={skeleton}
              aria-label="読込中"
              aria-hidden={i !== 0}
            >
              <CommentListItem skeleton />
            </li>
          ))
        : comments.map((comment) => (
            <li className={liClass} key={comment.commentId}>
              <CommentListItem comment={comment} />
            </li>
          ))}
    </ul>
  );
}
