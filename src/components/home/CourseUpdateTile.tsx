import React from "react";
import {
  Box,
  Text,
  HStack,
  Heading,
  Center,
  VStack,
  Collapse,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../common/ProgressBar";
import { Pressable } from "react-native";
import UpdateTile from "./UpdateTile";

interface CourseUpdateTileProps {
  myIndex: number;
  selIndex: number;
  action: (i: number) => void;
  //course: CourseShiz
  // * Demo props, remove when formalizing
  name: string;
  progress: number;
}

const CourseUpdateTile = ({
  myIndex,
  selIndex,
  action,
  name,
  progress,
}: CourseUpdateTileProps) => {
  const isExpanded = myIndex === selIndex;
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
                {name}
              </Heading>
              <ProgressBar progress={progress} />
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
              texts={["Assignment 4", "13 Resources"]}
            />
            <UpdateTile
              color='amber.500'
              iconName='information-circle'
              texts={["Assignment 3", "2 Resources"]}
            />
            <UpdateTile
              color='emerald.500'
              iconName='checkmark-circle'
              texts={["Assignment 2", "Assignment 1", "5 Resources"]}
            />
          </VStack>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default CourseUpdateTile;
