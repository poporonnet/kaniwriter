import {
  type DefaultMantineColor,
  DefaultMantineSize,
  type MantineColorsTuple,
  MantineThemeColorsOverride,
  MantineThemeSizesOverride,
} from "@mantine/core";

type CustomColors =
  | "danger"
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}
