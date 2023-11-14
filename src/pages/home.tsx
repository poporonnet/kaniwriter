import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Radio,
  radioClasses,
  RadioGroup,
  Sheet,
} from "@mui/joy";
import { Input, Typography } from "@mui/material";
import Ansi from "ansi-to-react";
import "css/home.css";

import RBoard from "/RBoard.png";
import ESP32 from "/ESP32.png";
import { Flag, Usb } from "@mui/icons-material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { MrubyWriterConnector } from "../libs/mrubyWriterConnector";

const targets = [
  {
    title: "Rboard",
    image: RBoard,
  },
  {
    title: "ESP32",
    image: ESP32,
  },
];

export const Home = () => {
  const [step, setStep] = useState<number>(0);
  const [target, setTarget] = useState<string>("");
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [connector] = useState<MrubyWriterConnector>(
    new MrubyWriterConnector(
      "ESP32",
      (message) => console.log({ message }),
      (_, buffer) => setLog([...buffer])
    )
  );

  const connect = async () => {
    const res = await connector.connect(
      async () => await navigator.serial.requestPort()
    );
    if (res.isFailure()) {
      alert(`ポートを取得できませんでした。\n${res.error}`);
      console.log(res.error);
      return;
    }
    await read();
  };

  const read = async () => {
    const res = await connector.startListen();
    if (res.isFailure()) {
      alert(`受信中にエラーが発生しました。\n${res.error}`);
      console.log(res);
    }
  };

  const send = async (text: string) => {
    const res = await connector.sendCommand(text);
    if (res.isFailure()) {
      alert(`送信中にエラーが発生しました。\n${res.error}`);
      console.log(res);
    }
  };

  return (
    <div id={"home"}>
      <Box id={"home"}>
        <Typography
          variant="h4"
          component="div"
          color="black"
          fontFamily={"'M PLUS Rounded 1c', sans-serif"}
        >
          書き込みツール
        </Typography>

        {/* マイコン選択 */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <RadioGroup
            aria-label="platform"
            defaultValue="Website"
            overlay
            name="platform"
            sx={{
              flexDirection: "row",
              margin: "2rem auto",
              gap: 2,
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -1,
                  border: "3px solid",
                  borderColor: "primary.500",
                },
              },
              [`& .${radioClasses.radio}`]: {
                display: "contents",
                "& > svg": {
                  zIndex: 2,
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  bgcolor: "background.surface",
                  borderRadius: "50%",
                },
              },
            }}
          >
            {targets.map((value, index) => (
              <Sheet
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: "md",
                  boxShadow: "sm",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  minWidth: 120,
                }}
              >
                <Radio
                  id={value.title}
                  value={value.title}
                  checkedIcon={<CheckCircleRoundedIcon />}
                  checked={target === value.title}
                  onChange={(e) => {
                    setTarget(e.target.value);
                    if (step === 0) setStep(1);
                  }}
                />
                <FormLabel htmlFor={value.title}>
                  <Typography fontFamily={"'M PLUS Rounded 1c', sans-serif"}>
                    {value.title}
                  </Typography>
                </FormLabel>
                <img
                  src={value.image}
                  alt={value.title}
                  style={{
                    aspectRatio: "1/1",
                    width: "10rem",
                    margin: "0 auto",
                  }}
                />
              </Sheet>
            ))}
          </RadioGroup>
        </Box>

        {/* マイコン接続 */}

        <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
          <Button
            //disabled={step !== 2}
            onClick={connect}
          >
            接続
            <Usb />
          </Button>
        </Box>

        <Log log={log} />
        <Input type="text" onChange={(e) => setCommand(e.target.value)} />
        <Input type="submit" onClick={() => send(command)} value="Send" />

        {/* 書き込み中 */}
        <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
          <Button>
            書き込み
            <Flag />
          </Button>
        </Box>
        <Button onClick={() => setStep(0)}>リセット</Button>
      </Box>
    </div>
  );
};

const Log = (props: { log: string[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!autoScroll) return;

    scrollRef.current?.scroll({
      top: scrollRef.current.scrollHeight,
    });
  });

  useEffect(() => {
    const onScrollEnd = () => {
      const current = scrollRef.current;
      if (!current) return;

      console.log("scrollend");
      const currentScroll = current.clientHeight + current.scrollTop;
      setAutoScroll(currentScroll == current.scrollHeight);
    };

    scrollRef.current?.addEventListener("scrollend", onScrollEnd);
    return () =>
      scrollRef.current?.removeEventListener("scrollend", onScrollEnd);
  }, []);

  return (
    <Sheet
      variant="outlined"
      ref={scrollRef}
      sx={{
        m: "0 auto",
        px: "0.5rem",
        width: "85%",
        height: "20rem",
        textAlign: "left",
        overflowY: "auto",
        resize: "vertical",
      }}
    >
      {props.log.map((text, index) => (
        <div key={`log-${index}`}>
          <Ansi>{text}</Ansi>
        </div>
      ))}
    </Sheet>
  );
};
