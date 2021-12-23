import { SAVE_CREDENTIALS, UNSAVE_CREDENTIALS } from "./actionNames";

// CREDENTIAL ACTIONS
export const saveCredentialsAction = (username: string, password: string) => {
  return {
    type: SAVE_CREDENTIALS,
    payload: { username, password },
  };
};

export const unsaveCredentialsAction = () => {
  return {
    type: UNSAVE_CREDENTIALS,
  };
};

// COURSES ACTIONS

// NOTIFICATIONS ACTIONS
