import { Button, Group, Loader, Stack, Text, ThemeIcon } from "@mantine/core";
import { CompileStatus as CompileStatusType } from "hooks/useCompile";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MdCheck as CheckIcon,
  MdErrorOutline as ErrorOutlineIcon,
} from "react-icons/md";
import { ErrorDetailModal } from "./ErrorMessageModal";

export const CompileStatus = ({
  status,
  errorName,
  errorBody,
}: CompileStatusType) => {
  const [t] = useTranslation();
  const [isOpenErrorDetail, setIsOpenErrorDetail] = useState(false);

  return (
    <Group gap={0} py="0.5rem" px="1.5rem" w="100%" justify="center">
      {status === "idle" && (
        <>
          {t("コンパイル待機中")}
          <Loader size="sm" color="primary.5" ml="md" />
        </>
      )}
      {status === "compile" && (
        <>
          {t("コンパイル中")}
          <Loader size="sm" color="primary.5" ml="md" />
        </>
      )}
      {status === "success" && (
        <>
          {t("コンパイル完了")}
          <ThemeIcon
            variant="transparent"
            c="success.5"
            size="fit-content"
            bd={0}
          >
            <CheckIcon />
          </ThemeIcon>
        </>
      )}
      {status === "error" && (
        <Stack gap={0} flex={1} ta="center" align="center">
          <Group gap={0}>
            {t("コンパイル失敗")}
            <ThemeIcon
              variant="transparent"
              c="danger.5"
              size="fit-content"
              bd={0}
            >
              <ErrorOutlineIcon />
            </ThemeIcon>
          </Group>
          {errorBody ? (
            <>
              <Button
                onClick={() => setIsOpenErrorDetail((prev) => !prev)}
                variant="subtle"
                c="dark"
                color="danger.4"
                h="auto"
                p="0.2rem 0"
                bd={0}
                bdrs="md"
                styles={{
                  label: {
                    textWrap: "wrap",
                    display: "flex",
                    flexDirection: "column",
                    userSelect: "none",
                  },
                }}
              >
                <Text component="code">{errorName ?? "unknown error"}</Text>
                <Text fz="0.8rem" c="danger.5">
                  {isOpenErrorDetail
                    ? t("クリックして閉じる")
                    : t("エラーの詳細を見る")}
                </Text>
              </Button>
              <ErrorDetailModal
                error={errorBody}
                isOpen={isOpenErrorDetail}
                setIsOpen={setIsOpenErrorDetail}
              />
            </>
          ) : (
            <Text component="code">{errorName ?? "unknown error"}</Text>
          )}
        </Stack>
      )}
    </Group>
  );
};
