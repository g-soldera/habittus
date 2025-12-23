import { View, type ViewProps, Platform } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  // Workaround: react-native-web warns when pointerEvents is passed as a prop.
  // Move pointerEvents into style on web to avoid deprecation warnings.
  const { pointerEvents, ...rest } = otherProps as any;
  let combinedStyle = style;

  if (Platform.OS === 'web' && pointerEvents) {
    combinedStyle = [style, { pointerEvents }];
  }

  return <View style={[{ backgroundColor }, combinedStyle]} {...rest} />;
}
