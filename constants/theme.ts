/**
 * Habittus Cyberpunk Theme
 * Dark neon aesthetic with vibrant accent colors
 */

import { Platform } from "react-native";

// Cyberpunk Color Palette
export const CyberpunkColors = {
  // Primary Neons
  cyan: "#00d9ff",
  magenta: "#ff006e",
  green: "#39ff14",
  purple: "#b537f2",
  yellow: "#ffff00",

  // Backgrounds
  darkBg: "#0a0e27",
  cardBg: "#1a1f3a",
  inputBg: "#0f1419",

  // Text
  textPrimary: "#ffffff",
  textSecondary: "#a0aec0",
  textDisabled: "#4a5568",

  // Status
  success: "#39ff14",
  warning: "#ffff00",
  error: "#ff0055",
  info: "#00d9ff",

  // Additional
  darkGray: "#4a5568",
  black: "#000000",
};

const tintColorLight = "#0a7ea4";
const tintColorDark = "#00d9ff"; // Neon Cyan

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: CyberpunkColors.textPrimary,
    background: CyberpunkColors.darkBg,
    tint: CyberpunkColors.cyan,
    icon: CyberpunkColors.textSecondary,
    tabIconDefault: CyberpunkColors.textSecondary,
    tabIconSelected: CyberpunkColors.cyan,
    // Additional cyberpunk colors
    cardBackground: CyberpunkColors.cardBg,
    inputBackground: CyberpunkColors.inputBg,
    success: CyberpunkColors.success,
    warning: CyberpunkColors.warning,
    error: CyberpunkColors.error,
    magenta: CyberpunkColors.magenta,
    purple: CyberpunkColors.purple,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** Monospaced for cyberpunk aesthetic */
    sans: "Courier New",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "Menlo",
  },
  default: {
    sans: "monospace",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "'Courier New', Courier, monospace",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
});
