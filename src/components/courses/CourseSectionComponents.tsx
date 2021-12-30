import React from "react";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  BACKGROUND_WHITE,
  COURSE_BLUE,
  COURSE_PURPLE,
  NOTIF_GREEN,
  NOTIF_YELLOW,
  NOTIIF_RED,
} from "../../colours.styles";
import { AppCourseData } from "../../interfaces/interface";
import { ModuleType } from "../../interfaces/apiInterface";
import { isAssignment } from "../../utils/course";

const getIconFromModuleType = (type: ModuleType) => {
  const iconSize = 32;
  if (isAssignment(type)) {
    return <Ionicons name='calendar' size={iconSize} color={NOTIIF_RED} />;
  }
  if (type === ModuleType.URL || type === ModuleType.PAGE) {
    return <Ionicons name='globe' size={iconSize} color={COURSE_BLUE} />;
  }
  if (type === ModuleType.FOLDER) {
    return <Ionicons name='folder' size={iconSize} color={NOTIF_YELLOW} />;
  }
  if (type === ModuleType.CHOICE || type === ModuleType.CHOICEGROUP) {
    return (
      <Ionicons name='person-circle' size={iconSize} color={COURSE_PURPLE} />
    );
  }
  if (type === ModuleType.UNKNOWN) {
    return <Ionicons name='help-circle' size={iconSize} />;
  }
  if (type === ModuleType.RESOURCE) {
    return <Ionicons name='document' size={iconSize} color={NOTIF_YELLOW} />;
  }
  return <Ionicons name='book' size={iconSize} color={COURSE_PURPLE} />;
};

interface CourseSectionHeaderInterface {
  sectionTitle: string;
  headerColor: string;
}
export const CourseSectionHeader = ({
  sectionTitle,
  headerColor,
}: CourseSectionHeaderInterface) => {
  return (
    <Box
      backgroundColor={headerColor}
      paddingX='5'
      paddingY='0.5'
      borderTopWidth='2'
      borderBottomWidth='2'
      borderColor='black'
    >
      <Text
        fontSize='lg'
        fontWeight='semibold'
        isTruncated
        color={BACKGROUND_WHITE}
      >
        {sectionTitle}
      </Text>
    </Box>
  );
};

interface CourseSectionItemInterface {
  resource: AppCourseData;
  isNewModule: boolean;
  longPressAction: (url: string, name: string) => void;
  pressAction: (url: string) => void;
}
export const CourseSectionItem = ({
  resource,
  isNewModule,
  longPressAction,
  pressAction,
}: CourseSectionItemInterface) => {
  return (
    <Pressable
      onLongPress={() => longPressAction(resource.resourceUrl, resource.name)}
      onPress={() => pressAction(resource.resourceUrl)}
    >
      <Box paddingX='3' paddingY='1' borderWidth='1' borderColor='grey.500'>
        <HStack space={3}>
          {getIconFromModuleType(resource.type)}
          <Text fontSize='lg' fontWeight='semibold' flex='1' isTruncated>
            {resource.name}
          </Text>
          {isNewModule && (
            <Ionicons name='add-circle' size={28} color={NOTIF_GREEN} />
          )}
          <Ionicons
            name={
              resource.userMarkedCompleted ? "checkbox" : "checkbox-outline"
            }
            color={resource.userMarkedCompleted ? NOTIF_GREEN : "black"}
            size={28}
          />
        </HStack>
      </Box>
    </Pressable>
  );
};

interface RemovedCourseSectionItemInterface {
  resource: AppCourseData;
  pressAction: (url: string, name: string) => void;
}
export const RemovedCourseSectionItem = ({
  resource,
  pressAction,
}: RemovedCourseSectionItemInterface) => {
  return (
    <Pressable onPress={() => pressAction(resource.resourceUrl, resource.name)}>
      <Box paddingX='3' paddingY='1' borderWidth='1' borderColor='grey.500'>
        <HStack space={3}>
          {getIconFromModuleType(resource.type)}
          <VStack flex='1'>
            <Text fontSize='lg' fontWeight='semibold' isTruncated>
              {resource.name}
            </Text>
            <Text fontSize='md' fontWeight='semibold'>
              {resource.sectionTitle}
            </Text>
          </VStack>
          <Ionicons
            name={
              resource.userMarkedCompleted ? "checkbox" : "checkbox-outline"
            }
            color={resource.userMarkedCompleted ? NOTIF_GREEN : "black"}
            size={28}
          />
        </HStack>
      </Box>
    </Pressable>
  );
};
