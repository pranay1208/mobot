import { combineReducers } from "redux";

//Import all reducers
import testReducer from "./testReducer";
import {
  coursesReducer,
  credentialReducer,
  notificationsDurationReducer,
} from "./settingsReducers";

const rootReducer = combineReducers({
  test: testReducer,
  credentials: credentialReducer,
  courses: coursesReducer,
  notificationDurations: notificationsDurationReducer,
});

export default rootReducer;
