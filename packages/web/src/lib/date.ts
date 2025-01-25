import { ja } from "date-fns/locale";
import {
  format,
  formatDistanceToNow as dateFnsFormatDistanceToNow,
} from "date-fns";

export function formatDistanceToNow(date: Date): string {
  return dateFnsFormatDistanceToNow(date, {
    locale: ja,
    addSuffix: true,
  });
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
