import { Input } from "@/components/ui/input";

export function BlogSearchForm() {
  return (
    <search aria-label="ブログ内検索" role="search">
      <form method="GET" action="https://google.com/search" className="w-full">
        <input type="hidden" name="q" value="site:https://harusame.dev/" />
        <Input
          name="q"
          type="search"
          aria-label="検索キーワード"
          placeholder="検索キーワード"
        />
      </form>
    </search>
  );
}
