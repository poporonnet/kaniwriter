export const embedError = (sourceCode: string, error: string) => {
  const match = error?.match(
    /input:(?<line>\d+):(?<column>\d+): (?<message>.+)/
  );
  if (!match?.groups) return sourceCode;

  const lines = sourceCode.replaceAll("\r\n", "\n").split("\n");
  const groups = match.groups as {
    line: string;
    column: string;
    message: string;
  };
  const line = parseInt(groups.line, 10);
  const column = parseInt(groups.column, 10);
  const text = lines[line - 1];
  const indentDepth = text.length - text.trimStart().length;
  lines[line - 1] =
    `${text} // [!code error]\n// [!code errorMessage:${column + indentDepth} ${groups.message}]`;

  return lines.join("\n");
};
