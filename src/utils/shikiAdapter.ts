import { createShikiAdapter } from "@mantine/code-highlight";
import {
  createHighlighterCore,
  createJavaScriptRegexEngine,
} from "shiki";

async function createShikiHighlighter() {
  return createHighlighterCore({
    langs: [import("@shikijs/langs-precompiled/ruby")],
    themes: [import("@shikijs/themes/github-light")],
    engine: createJavaScriptRegexEngine(),
  });
}

export const shikiAdapter = createShikiAdapter(() => createShikiHighlighter());
