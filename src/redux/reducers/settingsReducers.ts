import { AnyAction } from "redux";
import {
  SAVE_CREDENTIALS,
  UNSAVE_CREDENTIALS,
} from "../actions/settingsActions";

interface CredentialStorage {
  username: string;
  password: string;
}

const credentialReducerInitState: CredentialStorage = {
  username: "",
  password: "",
};

export const credentialReducer = (
  state: CredentialStorage = credentialReducerInitState,
  action: AnyAction
): CredentialStorage => {
  switch (action.type) {
    case SAVE_CREDENTIALS:
      return {
        username: action.payload.username,
        password: action.payload.password,
      };
    case UNSAVE_CREDENTIALS:
      return {
        username: "",
        password: "",
      };
    default:
      return state;
  }
};
