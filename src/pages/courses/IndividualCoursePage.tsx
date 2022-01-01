import { StackScreenProps } from "@react-navigation/stack";
import {
  Box,
  Text,
  Button,
  SectionList,
  Center,
  HStack,
  ScrollView,
} from "native-base";
import React from "react";
import {
  BACKGROUND_WHITE,
  NOTIIF_RED,
  PRIMARY_BLUE,
} from "../../colours.styles";
import ArrangeSectionsModal from "../../components/courses/ArrangeSectionsModal";
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
  const [longPressName, setLongPressName] = React.useState("");
  const [removedUrl, setRemovedUrl] = React.useState("");
  const [removedName, setRemovedName] = React.useState("");
  const [arrangeSections, setArrangeSections] = React.useState(false);

  const courseUrl = route.params.courseUrl;
  const modules = useAppSelector((state) => state.modules);
  const added = useAppSelector((state) => state.dashboard.added);
  const courseSections = useAppSelector(
    (state) => state.sections[courseUrl] ?? []
  );
  const newResourcesMap: Record<string, boolean> = {};
  added.forEach((mod) => (newResourcesMap[mod.resourceUrl] = true));
  const thisModules = modules.filter((mod) => mod.courseUrl === courseUrl);

  if (thisModules.length === 0) {
    return (
      <Box safeAreaTop marginTop='4'>
        <Center>
          <Text fontSize='xl' fontWeight='semibold'>
            No modules found for this course
          </Text>
        </Center>
      </Box>
    );
  }

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
  data.sort((a, b) => {
    let indexA = courseSections.indexOf(a.title);
    let indexB = courseSections.indexOf(b.title);
    indexA = indexA === -1 ? courseSections.length : indexA;
    indexB = indexB === -1 ? courseSections.length : indexB;
    return indexA - indexB;
  });

  return (
    <ScrollView backgroundColor='white'>
      <Box backgroundColor={BACKGROUND_WHITE}>
        <HStack marginTop='2' paddingX='5'>
          <Box flex='1'>
            <Text fontSize='2xl' fontWeight='semibold'>
              Modules
            </Text>
          </Box>
          <Button
            colorScheme='emerald'
            onPress={() => setArrangeSections(true)}
          >
            Arrange Sections
          </Button>
        </HStack>
        <SectionList
          marginTop='2'
          sections={data}
          keyExtractor={(item: AppCourseData) => item.resourceUrl}
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
                longPressAction={(url, name) => {
                  setLongPressUrl(url);
                  setLongPressName(name);
                }}
                pressAction={() =>
                  navigation.navigate("Module", {
                    courseName: route.params.courseName,
                    resourceName: item.name,
                    resourceUrl: item.resourceUrl,
                  })
                }
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
            pressAction={(url, name) => {
              setRemovedName(name);
              setRemovedUrl(url);
            }}
          />
        ))}
      </Box>
      <ModuleOptionsModal
        resourceUrl={longPressUrl}
        closeAction={(val) => {
          setLongPressName(val);
          setLongPressUrl(val);
        }}
        navigateAction={(url: string) =>
          navigation.navigate("Module", {
            courseName: route.params.courseName,
            resourceName: longPressName,
            resourceUrl: url,
          })
        }
      />
      <RemovedModuleOptionsModal
        resourceUrl={removedUrl}
        closeAction={(val) => {
          setRemovedUrl(val);
          setRemovedName(val);
        }}
        navigateAction={(url: string) =>
          navigation.navigate("Module", {
            courseName: route.params.courseName,
            resourceName: removedName,
            resourceUrl: url,
          })
        }
      />
      <ArrangeSectionsModal
        isOpen={arrangeSections}
        onClose={setArrangeSections}
        sectionList={data.map((s) => s.title)}
        courseUrl={route.params.courseUrl}
      />
    </ScrollView>
  );
};

export default IndividualCoursePage;
