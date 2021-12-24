import { AnyAction } from "redux";
import {
  ADD_NEW_COURSE,
  ADD_NEW_NOTIFICATION,
  CLEAR_ALL_DATA,
  DELETE_COURSE,
  DELETE_NOTIFICATION,
  EDIT_COURSE_INFO,
  SAVE_CREDENTIALS,
  UNSAVE_CREDENTIALS,
} from "../actions/actionNames";

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
    case CLEAR_ALL_DATA:
    case UNSAVE_CREDENTIALS:
      return {
        username: "",
        password: "",
      };
    default:
      return state;
  }
};

interface CourseSettingState {
  courseName: string;
  courseUrl: string;
  courseColor: string;
}

export const coursesReducer = (
  state: CourseSettingState[] = [],
  action: AnyAction
): CourseSettingState[] => {
  switch (action.type) {
    case ADD_NEW_COURSE:
      return [
        ...state,
        {
          courseName: action.payload.courseName,
          courseUrl: action.payload.courseUrl,
          courseColor: action.payload.courseColor,
        },
      ];
    case EDIT_COURSE_INFO:
      return state.map((val, index) => {
        if (index !== action.payload.courseIndex) {
          return val;
        }
        return {
          courseName: action.payload.courseName,
          courseUrl: action.payload.courseUrl,
          courseColor: action.payload.courseColor,
        };
      });
    case DELETE_COURSE:
      return state.filter((_, index) => index !== action.payload.courseIndex);
    default:
      return state;
  }
};

export const notificationsDurationReducer = (
  state: number[] = [],
  action: AnyAction
) => {
  switch (action.type) {
    case ADD_NEW_NOTIFICATION:
      if (state.includes(action.payload.numDays)) {
        return state;
      }
      return [...state, action.payload.numDays];
    case DELETE_NOTIFICATION:
      return state.filter((days) => days !== action.payload.numDays);
    default:
      return state;
  }
};
