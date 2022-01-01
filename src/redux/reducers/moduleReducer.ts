import { AnyAction } from "redux";
import { AppCourseData } from "../../interfaces/interface";
import {
  UPDATE_MODULES,
  CLEAR_ALL_DATA,
  DELETE_COURSE,
  USER_TOGGLE_MODULE_COMPLETE,
  USER_TOGGLE_REMOVE_MODULE,
  ADD_NEW_COURSE,
  UPDATE_SECTION_ORDER,
} from "../actions/actionNames";

export const moduleReducer = (
  state: AppCourseData[] = [],
  action: AnyAction
) => {
  switch (action.type) {
    case CLEAR_ALL_DATA:
      return [];
    case DELETE_COURSE:
      return state.filter((mod) => mod.courseUrl !== action.payload.courseUrl);
    case UPDATE_MODULES:
      return action.payload.finalProj as AppCourseData[];
    case USER_TOGGLE_MODULE_COMPLETE:
      return state.map((mod) => {
        if (mod.resourceUrl !== action.payload.resourceUrl) {
          return mod;
        }
        return { ...mod, userMarkedCompleted: !mod.userMarkedCompleted };
      });
    case USER_TOGGLE_REMOVE_MODULE:
      return state.map((mod) => {
        if (mod.resourceUrl !== action.payload.resourceUrl) {
          return mod;
        }
        return { ...mod, userMarkedDeleted: !mod.userMarkedDeleted };
      });
    default:
      return state;
  }
};

interface DashboardReducerState {
  added: AppCourseData[];
  modified: AppCourseData[];
  completed: AppCourseData[];
  lastUpdatedTime: string;
}

const baseDashboardState: DashboardReducerState = {
  added: [],
  modified: [],
  completed: [],
  lastUpdatedTime: "",
};

export const dashboardReducer = (
  state: DashboardReducerState = baseDashboardState,
  action: AnyAction
): DashboardReducerState => {
  switch (action.type) {
    case CLEAR_ALL_DATA:
      return baseDashboardState;
    case DELETE_COURSE:
      const filterCondition = (mod: AppCourseData): boolean =>
        mod.courseUrl !== action.payload.courseUrl;
      return {
        added: state.added.filter(filterCondition),
        modified: state.modified.filter(filterCondition),
        completed: state.completed.filter(filterCondition),
        lastUpdatedTime: state.lastUpdatedTime,
      };
    case UPDATE_MODULES:
      return {
        added: action.payload.added,
        modified: action.payload.modified,
        completed: action.payload.completed,
        lastUpdatedTime: new Date().toLocaleString(),
      };
    default:
      return state;
  }
};

export const sectionsReducer = (
  state: Record<string, string[]> = {},
  action: AnyAction
) => {
  switch (action.type) {
    case CLEAR_ALL_DATA:
      return {};
    case ADD_NEW_COURSE:
    case DELETE_COURSE:
      return { ...state, [action.payload.courseUrl]: [] };
    case UPDATE_SECTION_ORDER:
      return { ...state, [action.payload.courseUrl]: action.payload.newOrder };
    default:
      return state;
  }
};
