import { StackScreenProps } from "@react-navigation/stack";
import {
  Box,
  Text,
  Button,
  SectionList,
  HStack,
  ScrollView,
} from "native-base";
import React from "react";
import {
  BACKGROUND_WHITE,
  NOTIIF_RED,
  PRIMARY_BLUE,
} from "../../colours.styles";
import {
  CourseSectionHeader,
  CourseSectionItem,
  RemovedCourseSectionItem,
} from "../../components/courses/CourseSectionComponents";
import {
  ModuleOptionsModal,
  RemovedModuleOptionsModal,
} from "../../components/courses/ModuleOptionsModal";
import { AppCourseData } from "../../interfaces/interface";
import { CourseRouterParamList } from "../../interfaces/navigatorInterfaces";
import { useAppSelector } from "../../redux";

type Props = StackScreenProps<CourseRouterParamList, "Course">;

const IndividualCoursePage = ({ navigation, route }: Props) => {
  const [longPressUrl, setLongPressUrl] = React.useState("");
  const [removedUrl, setRemovedUrl] = React.useState("");

  const courseUrl = route.params.courseUrl;
  const modules = useAppSelector((state) => state.modules);
  const added = useAppSelector((state) => state.dashboard.added);
  const newResourcesMap: Record<string, boolean> = {};
  added.forEach((mod) => (newResourcesMap[mod.resourceUrl] = true));
  const thisModules = modules.filter((mod) => mod.courseUrl === courseUrl);

  const sections: Record<string, AppCourseData[]> = {};
  const removedModules: AppCourseData[] = [];
  thisModules.forEach((mod) => {
    if (mod.userMarkedDeleted) {
      removedModules.push(mod);
      return;
    }
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
            return (
              <CourseSectionHeader
                sectionTitle={section.title}
                headerColor={PRIMARY_BLUE}
              />
            );
          }}
          renderItem={({ item }: { item: AppCourseData }) => {
            return (
              <CourseSectionItem
                isNewModule={item.resourceUrl in newResourcesMap}
                resource={item}
                longPressAction={setLongPressUrl}
                pressAction={() => navigation.navigate("Overview")}
              />
            );
          }}
        />
        {removedModules.length > 0 && (
          <CourseSectionHeader
            sectionTitle='Removed Courses'
            headerColor={NOTIIF_RED}
          />
        )}
        {removedModules.map((mod) => (
          <RemovedCourseSectionItem
            key={mod.resourceUrl}
            resource={mod}
            pressAction={setRemovedUrl}
          />
        ))}
      </Box>
      <ModuleOptionsModal
        resourceUrl={longPressUrl}
        closeAction={setLongPressUrl}
        navigateAction={(url: string) => navigation.navigate("Overview")}
      />
      <RemovedModuleOptionsModal
        resourceUrl={removedUrl}
        closeAction={setRemovedUrl}
        navigateAction={(url: string) => navigation.navigate("Overview")}
      />
    </ScrollView>
  );
};

export default IndividualCoursePage;
