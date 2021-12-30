import React from "react";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  BACKGROUND_WHITE,
  NOTIF_GREEN,
  NOTIF_YELLOW,
} from "../../colours.styles";
import { AppCourseData } from "../../interfaces/interface";
import { ModuleType } from "../../interfaces/apiInterface";
import { isAssignment } from "../../utils/course";

const getIconFromModuleType = (type: ModuleType) => {
  const iconSize = 32;
  if (isAssignment(type)) {
    return <Ionicons name='alarm-outline' size={iconSize} />;
  }
  if (type === ModuleType.URL || type === ModuleType.PAGE) {
    return <Ionicons name='globe-outline' size={iconSize} />;
  }
  if (type === ModuleType.FOLDER) {
    return <Ionicons name='folder-outline' size={iconSize} />;
  }
  if (type === ModuleType.UNKNOWN) {
    return <Ionicons name='help-circle-outline' size={iconSize} />;
  }
  if (type === ModuleType.RESOURCE) {
    return <Ionicons name='document-outline' size={iconSize} />;
  }
  return <Ionicons name='book-outline' size={iconSize} />;
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
  longPressAction: (url: string) => void;
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
      onLongPress={() => longPressAction(resource.resourceUrl)}
      onPress={() => pressAction(resource.resourceUrl)}
    >
      <Box paddingX='3' paddingY='1' borderWidth='1' borderColor='grey.500'>
        <HStack space={3}>
          {getIconFromModuleType(resource.type)}
          <Text fontSize='lg' fontWeight='semibold' flex='1' isTruncated>
            {resource.name}
          </Text>
          {isNewModule && (
            <Ionicons name='alert-circle' size={28} color={NOTIF_YELLOW} />
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
  pressAction: (url: string) => void;
}
export const RemovedCourseSectionItem = ({
  resource,
  pressAction,
}: RemovedCourseSectionItemInterface) => {
  return (
    <Pressable onPress={() => pressAction(resource.resourceUrl)}>
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
