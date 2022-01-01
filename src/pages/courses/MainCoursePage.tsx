import React from "react";
import { Box, FlatList, Text } from "native-base";
import CourseCard, {
  CourseCardProps,
} from "../../components/courses/CourseCard";
import { CourseRouterParamList } from "../../interfaces/navigatorInterfaces";
import { useAppSelector } from "../../redux";
import { getCourseProgress } from "../../utils/course";
import { ModuleType } from "../../interfaces/apiInterface";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<CourseRouterParamList, "Overview">;

const MainCoursePage = ({ navigation }: Props) => {
  const courses = useAppSelector((state) => state.courses);
  const modules = useAppSelector((state) => state.modules);
  const added = useAppSelector((state) => state.dashboard.added);

  if (courses.length === 0) {
    return (
      <Box safeAreaTop>
        <Text fontSize='xl' fontWeight='semibold' textAlign='center'>
          No courses added
        </Text>
      </Box>
    );
  }

  const data: CourseCardProps[] = courses.map((course) => {
    let numberAssignments = 0,
      numberQuizzes = 0,
      numberResources = 0;
    modules
      .filter((mod) => mod.courseUrl === course.courseUrl)
      .forEach((mod) => {
        if (
          mod.type === ModuleType.ASSIGNMENT ||
          mod.type === ModuleType.TURNITIN
        ) {
          numberAssignments += 1;
        } else if (
          mod.type === ModuleType.CHOICE ||
          mod.type === ModuleType.CHOICEGROUP ||
          mod.type === ModuleType.QUIZ
        ) {
          numberQuizzes += 1;
        } else {
          numberResources += 1;
        }
      });
    return {
      courseTitle: course.courseName,
      courseAlerts: added.filter((u) => u.courseUrl === course.courseUrl)
        .length,
      numberAssignments,
      numberQuizzes,
      numberResources,
      progress: getCourseProgress(course.courseUrl),
      onPressAction: () => {
        navigation.navigate("Course", {
          courseName: course.courseName,
          courseUrl: course.courseUrl,
        });
      },
    };
  });
  return (
    <Box paddingY='4'>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={({ item }) => {
          return CourseCard(item);
        }}
      />
    </Box>
  );
};

export default MainCoursePage;
