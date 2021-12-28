import { combineReducers } from "redux";

//Import all reducers
import {
  coursesReducer,
  credentialReducer,
  notificationsDurationReducer,
} from "./settingsReducers";
import { moduleReducer } from "./moduleReducer";

const rootReducer = combineReducers({
  credentials: credentialReducer,
  courses: coursesReducer,
  notificationDurations: notificationsDurationReducer,
  modules: moduleReducer,
});

export default rootReducer;
