import { ScrapeResponse } from "./apiInterface";

export interface AppCourseData extends ScrapeResponse {
  userMarkedCompleted: boolean;
  userMarkedDeleted: boolean;
  removedFromMoodle: boolean;
}

export interface ProjectionResult {
  finalProj: AppCourseData[];
  added: AppCourseData[];
  modified: AppCourseData[];
  completed: AppCourseData[];
}

export type NotificationType = "ADD" | "MODIFY" | "DEADLINE";
