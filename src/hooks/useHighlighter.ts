import { useEffect, useState } from "react";
import { createHighlighterCore, HighlighterCore } from "shiki/core";
import { createJavaScriptRawEngine } from "shiki/engine/javascript";

// カスタムフックの定義
export const useHighlighter = () => {
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  // シンタックスハイライターの初期化
  useEffect(() => {
    const createHighlighter = async () => {
      const highlighter = await createHighlighterCore({
        themes: [import("@shikijs/themes/github-light")],
        langs: [import("@shikijs/langs-precompiled/ruby")],
        engine: createJavaScriptRawEngine(),
      });
      setHighlighter(highlighter);
    };
    createHighlighter();
  }, []);

  return highlighter;
};
