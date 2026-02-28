import { Paper, Text } from "@mantine/core";
import { ansiToJson } from "anser";
import { useEffect, useRef } from "react";

export const Log = (props: { log: string[]; autoScroll: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.autoScroll) return;

    scrollRef.current?.scroll({
      top: scrollRef.current.scrollHeight,
    });
  });

  return (
    <Paper
      withBorder
      radius={0}
      ref={scrollRef}
      p="xs"
      style={{
        borderColor: "#CDD7E1",
        boxSizing: "border-box",
        width: "100%",
        textAlign: "left",
        height: "20rem",
        minHeight: "12.5rem",
        minWidth: "inherit",
        maxWidth: "calc(min(100vw, 100dvw) - 20rem)",
        overflow: "auto",
        flexGrow: 1,
        whiteSpace: "nowrap",
        fontFamily: "'Noto Sans Mono', monospace",
        backgroundColor: "#FBFCFE",
      }}
    >
      {props.log.map((log) => (
        <>
          {ansiToJson(log, { remove_empty: true }).map((entry, index) => (
              <Text
                key={`log-${index}`}
                style={{
                  color: entry.fg ? `rgb(${entry.fg})` : "inherit",
                  backgroundColor: entry.bg ? `rgb(${entry.bg})` : "inherit",
                  display: "inline",
                  fontSize: "0.8rem",
                  fontFamily: "inherit",
                }}
              >
                {entry.content}
              </Text>
            ))}
          {log.length > 0 && <br />}
      ))}
    </Paper>
  );
};
