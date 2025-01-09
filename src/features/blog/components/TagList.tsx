import type { TagDto } from "../blog-client";
import { Tag } from "./tag";

type Props = {
  tags: TagDto[];
};
export function TagList({ tags }: Props) {
  return (
    <ul className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <li key={tag.id}>
          <Tag tagId={tag.id}>{tag.name}</Tag>
        </li>
      ))}
    </ul>
  );
}
