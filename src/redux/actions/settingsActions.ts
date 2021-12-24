import {
  ADD_NEW_COURSE,
  ADD_NEW_NOTIFICATION,
  DELETE_COURSE,
  DELETE_NOTIFICATION,
  EDIT_COURSE_INFO,
  SAVE_CREDENTIALS,
  UNSAVE_CREDENTIALS,
} from "./actionNames";

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
export const addCourseAction = (name: string, url: string, color: string) => {
  return {
    type: ADD_NEW_COURSE,
    payload: {
      courseName: name,
      courseUrl: url,
      courseColor: color,
    },
  };
};

export const deleteCourseAction = (i: number) => {
  return {
    type: DELETE_COURSE,
    payload: {
      courseIndex: i,
    },
  };
};

export const editCourseAction = (
  i: number,
  name: string,
  url: string,
  color: string
) => {
  return {
    type: EDIT_COURSE_INFO,
    payload: {
      courseIndex: i,
      courseName: name,
      courseUrl: url,
      courseColor: color,
    },
  };
};

// NOTIFICATIONS ACTIONS
export const addNotificationDurationAction = (numDays: number) => {
  return {
    type: ADD_NEW_NOTIFICATION,
    payload: { numDays },
  };
};

export const deleteNotificationDurationAction = (numDays: number) => {
  return {
    type: DELETE_NOTIFICATION,
    payload: { numDays },
  };
};
