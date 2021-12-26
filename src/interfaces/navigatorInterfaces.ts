export type RootDrawerParamList = {
  Home: undefined;
  Courses: undefined;
  Deadlines: undefined;
  Notifications: undefined;
  Settings: SettingsParams;
};

interface SettingsParams {
  openCreds: boolean;
  openCourses: boolean;
  openNotifs: boolean;
  openAbout: boolean;
}
