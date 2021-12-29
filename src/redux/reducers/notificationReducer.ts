import { AnyAction } from "redux";
import { NotificationType } from "../../interfaces/interface";
import {
  ADD_NEW_NOTIFICATION,
  CLEAR_ALL_DATA,
  DELETE_NOTIFICATION,
  DISMISS_NOTIFICATION,
} from "../actions/actionNames";

interface NotificationData {
  notificationText: string;
  dateAvailable: number; //this is num ms from 1970
  notificationType: NotificationType;
  courseUrl: string;
  resourceUrl: string;
  daysBeforeDeadline: number;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const notificationReducer = (
  state: NotificationData[] = [],
  action: AnyAction
): NotificationData[] => {
  switch (action.type) {
    case ADD_NEW_NOTIFICATION:
      const uniqueDeadlines: Record<string, NotificationData> = {};
      state.forEach((notif) => {
        if (
          notif.notificationType !== "DEADLINE" ||
          notif.resourceUrl in uniqueDeadlines
        ) {
          return;
        }
        uniqueDeadlines[notif.resourceUrl] = notif;
      });
      const newNotifs: NotificationData[] = Object.values(uniqueDeadlines).map(
        (deadline) => {
          const dateAvailable =
            deadline.dateAvailable +
            (deadline.daysBeforeDeadline - action.payload.numDays) * DAY_IN_MS;
          return {
            ...deadline,
            dateAvailable,
            daysBeforeDeadline: action.payload.numDays,
          };
        }
      );
      return [...state, ...newNotifs].sort(
        (a, b) => a.dateAvailable - b.dateAvailable
      );
    case DELETE_NOTIFICATION:
      return state.filter(
        (notif) => notif.daysBeforeDeadline !== action.payload.numDays
      );
    case DISMISS_NOTIFICATION:
      return state.filter((_, index) => index !== action.payload.index);
    case CLEAR_ALL_DATA:
      return [];
    default:
      return state;
  }
};

export default notificationReducer;
