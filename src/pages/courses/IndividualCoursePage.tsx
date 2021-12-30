import { StackScreenProps } from "@react-navigation/stack";
import {
  Box,
  Text,
  Button,
  Center,
  Heading,
  SectionList,
  HStack,
  ScrollView,
} from "native-base";
import React from "react";
import { BACKGROUND_WHITE } from "../../colours.styles";
import {
  CourseSectionHeader,
  CourseSectionItem,
} from "../../components/courses/CourseSectionComponents";
import { AppCourseData } from "../../interfaces/interface";
import { CourseRouterParamList } from "../../interfaces/navigatorInterfaces";
import { useAppSelector } from "../../redux";

type Props = StackScreenProps<CourseRouterParamList, "Course">;

const IndividualCoursePage = ({ navigation, route }: Props) => {
  const courseUrl = route.params.courseUrl;
  const modules = useAppSelector((state) => state.modules);
  const thisModules = modules.filter((mod) => mod.courseUrl === courseUrl);
  const sections: Record<string, AppCourseData[]> = {};
  thisModules.forEach((mod) => {
    if (mod.userMarkedDeleted) return;
    if (!(mod.sectionTitle in sections)) {
      sections[mod.sectionTitle] = [];
    }
    sections[mod.sectionTitle].push(mod);
  });
  const data: { title: string; data: AppCourseData[] }[] = [];
  Object.keys(sections).forEach((key) =>
    data.push({ title: key, data: sections[key] })
  );
  return (
    <ScrollView backgroundColor='white'>
      <Box backgroundColor={BACKGROUND_WHITE}>
        <HStack marginTop='2' paddingX='5'>
          <Box flex='1'>
            <Text fontSize='2xl' fontWeight='semibold'>
              Modules
            </Text>
          </Box>
          <Button colorScheme='emerald'>Arrange Sections</Button>
        </HStack>
        <SectionList
          marginTop='2'
          sections={data}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section }) => {
            return <CourseSectionHeader sectionTitle={section.title} />;
          }}
          renderItem={({ item }: { item: AppCourseData }) => {
            return <CourseSectionItem resource={item} />;
          }}
        />
      </Box>
    </ScrollView>
  );
};

export default IndividualCoursePage;
