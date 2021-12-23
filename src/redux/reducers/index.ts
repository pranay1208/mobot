import { combineReducers } from "redux";

//Import all reducers
import testReducer from "./testReducer";
import { credentialReducer } from "./settingsReducers";

const rootReducer = combineReducers({
  test: testReducer,
  credentials: credentialReducer,
});

export default rootReducer;
