import type { PropsWithChildren } from "react";
import { type CommentDto } from "../models/comment";
import { Skeleton } from "@/components/ui/skeleton";
import { MuteText } from "@/components/MuteText";
import { DateDistance } from "@/components/DateDistance";

type Props =
  | { comment: CommentDto; skeleton?: false }
  | { comment?: undefined; skeleton: true };

export function CommentListItem({ skeleton, comment }: Props) {
  return (
    <article>
      {skeleton ? (
        <LineBox>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-32" />
        </LineBox>
      ) : (
        <div>
          <span className="mr-1 text-sm font-bold">{comment.name}</span>
          <MuteText>
            さんが
            <span className="mx-1 font-bold">
              <DateDistance date={comment.commentedAt} /> ago
            </span>
            にコメント
          </MuteText>
        </div>
      )}
      <div className="mt-1 whitespace-pre-wrap ">
        {skeleton ? (
          <>
            <LineBox>
              <Skeleton className="h-5 w-48" />
            </LineBox>
            <LineBox>
              <Skeleton className="h-5 w-72" />
            </LineBox>
            <LineBox>
              <Skeleton className="h-5 w-52" />
            </LineBox>
          </>
        ) : (
          comment.text
        )}
      </div>
    </article>
  );
}

function LineBox({ children }: PropsWithChildren) {
  return <div className="flex h-6 items-end">{children}</div>;
}
