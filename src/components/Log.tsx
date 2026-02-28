import { Paper, Text, useMantineTheme } from "@mantine/core";
import { ansiToJson } from "anser";
import { useEffect, useRef } from "react";

export const Log = (props: { log: string[]; autoScroll: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const theme = useMantineTheme();

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
      px="0.5rem"
      w="100%"
      h="20rem"
      mih="12.5rem"
      miw="inherit"
      maw="calc(min(100vw, 100dvw) - 20rem)"
      ta="left"
      ff="'Noto Sans Mono', monospace"
      bg="neutral.0"
      style={{
        borderColor: theme.colors.neutral[3],
        overflow: "auto",
        flexGrow: 1,
        whiteSpace: "nowrap",
      }}
    >
      {props.log.map((log) => (
        <>
          {ansiToJson(log, { remove_empty: true }).map((entry, index) => (
            <Text
              key={`log-${index}`}
              c={entry.fg ? `rgb(${entry.fg})` : "inherit"}
              bg={entry.bg ? `rgb(${entry.bg})` : "inherit"}
              display="inline"
              size="0.8rem"
              ff="inherit"
            >
              {entry.content}
            </Text>
          ))}
          {log.length > 0 && <br />}
        </>
      ))}
    </Paper>
  );
};
