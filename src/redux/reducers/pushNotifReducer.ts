import { AnyAction } from "redux";
import {
  cancellAllNotifications,
  cancelTriggerNotification,
  createTriggerNotification,
  PushNotificationDetails,
} from "../../utils/notifeeApi";
import {
  ADD_NEW_NOTIFICATION,
  CLEAR_ALL_DATA,
  DELETE_COURSE,
  DELETE_NOTIFICATION,
  REFRESH_UPDATE_NOTIFICATION,
} from "../actions/actionNames";
import { DeadlineNotifInformation } from "../actions/notifActions";

interface PushNotificationData {
  notificationDate: number;
  resourceUrl: string;
  numDaysBeforeDeadline: number;
  courseUrl: string;
  notificationId: string;
  notificationInfo: PushNotificationDetails;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const pushNotificationReducer = async (
  state: PushNotificationData[] = [],
  action: AnyAction
): Promise<PushNotificationData[]> => {
  let newState: PushNotificationData[];
  switch (action.type) {
    // fires when user adds a new notification duration (e.g. - 5 days)
    case ADD_NEW_NOTIFICATION:
      //a map of deadlines for unique resources
      const uniqueDeadlines: Record<string, PushNotificationData> = {};
      state.forEach((notif) => {
        if (notif.resourceUrl in uniqueDeadlines) {
          return;
        }
        uniqueDeadlines[notif.resourceUrl] = notif;
      });
      const newNotifications: PushNotificationData[] = await Promise.all(
        Object.values(uniqueDeadlines).map(async (deadline) => {
          const dateAvailable =
            deadline.notificationDate +
            (deadline.numDaysBeforeDeadline - action.payload.numDays) *
              DAY_IN_MS;
          const notifId = await createTriggerNotification(
            deadline.notificationInfo
          );
          return {
            ...deadline,
            notificationId: notifId,
            notificationDate: dateAvailable,
            numDaysBeforeDeadline: action.payload.numDays,
          };
        })
      );
      return [...state, ...newNotifications];
    // fires when user removes a notification duration (e.g. - 5 days)
    case DELETE_NOTIFICATION:
      newState = await Promise.all(
        state.filter(async (notif) => {
          if (notif.numDaysBeforeDeadline !== action.payload.numDays) {
            return true;
          }
          await cancelTriggerNotification(notif.notificationId);
          return false;
        })
      );
      return newState;
    case CLEAR_ALL_DATA:
      await cancellAllNotifications();
      return [];
    // fires when user deletes a course
    case DELETE_COURSE:
      newState = await Promise.all(
        state.filter(async (notif) => {
          if (notif.courseUrl !== action.payload.courseUrl) {
            return true;
          }
          await cancelTriggerNotification(notif.notificationId);
          return false;
        })
      );
      return newState;
    // fires when we request data from moodle scraper and have performed projection
    case REFRESH_UPDATE_NOTIFICATION:
      newState = [...state];
      const notifDurations = action.payload.notifDurations as number[];

      const modifDeadlines = action.payload
        .modDeadlines as DeadlineNotifInformation[];
      //first delete all notifications that have been modified
      modifDeadlines.forEach(async (ddl) => {
        newState = await Promise.all(
          newState.filter(async (notif) => {
            if (notif.resourceUrl !== ddl.resourceUrl) {
              return true;
            }
            await cancelTriggerNotification(notif.notificationId);
            return false;
          })
        );
      });
      //next create new notifications (modified notifications are included in this as well)
      const newDeadlines = action.payload
        .newDeadlines as DeadlineNotifInformation[];
      // list of notifications (1 for each duration) for each newly found notification
      const newDdlNotifs: PushNotificationData[][] = await Promise.all(
        newDeadlines.map(
          async (ddl) => await makeNewDeadlineNotifs(ddl, notifDurations)
        )
      );
      //flatten the list of notifications
      const flattenedList = newDdlNotifs.reduce(
        (prev, curr) => [...prev, ...curr],
        []
      );
      newState.push(...flattenedList);
      return newState;
    default:
      //clear out records that are not necessary anymore
      const now = new Date().getTime();
      return state.filter((pushNotif) => pushNotif.notificationDate < now);
  }
};

export default pushNotificationReducer;

const makeNewDeadlineNotifs = async (
  ddl: DeadlineNotifInformation,
  durations: number[]
): Promise<PushNotificationData[]> => {
  const createdNotifications: PushNotificationData[] = await Promise.all(
    durations.map(async (num) => {
      const dateAvailable = Math.max(
        new Date().getTime(),
        ddl.dueDate - num * DAY_IN_MS
      );
      const notificationInfo: PushNotificationDetails = {
        timestamp: dateAvailable,
        title: "Deadline alert!",
        body: `Submission due in ${num} days for ${ddl.courseName}`,
      };
      const notifId = await createTriggerNotification(notificationInfo);
      return {
        notificationDate: dateAvailable,
        resourceUrl: ddl.resourceUrl,
        numDaysBeforeDeadline: num,
        courseUrl: ddl.courseUrl,
        notificationId: notifId,
        notificationInfo: notificationInfo,
      };
    })
  );
  return createdNotifications;
};
