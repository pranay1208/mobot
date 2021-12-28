import { ScrapeResponse } from "../interfaces/apiInterface";
import { AppCourseData, ProjectionResult } from "../interfaces/interface";
import { reduxStore } from "../redux";
import { updateModuleAction } from "../redux/actions/moduleActions";

const updateLocalCourses = async (
  scrapedData: ScrapeResponse[]
): Promise<void> => {
  const moduleData = reduxStore.getState().modules;
  const [current, updated] = await Promise.all([
    sortCourseData(moduleData) as Promise<AppCourseData[]>,
    sortCourseData(scrapedData),
  ]);
  //Project data
  const projectionResult = projectData(current, updated);
  //Send dispatch
  reduxStore.dispatch(updateModuleAction(projectionResult));
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
      const appDataVersion: AppCourseData = {
        ...updt,
        removedFromMoodle: false,
        userMarkedCompleted: curr.userMarkedCompleted,
        userMarkedDeleted: curr.userMarkedDeleted,
      };
      if (moduleHasBeenModified(curr, updt)) {
        modified.push(appDataVersion);
      }
      if (!curr.completed && updt.completed) {
        completed.push(appDataVersion);
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

export default updateLocalCourses;
