import { GitHub, Translate } from "@mui/icons-material";
import { Box, Button, Link, Sheet, Typography } from "@mui/joy";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
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

  return (
    <Sheet
      component="header"
      id="header"
      sx={{
        position: "static",
        height: "4rem",
        width: "100%",
        whiteSpace: "nowrap",
        backgroundColor: "#ff3227",
        display: "flex",
        alignItems: "center",
        color: "white",
        boxShadow: "0px 4px 5px rgba(0,0,0,0.25)",
        gap: "2rem",
        pr: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          gap: "0.4rem",
        }}
      >
        <img
          src={icon}
          alt={t("RubyCity松江のロゴ")}
          style={{
            height: "100%",
          }}
        />
        <Link
          href={import.meta.env.VITE_BASE_URL}
          underline="none"
          sx={{ color: "inherit" }}
        >
          <Typography fontSize="2.125rem">
            {t("kaniwriter")}
            <Link
              fontSize="1.2rem"
              textColor="#DDD"
              href="https://github.com/poporonnet/kaniwriter/releases"
              target="_blank"
              underline="none"
              pl="1rem"
            >
              {` ${import.meta.env.NPM_PACKAGE_VERSION}`}
            </Link>
          </Typography>
        </Link>
      </Box>
      <Box flex={1} />
      <Link
        href={import.meta.env.VITE_REFERENCE_URL}
        textColor="inherit"
        underline="none"
        target="_blank"
      >
        {t("参考資料")}
      </Link>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          "&:hover > div": {
            opacity: 1,
            visibility: "visible",
          },
        }}
      >
        <Translate fontSize="large" />
        <Sheet
          sx={{
            width: "7rem",
            position: "absolute",
            top: "calc(1.5rem + 50%)",
            left: "calc(-3.5rem + 50%)",
            zIndex: "1",
            background: "transparent",
            transition: "all 100ms ease-in-out",
            opacity: 0,
            visibility: "hidden",
          }}
        >
          <Sheet
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "white",
              boxShadow: "lg",
              borderRadius: "0.2rem",
            }}
          >
            {languages.map(({ locale, name }) => (
              <Button
                variant="plain"
                onClick={() => setLanguage(locale)}
                sx={{
                  color: "black",
                  transition: "all 100ms ease-in-out",
                  ":hover": {
                    background: "white",
                    color: "var(--header-bg)",
                  },
                }}
                key={locale}
              >
                {name}
              </Button>
            ))}
          </Sheet>
        </Sheet>
      </Box>
      <Link
        href={`https://github.com/${
          import.meta.env.VITE_WRITER_REPOSITORY_PATH
        }`}
        textColor="inherit"
        underline="none"
        target="_blank"
      >
        <GitHub fontSize="large" />
      </Link>
    </Sheet>
  );
};
