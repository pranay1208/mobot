import { combineReducers } from "redux";

//Import all reducers
import {
  coursesReducer,
  credentialReducer,
  notificationsDurationReducer,
} from "./settingsReducers";
import { moduleReducer, dashboardReducer } from "./moduleReducer";

const rootReducer = combineReducers({
  credentials: credentialReducer,
  courses: coursesReducer,
  notificationDurations: notificationsDurationReducer,
  modules: moduleReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
