import { reduxStore } from "../redux";

export const getCourseProgress = (courseUrl: string): number => {
  const modules = reduxStore.getState().modules;
  const thisCourseModules = modules.filter(
    (mod) => mod.courseUrl === courseUrl
  );
  const total = thisCourseModules.length;
  const completed = thisCourseModules.filter((mod) => mod.completed).length;
  return Math.floor((total / completed) * 100);
};
