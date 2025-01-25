import type { PropsWithChildren } from "react";
import { Badge } from "@/components/ui/badge";

type TagPresenterProps = PropsWithChildren;
function TagPresenter({ children }: TagPresenterProps) {
  return (
    <Badge
      variant="outline"
      className="block min-w-[4rem] max-w-[180px] truncate rounded-full px-2 text-center transition-all group-hover/tag:bg-primary group-hover/tag:text-primary-foreground group-focus/tag:bg-primary group-focus/tag:text-primary-foreground group-active/tag:bg-primary group-active/edit:text-primary-foreground"
    >
      {children}
    </Badge>
  );
}

type TagProps = TagPresenterProps & {
  tagId: string;
};
export function Tag({ tagId, ...tagPresenterProps }: TagProps) {
  return (
    <a href={`/blog/tags/${tagId}/pages/1/`} className="group/tag">
      <TagPresenter {...tagPresenterProps} />
    </a>
  );
}
