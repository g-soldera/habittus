import * as Haptics from "expo-haptics";

export function useHaptics() {
  const lightTap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const mediumTap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const heavyTap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const successFeedback = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const warningFeedback = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const errorFeedback = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  return {
    lightTap,
    mediumTap,
    heavyTap,
    successFeedback,
    warningFeedback,
    errorFeedback,
  };
}
