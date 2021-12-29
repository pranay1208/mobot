import { AnyAction } from "redux";
import { DISMISS_NOTIFICATION } from "./actionNames";

export const dismissNotificationAction = (index: number): AnyAction => {
  return {
    type: DISMISS_NOTIFICATION,
    payload: {
      index,
    },
  };
};
