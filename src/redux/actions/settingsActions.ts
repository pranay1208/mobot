//ACTION NAMES
export const SAVE_CREDENTIALS = "SAVE_CREDENTIALS";
export const UNSAVE_CREDENTIALS = "UNSAVE_CREDENTIALS";

//ACTIONS
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
