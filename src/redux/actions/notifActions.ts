import { AnyAction } from "redux";
import {
  DISMISS_NOTIFICATION,
  REFRESH_UPDATE_NOTIFICATION,
} from "./actionNames";

export const dismissNotificationAction = (index: number): AnyAction => {
  return {
    type: DISMISS_NOTIFICATION,
    payload: {
      index,
    },
  };
};

export interface DeadlineNotifInformation {
  courseUrl: string;
  courseName: string;
  resourceUrl: string;
  dueDate: number;
}
export const refreshUpdateNotifAction = (
  addedText: string,
  modifText: string,
  newDeadlines: DeadlineNotifInformation[],
  modDeadlines: DeadlineNotifInformation[],
  notifDurations: number[]
): AnyAction => {
  return {
    type: REFRESH_UPDATE_NOTIFICATION,
    payload: {
      addedText,
      modifText,
      newDeadlines,
      modDeadlines,
      notifDurations,
    },
  };
};
