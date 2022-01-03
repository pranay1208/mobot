import notifee, { TimestampTrigger, TriggerType } from "@notifee/react-native";

export interface PushNotificationDetails {
  title: string;
  body: string;
  timestamp: number;
}

// const smallIcon = require("../../assets/icon.png");
let channelId = "";

const instantiateChannel = async () => {
  channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });
};

export const createTriggerNotification = async (
  info: PushNotificationDetails
) => {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: info.timestamp,
  };
  const notifId = await notifee.createTriggerNotification(
    {
      title: info.title,
      body: info.body,
      android: {
        channelId,
      },
    },
    trigger
  );
  return notifId;
};

export const cancelTriggerNotification = async (id: string) => {
  await notifee.cancelNotification(id);
};

export const cancellAllNotifications = async () => {
  await notifee.cancelAllNotifications();
};

instantiateChannel();
