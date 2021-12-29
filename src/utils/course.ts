import { ModuleType } from "../interfaces/apiInterface";
import { AppCourseData } from "../interfaces/interface";
import { reduxStore } from "../redux";

export const getCourseProgress = (courseUrl: string): number => {
  const modules = reduxStore.getState().modules;
  const thisCourseModules = modules.filter(
    (mod) => mod.courseUrl === courseUrl
  );
  const total = thisCourseModules.length;
  if (total === 0) {
    return 0;
  }
  const completed = thisCourseModules.filter((mod) => mod.completed).length;
  return Math.floor((completed / total) * 100);
};

export const getCourseUpdateText = (
  updates: AppCourseData[],
  fallback: string
): string[] => {
  if (updates.length === 0) {
    return [fallback];
  }
  const impUpdates: string[] = [];
  let nonImpUpdates: number = 0;
  updates.forEach((updt) => {
    if (isImportantUpdate(updt.type)) {
      impUpdates.push(updt.name);
    } else {
      nonImpUpdates += 1;
    }
  });
  if (impUpdates.length >= 6) {
    return [
      ...impUpdates.slice(0, 6),
      `...and ${impUpdates.length + nonImpUpdates - 6} more`,
    ];
  } else if (nonImpUpdates > 0) {
    return [...impUpdates, `... and ${nonImpUpdates} resources`];
  } else {
    return impUpdates;
  }
};

const isImportantUpdate = (type: ModuleType): boolean => {
  return (
    type === ModuleType.ASSIGNMENT ||
    type === ModuleType.TURNITIN ||
    type === ModuleType.QUIZ
  );
};

export const isAssignment = (type: ModuleType): boolean => {
  return type === ModuleType.ASSIGNMENT || type === ModuleType.TURNITIN;
};
