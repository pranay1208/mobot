import { ProjectionResult } from "../../interfaces/interface";
import { UPDATE_MODULES } from "./actionNames";

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
