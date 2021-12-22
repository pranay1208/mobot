import React from "react";
import { Box } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import CourseCard from "../../components/courses/courseCard";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";

type Props = DrawerScreenProps<RootDrawerParamList, "Courses">;

const MainCoursePage = ({ navigation }: Props) => {
  return (
    <Box paddingTop='4'>
      <CourseCard />
    </Box>
  );
};

export default MainCoursePage;
