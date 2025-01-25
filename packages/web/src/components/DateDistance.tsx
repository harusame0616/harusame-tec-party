import { formatDistanceToNow } from "date-fns";

type Props = {
  date: string | Date;
};

export function DateDistance({ date }: Props) {
  return <span>{formatDistanceToNow(new Date(date))}</span>;
}
