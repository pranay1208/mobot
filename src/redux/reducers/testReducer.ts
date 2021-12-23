import { AnyAction } from "redux";

const testReducer = (state = 0, action: AnyAction) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default testReducer;
