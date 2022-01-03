import { ScrapeResponse } from "../interfaces/apiInterface";
import { AppCourseData, ProjectionResult } from "../interfaces/interface";
import { reduxStore } from "../redux";
import { updateModuleAction } from "../redux/actions/moduleActions";
import {
  DeadlineNotifInformation,
  refreshUpdateNotifAction,
} from "../redux/actions/notifActions";
import { isAssignment } from "./course";

const updateModules = async (scrapedData: ScrapeResponse[]): Promise<void> => {
  const moduleData = reduxStore.getState().modules;
  const courses = reduxStore.getState().courses;
  const [current, updated] = await Promise.all([
    sortCourseData(moduleData) as Promise<AppCourseData[]>,
    sortCourseData(scrapedData),
  ]);
  const courseUrlToName: Record<string, string> = {};
  courses.forEach(
    (course) => (courseUrlToName[course.courseUrl] = course.courseName)
  );
  //Project data
  const projectionResult = projectData(current, updated);
  const addedResources: Record<string, string> = {};
  const newDeadlines: DeadlineNotifInformation[] = [];
  const modifiedResources: Record<string, string> = {};
  const modDeadlines: DeadlineNotifInformation[] = [];
  projectionResult.added.forEach((add) => {
    if (!(add.courseUrl in addedResources)) {
      addedResources[add.courseUrl] = courseUrlToName[add.courseUrl];
    }
    if (isAssignment(add.type)) {
      const dateInMs = new Date(add.dueDate ?? "").getTime();
      if (isNaN(dateInMs)) return;
      newDeadlines.push({
        courseUrl: add.courseUrl,
        courseName: courseUrlToName[add.courseUrl],
        resourceUrl: add.resourceUrl,
        dueDate: dateInMs,
      });
    }
  });
  projectionResult.modified.forEach((mod) => {
    if (!(mod.courseUrl in modifiedResources)) {
      modifiedResources[mod.courseUrl] = courseUrlToName[mod.courseUrl];
    }
    if (isAssignment(mod.type)) {
      const dateInMs = new Date(mod.dueDate ?? "").getTime();
      if (isNaN(dateInMs)) return;
      const ddl: DeadlineNotifInformation = {
        courseUrl: mod.courseUrl,
        courseName: courseUrlToName[mod.courseUrl],
        resourceUrl: mod.resourceUrl,
        dueDate: dateInMs,
      };
      //In the reducer, modDeadlines are removed, and newly added in newDeadlines
      modDeadlines.push(ddl);
      newDeadlines.push(ddl);
    }
  });
  const addedText =
    projectionResult.added.length === 0
      ? ""
      : `New modules were added for ${Object.values(addedResources).join(
          ", "
        )}`;
  const modifiedText =
    projectionResult.modified.length === 0
      ? ""
      : `Modules amended in ${Object.values(modifiedResources).join(", ")}`;
  const notifDurations = reduxStore.getState().notificationDurations;

  //Send dispatch
  reduxStore.dispatch(updateModuleAction(projectionResult));
  reduxStore.dispatch(
    refreshUpdateNotifAction(
      addedText,
      modifiedText,
      newDeadlines,
      modDeadlines,
      notifDurations
    )
  );
};

const projectData = (
  current: AppCourseData[],
  updated: ScrapeResponse[]
): ProjectionResult => {
  const finalProj: AppCourseData[] = [];
  const added: AppCourseData[] = [];
  const modified: AppCourseData[] = [];
  const completed: AppCourseData[] = [];
  let currentIndex = 0,
    updatedIndex = 0;

  const deletedModuleAction = (curr: AppCourseData) => {
    finalProj.push({ ...curr, removedFromMoodle: true });
  };
  const addedModuleAction = (updt: ScrapeResponse) => {
    const appDataVersion: AppCourseData = {
      ...updt,
      userMarkedCompleted: updt.completed,
      removedFromMoodle: false,
      userMarkedDeleted: false,
    };
    added.push(appDataVersion);
    finalProj.push(appDataVersion);
    if (updt.completed) {
      completed.push(appDataVersion);
    }
  };

  while (currentIndex < current.length && updatedIndex < updated.length) {
    const curr = current[currentIndex];
    const updt = updated[updatedIndex];
    if (curr.resourceUrl === updt.resourceUrl) {
      //updt could have been modified
      let dueDate = updt.dueDate ?? curr.dueDate;
      const appDataVersion: AppCourseData = {
        ...updt,
        dueDate,
        removedFromMoodle: false,
        userMarkedCompleted: curr.userMarkedCompleted || updt.completed,
        userMarkedDeleted: curr.userMarkedDeleted,
      };
      if (!curr.completed && updt.completed) {
        completed.push(appDataVersion);
      } else if (curr.completed && !updt.completed) {
        appDataVersion.userMarkedCompleted = updt.completed;
      }
      if (moduleHasBeenModified(curr, updt)) {
        modified.push(appDataVersion);
      }

      finalProj.push(appDataVersion);
      currentIndex += 1;
      updatedIndex += 1;
    } else if (curr.resourceUrl < updt.resourceUrl) {
      deletedModuleAction(curr);
      currentIndex += 1;
    } else {
      addedModuleAction(updt);
      updatedIndex += 1;
    }
  }

  //remaining 'current' items imply all these have been deleted
  current.slice(currentIndex).forEach((curr) => {
    deletedModuleAction(curr);
  });

  //remaining 'updated' items imply all these have been added
  updated.slice(updatedIndex).forEach((updt) => {
    addedModuleAction(updt);
  });

  return { finalProj, added, modified, completed };
};

//We expect the resources to be unique
const sortCourseData = async (
  appData: ScrapeResponse[]
): Promise<ScrapeResponse[]> => {
  return new Promise((resolve) => {
    const sortedData = appData.sort((a, b) =>
      a.resourceUrl < b.resourceUrl ? -1 : 1
    );
    resolve(sortedData);
  });
};

const moduleHasBeenModified = (
  curr: AppCourseData,
  updt: ScrapeResponse
): boolean => {
  //we anticipate that courseUrl, type and resourceUrl will not change
  //we do not care about completion status as a form of modification
  return (
    curr.name !== updt.name ||
    curr.dueDate !== updt.dueDate ||
    curr.sectionTitle !== updt.sectionTitle ||
    curr.comments !== updt.comments
  );
};

export default updateModules;
