import { AnyAction } from "redux";
import { NotificationType } from "../../interfaces/interface";
import {
  ADD_NEW_NOTIFICATION,
  CLEAR_ALL_DATA,
  DELETE_COURSE,
  DELETE_NOTIFICATION,
  DISMISS_NOTIFICATION,
  REFRESH_UPDATE_NOTIFICATION,
} from "../actions/actionNames";
import { DeadlineNotifInformation } from "../actions/notifActions";

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
      return [...state, ...newNotifs].sort(sortNotifications);
    case DELETE_NOTIFICATION:
      return state.filter(
        (notif) => notif.daysBeforeDeadline !== action.payload.numDays
      );
    case DISMISS_NOTIFICATION:
      return state.filter((_, index) => index !== action.payload.index);
    case CLEAR_ALL_DATA:
      return [];
    case REFRESH_UPDATE_NOTIFICATION:
      let newState = [...state];
      //Added Notif
      const addedTxt = action.payload.addedText as string;
      if (addedTxt !== "") {
        newState.push(makeGeneralNotif(addedTxt, "ADD"));
      }
      //Modif Notif
      const modTxt = action.payload.modifText as string;
      if (modTxt !== "") {
        newState.push(makeGeneralNotif(modTxt, "MODIFY"));
      }
      const notifDurations = action.payload.notifDurations as number[];
      //Modif Deadline notif
      const modifDeadlines = action.payload
        .modDeadlines as DeadlineNotifInformation[];
      modifDeadlines.forEach((ddl) => {
        newState = newState.filter(
          (notif) => notif.resourceUrl !== ddl.resourceUrl
        );
      });
      //New Deadline notif
      const newDeadlines = action.payload
        .newDeadlines as DeadlineNotifInformation[];
      const newDdlNotifs = newDeadlines
        .map((ddl) => makeNewDeadlineNotifs(ddl, notifDurations))
        .reduce((prev, curr) => [...prev, ...curr], []);
      newState.push(...newDdlNotifs);
      return newState.sort(sortNotifications);
    case DELETE_COURSE:
      return state.filter(
        (notif) => notif.courseUrl !== action.payload.courseUrl
      );
    default:
      return state;
  }
};

export default notificationReducer;

const makeGeneralNotif = (
  txt: string,
  type: NotificationType
): NotificationData => {
  return {
    notificationText: txt,
    notificationType: type,
    dateAvailable: new Date().getTime(),
    courseUrl: "",
    resourceUrl: "",
    daysBeforeDeadline: 0,
  };
};

const sortNotifications = (
  a: NotificationData,
  b: NotificationData
): number => {
  return b.dateAvailable - a.dateAvailable;
};

const makeNewDeadlineNotifs = (
  ddl: DeadlineNotifInformation,
  durations: number[]
): NotificationData[] => {
  return durations.map((num) => {
    const dateAvailable = Math.max(
      new Date().getTime(),
      ddl.dueDate - num * DAY_IN_MS
    );
    return {
      notificationText: `Deadline notification for ${ddl.courseName}`,
      notificationType: "DEADLINE",
      daysBeforeDeadline: num,
      dateAvailable,
      courseUrl: ddl.courseUrl,
      resourceUrl: ddl.resourceUrl,
    };
  });
};
