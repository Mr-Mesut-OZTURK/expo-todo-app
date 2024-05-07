import * as React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

export const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#de2820",
    secondary: "#233041",
  },
  // mode: "exact",
  // dark: true,
  // version: 3,
  roundness: 5,
  fonts: {
    ...DefaultTheme.fonts,
    // labelMedium: {
    //     ...DefaultTheme.fonts.labelMedium,
    //     fontSize: 32,
    // },
    labelLarge: {
      // buttons text
      ...DefaultTheme.fonts.labelLarge,
      fontSize: 20,
    },
  },
};
