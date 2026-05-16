import { createShikiAdapter } from "@mantine/code-highlight";
import {
  createHighlighterCore,
  createJavaScriptRegexEngine,
} from "shiki";

async function createShikiHighlighter() {
  const [{ default: rubyLangs }, { default: githubLight }] = await Promise.all([
    import("@shikijs/langs-precompiled/ruby"),
    import("@shikijs/themes/github-light"),
  ]);
  return createHighlighterCore({
    langs: rubyLangs,
    themes: [githubLight],
    engine: createJavaScriptRegexEngine(),
  });
}

export const shikiAdapter = createShikiAdapter(() => createShikiHighlighter());
