import useSWR from "swr";
import { queryComments } from "../infrastructures/supabase";
import { type CommentDto } from "@/features/comment/models/comment";

export function useQueryComments(
  articleSlug: string,
):
  | { data: null; success: false; message: string; isLoading: false }
  | { data: CommentDto[]; success: true; isLoading: false }
  | { data: null; isLoading: true } {
  const result = useSWR(articleSlug, queryComments);

  if (result.isLoading) {
    return { data: null, isLoading: true };
  }

  if (result.error || !result.data) {
    return {
      data: null,
      success: false,
      message: "データの取得に失敗しました",
      isLoading: false,
    };
  }

  if (!result.data.success) {
    return {
      data: null,
      success: false,
      message: result.data.message,
      isLoading: false,
    };
  }

  return {
    data: result.data.data,
    success: true,
    isLoading: false,
  };
}
