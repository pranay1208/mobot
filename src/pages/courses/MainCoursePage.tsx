import React from "react";
import { Box, FlatList } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import CourseCard, {
  CourseCardProps,
} from "../../components/courses/CourseCard";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";

type Props = DrawerScreenProps<RootDrawerParamList, "Courses">;

const MainCoursePage = ({ navigation }: Props) => {
  const data: CourseCardProps[] = [
    {
      courseTitle: "STAT1603: Introduction to Statistics",
      courseAlerts: 5,
      numberAssignments: 4,
      numberQuizzes: 1,
      numberResources: 33,
      totalModules: 42,
      completedModules: 35,
    },
    {
      courseTitle: "GEOG1012: Effects of Globalization in an Urbanizing World",
      courseAlerts: 10,
      numberAssignments: 4,
      numberQuizzes: 1,
      numberResources: 33,
      totalModules: 42,
      completedModules: 10,
    },
    {
      courseTitle: "CAES9542: Core English for Computer Science",
      courseAlerts: 0,
      numberAssignments: 4,
      numberQuizzes: 1,
      numberResources: 33,
      totalModules: 42,
      completedModules: 42,
    },
    {
      courseTitle: "COMP4801: Final Year Project",
      courseAlerts: 2,
      numberAssignments: 4,
      numberQuizzes: 1,
      numberResources: 33,
      totalModules: 42,
      completedModules: 25,
    },
    {
      courseTitle: "COMP3258: Functional Programming",
      courseAlerts: 7,
      numberAssignments: 4,
      numberQuizzes: 1,
      numberResources: 33,
      totalModules: 42,
      completedModules: 30,
    },
  ];
  return (
    <Box paddingY='4'>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return CourseCard(item);
        }}
      />
    </Box>
  );
};

export default MainCoursePage;
