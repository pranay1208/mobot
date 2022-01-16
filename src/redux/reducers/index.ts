import { combineReducers } from "redux";

//Import all reducers
import {
  coursesReducer,
  credentialReducer,
  notificationsDurationReducer,
} from "./settingsReducers";
import {
  moduleReducer,
  dashboardReducer,
  sectionsReducer,
} from "./moduleReducer";
import notificationReducer from "./notificationReducer";
import pushNotificationReducer from "./pushNotifReducer";

const rootReducer = combineReducers({
  credentials: credentialReducer,
  courses: coursesReducer,
  dashboard: dashboardReducer,
  modules: moduleReducer,
  notifications: notificationReducer,
  notificationDurations: notificationsDurationReducer,
  pushNotifications: pushNotificationReducer,
  sections: sectionsReducer,
});

export default rootReducer;
