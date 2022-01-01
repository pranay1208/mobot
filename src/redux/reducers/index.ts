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

const rootReducer = combineReducers({
  credentials: credentialReducer,
  courses: coursesReducer,
  notificationDurations: notificationsDurationReducer,
  modules: moduleReducer,
  dashboard: dashboardReducer,
  notifications: notificationReducer,
  sections: sectionsReducer,
});

export default rootReducer;
