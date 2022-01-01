import { AnyAction } from "redux";
import { ProjectionResult } from "../../interfaces/interface";
import {
  UPDATE_MODULES,
  UPDATE_SECTION_ORDER,
  USER_TOGGLE_MODULE_COMPLETE,
  USER_TOGGLE_REMOVE_MODULE,
} from "./actionNames";

export const updateModuleAction = (projResult: ProjectionResult) => {
  return {
    type: UPDATE_MODULES,
    payload: {
      finalProj: projResult.finalProj,
      added: projResult.added,
      modified: projResult.modified,
      completed: projResult.completed,
    },
  };
};

export const toggleCompletionAction = (url: string): AnyAction => {
  return {
    type: USER_TOGGLE_MODULE_COMPLETE,
    payload: {
      resourceUrl: url,
    },
  };
};

export const toggleRemovalAction = (url: string): AnyAction => {
  return {
    type: USER_TOGGLE_REMOVE_MODULE,
    payload: {
      resourceUrl: url,
    },
  };
};

export const updateSectionOrderAction = (
  url: string,
  newOrder: string[]
): AnyAction => {
  return {
    type: UPDATE_SECTION_ORDER,
    payload: {
      courseUrl: url,
      newOrder,
    },
  };
};
