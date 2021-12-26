import React from "react";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";
import { useAppSelector } from "../../redux";
import { DrawerScreenProps } from "@react-navigation/drawer";
import NoCourseHomePage from "./NoCourseHomePage";
import { Box } from "native-base";

type Props = DrawerScreenProps<RootDrawerParamList, "Home">;
const HomePage = (props: Props) => {
  const numCourses = useAppSelector((state) => state.courses.length);
  if (numCourses === 0) {
    return NoCourseHomePage(props);
  }
  return <Box>Courses</Box>;
};

export default HomePage;
