import { load } from "cheerio";
import hljs, { type HighlightResult } from "highlight.js";

// https://codeseterpie.com/blog/e91oc4aaef58/
export function highLight(htmlText: string) {
  const $ = load(htmlText);
  // コードブロックのファイル名が入力されている場合の処理
  $("div[data-filename]").each((_, elm) => {
    // data-filename属性の値を持つspanを
    // <div data-filename="{入力したファイル名}">の最初の子要素として追加
    $(elm).prepend(`<span>${$(elm).attr("data-filename")}</span>`);
  });

  // コードブロックのシンタックスハイライトを行う
  $("pre code").each((_, elm) => {
    const language = $(elm).attr("class") || "";
    let result: HighlightResult;

    if (language === "") {
      // 言語が入力なしの場合、自動判定
      result = hljs.highlightAuto($(elm).text());
    } else {
      // 言語が入力ありの場合、入力された言語で判定
      result = hljs.highlight($(elm).text(), {
        language: language.replace("language-", ""),
      });
    }
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return $.html();
}
