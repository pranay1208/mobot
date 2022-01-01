import React from "react";
import { Box, HStack, Heading, Center, VStack, Collapse } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../common/ProgressBar";
import { Pressable } from "react-native";
import UpdateTile from "./UpdateTile";
import { getCourseProgress, getCourseUpdateText } from "../../utils/course";
import { useAppSelector } from "../../redux";

interface CourseUpdateTileProps {
  myIndex: number;
  selIndex: number;
  action: (i: number) => void;
  courseUrl: string;
  courseName: string;
}

const CourseUpdateTile = ({
  myIndex,
  selIndex,
  action,
  courseName,
  courseUrl,
}: CourseUpdateTileProps) => {
  const isExpanded = myIndex === selIndex;
  const dashboard = useAppSelector((state) => state.dashboard);
  const myAdd = dashboard.added.filter((mod) => mod.courseUrl === courseUrl);
  const myMod = dashboard.modified.filter((mod) => mod.courseUrl === courseUrl);
  const myCmp = dashboard.completed.filter(
    (mod) => mod.courseUrl === courseUrl
  );
  return (
    <VStack>
      <Box
        borderWidth='1'
        borderColor='black'
        paddingY='2'
        paddingX='5'
        borderBottomWidth={isExpanded ? "0" : "1"}
      >
        <Pressable
          onPress={() => {
            if (isExpanded) {
              action(-1);
            } else {
              action(myIndex);
            }
          }}
        >
          <HStack space={2}>
            <Box flex='1'>
              <Heading size='sm' isTruncated marginBottom='1'>
                {courseName}
              </Heading>
              <ProgressBar progress={getCourseProgress(courseUrl)} />
            </Box>
            <Box>
              <Center>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={24}
                />
              </Center>
            </Box>
          </HStack>
        </Pressable>
      </Box>
      <Collapse isOpen={isExpanded} duration={700}>
        <Box
          borderWidth='1'
          borderTopWidth='0'
          borderColor='black'
          borderBottomWidth='0'
          paddingX='1'
          paddingY='2'
        >
          <VStack space={3}>
            <UpdateTile
              color='info.500'
              iconName='add-circle'
              texts={getCourseUpdateText(myAdd, "No additions")}
            />
            <UpdateTile
              color='amber.500'
              iconName='information-circle'
              texts={getCourseUpdateText(myMod, "No modifications")}
            />
            <UpdateTile
              color='emerald.500'
              iconName='checkmark-circle'
              texts={getCourseUpdateText(myCmp, "No completions")}
            />
          </VStack>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default CourseUpdateTile;
