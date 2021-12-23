import { combineReducers } from "redux";

//Import all reducers
import testReducer from "./testReducer";
import { coursesReducer, credentialReducer } from "./settingsReducers";

const rootReducer = combineReducers({
  test: testReducer,
  credentials: credentialReducer,
  courses: coursesReducer,
});

export default rootReducer;
