import {
  Anchor,
  Button,
  Group,
  HoverCard,
  Image,
  Space,
  Stack,
  Text,
  useCombobox,
} from "@mantine/core";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MdTranslate as TranslateIcon } from "react-icons/md";
import { VscGithubInverted as GitHubIcon } from "react-icons/vsc";
import icon from "/images/logo.webp";

export const Header = () => {
  const [t, i18n] = useTranslation();
  const languages = useMemo(
    () =>
      i18n.languages
        .map((locale) => ({
          locale,
          name: t("languageName", { lng: locale }),
        }))
        .sort((lang1, lang2) => lang1.name.localeCompare(lang2.name)),
    [t, i18n]
  );
  const setLanguage = useCallback(
    (locale: string) => {
      i18n.changeLanguage(locale);
      localStorage.setItem("locale", locale);
    },
    [i18n]
  );
  const languageCombobox = useCombobox({
    onDropdownClose: () => languageCombobox.resetSelectedOption(),
  });

  return (
    <Group
      h="100%"
      bg="#FF3227"
      c="white"
      gap="xl"
      pr="xl"
      style={{
        boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Group h="100%" gap="0.4rem" wrap="nowrap">
        <Image src={icon} alt={t("RubyCity松江のロゴ")} h="100%" />

        <Text>
          <Anchor
            href={import.meta.env.BASE_URL}
            underline="never"
            c="inherit"
            fz="2.125rem"
          >
            {t("kaniwriter")}
          </Anchor>
          <Anchor
            href={`https://github.com/${
              import.meta.env.VITE_WRITER_REPOSITORY_PATH
            }/releases`}
            target="_blank"
            underline="never"
            ml="0.5rem"
            fz="1.2rem"
            c="#DDDDDD"
          >
            {import.meta.env.NPM_PACKAGE_VERSION}
          </Anchor>
        </Text>
      </Group>

      <Space flex={1} />

      <Anchor
        href={import.meta.env.VITE_REFERENCE_URL}
        target="_blank"
        underline="never"
        c="inherit"
      >
        {t("参考資料")}
      </Anchor>

      <HoverCard
        width="7rem"
        shadow="lg"
        radius="0.2rem"
        transitionProps={{ duration: 100 }}
        offset={7}
      >
        <HoverCard.Target>
          <TranslateIcon size="35px" />
        </HoverCard.Target>

        <HoverCard.Dropdown p={0} bd={0}>
          <Stack gap={0}>
            {languages.map(({ locale, name }) => (
              <Button
                onClick={() => setLanguage(locale)}
                variant="transparent"
                c="black"
                key={locale}
              >
                {name}
              </Button>
            ))}
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>

      <Anchor
        href={`https://github.com/${
          import.meta.env.VITE_WRITER_REPOSITORY_PATH
        }`}
        c="inherit"
        h="35px"
        target="_blank"
      >
        <GitHubIcon size="35px" />
      </Anchor>
    </Group>
  );
};
