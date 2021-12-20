import { combineReducers } from "redux";

//Import all reducers
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  test: testReducer,
});

export default rootReducer;
