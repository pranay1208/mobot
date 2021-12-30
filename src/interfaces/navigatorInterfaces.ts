export type RootDrawerParamList = {
  Home: undefined;
  Courses: undefined;
  Deadlines: undefined;
  Notifications: undefined;
  Settings: SettingsParams;
};

export type CourseRouterParamList = {
  Overview: undefined;
  Course: IndividualCoursePageParams;
  Module: IndividualModulePageParam;
};

interface SettingsParams {
  openCreds: boolean;
  openCourses: boolean;
  openNotifs: boolean;
  openAbout: boolean;
}

interface IndividualCoursePageParams {
  courseName: string;
  courseUrl: string;
}

interface IndividualModulePageParam {
  courseName: string;
  resourceName: string;
  resourceUrl: string;
}
