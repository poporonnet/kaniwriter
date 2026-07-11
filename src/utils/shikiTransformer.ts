import { ShikiTransformer } from "shiki/core";

/**
 * `// [!code errorMessage:(列数) (メッセージ)]` という形式で指定した場所にエラーメッセージを表示する
 */
export const transformerErrorMessage = (): ShikiTransformer => ({
  line(node) {
    const text = node.children
      .flatMap((element) => {
        if (element.type !== "element") return [];
        return element.children.flatMap((text) => {
          if (text.type !== "text") return [];
          return text.value;
        });
      })
      .join("");
    const match = text.match(
      /^\/\/ \[!code errorMessage:(?<column>\d+) (?<message>.+)\]$/
    );
    if (!match?.groups) return;

    const message = match.groups["message"];
    const column = parseInt(match.groups["column"]);
    const indent = [...new Array(column).keys()].map(() => " ").join("");

    node.children = [
      {
        type: "text",
        value: `${indent}^${message}`,
      },
    ];
    this.addClassToHast(node, "error-message");
  },
});
