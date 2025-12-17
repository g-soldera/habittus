import { useEffect } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotifications() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("[Notifications] Permission denied");
      }
    };

    requestPermissions();
  }, []);

  const scheduleGigReminder = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hora das Gigs!",
          body: "Complete suas tarefas diarias e mantenha seu Streak ativo!",
          sound: "default",
          badge: 1,
        },
        trigger: {
          seconds: 3600,
          repeats: true,
        } as any,
      });
      console.log("[Notifications] Gig reminder scheduled");
    } catch (error) {
      console.error("[Notifications] Error scheduling reminder:", error);
    }
  };

  const scheduleStreakNotification = (streakDays: number) => {
    try {
      Notifications.scheduleNotificationAsync({
        content: {
          title: `Streak de ${streakDays} dias!`,
          body: "Voce esta em uma sequencia incrivel! Continue assim!",
          sound: "default",
        },
        trigger: null,
      });
    } catch (error) {
      console.error("[Notifications] Error showing notification:", error);
    }
  };

  const scheduleSuccessNotification = (gigName: string) => {
    try {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Gig Completada!",
          body: `Voce completou: ${gigName}`,
          sound: "default",
        },
        trigger: null,
      });
    } catch (error) {
      console.error("[Notifications] Error showing notification:", error);
    }
  };

  const scheduleBountyDefeatedNotification = (bountyName: string) => {
    try {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Bounty Derrotada!",
          body: `Voce eliminou: ${bountyName}`,
          sound: "default",
        },
        trigger: null,
      });
    } catch (error) {
      console.error("[Notifications] Error showing notification:", error);
    }
  };

  return {
    scheduleGigReminder,
    scheduleStreakNotification,
    scheduleSuccessNotification,
    scheduleBountyDefeatedNotification,
  };
}
