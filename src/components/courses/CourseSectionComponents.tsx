import React from "react";
import { Box, HStack, Pressable, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  BACKGROUND_WHITE,
  NOTIF_GREEN,
  NOTIIF_RED,
  PRIMARY_BLUE,
} from "../../colours.styles";
import { AppCourseData } from "../../interfaces/interface";

interface CourseSectionHeaderInterface {
  sectionTitle: string;
}
export const CourseSectionHeader = ({
  sectionTitle,
}: CourseSectionHeaderInterface) => {
  return (
    <Box
      backgroundColor={PRIMARY_BLUE}
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
}
export const CourseSectionItem = ({ resource }: CourseSectionItemInterface) => {
  return (
    <Pressable
      onLongPress={() =>
        console.log("Displaying modal to delete, mark complete")
      }
    >
      <Box paddingX='3' paddingY='1' borderWidth='1' borderColor='grey.500'>
        <HStack space={3}>
          <Ionicons name='bookmarks' size={32} />
          <Text fontSize='lg' fontWeight='semibold' flex='1' isTruncated>
            {resource.name}
          </Text>
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
