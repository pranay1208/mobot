import { AnyAction } from "redux";
import { CLEAR_ALL_DATA } from "../actions/actionNames";

const testReducer = (state = 0, action: AnyAction) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case CLEAR_ALL_DATA:
      return 0;
    default:
      return state;
  }
};

export default testReducer;
