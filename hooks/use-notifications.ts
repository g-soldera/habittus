import { useEffect } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
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

  const scheduleGigReminder = async (hour: number = 9, minute: number = 0) => {
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
          hour,
          minute,
          repeats: true,
        },
      });
      console.log("[Notifications] Gig reminder scheduled");
    } catch (error) {
      console.error("[Notifications] Error scheduling reminder:", error);
    }
  };

  const scheduleStreakNotification = (streakDays: number) => {
    try {
      Notifications.presentNotificationAsync({
        content: {
          title: `Streak de ${streakDays} dias!`,
          body: "Voce esta em uma sequencia incrivel! Continue assim!",
          sound: "default",
        },
      });
    } catch (error) {
      console.error("[Notifications] Error showing notification:", error);
    }
  };

  const scheduleSuccessNotification = (gigName: string) => {
    try {
      Notifications.presentNotificationAsync({
        content: {
          title: "Gig Completada!",
          body: `Voce completou: ${gigName}`,
          sound: "default",
        },
      });
    } catch (error) {
      console.error("[Notifications] Error showing notification:", error);
    }
  };

  const scheduleBountyDefeatedNotification = (bountyName: string) => {
    try {
      Notifications.presentNotificationAsync({
        content: {
          title: "Bounty Derrotada!",
          body: `Voce eliminou: ${bountyName}`,
          sound: "default",
        },
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
