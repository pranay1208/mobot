import React from "react";
import { Box, Text, HStack, Heading, Center, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../common/ProgressBar";
import { Pressable } from "react-native";

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
  return (
    <VStack>
      <Box
        borderWidth='1'
        borderColor='black'
        paddingY='2'
        paddingX='5'
        borderBottomWidth={myIndex === selIndex ? "0" : "1"}
      >
        <Pressable
          onPress={() => {
            if (myIndex === selIndex) {
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
                  name={myIndex === selIndex ? "chevron-up" : "chevron-down"}
                  size={24}
                />
              </Center>
            </Box>
          </HStack>
        </Pressable>
      </Box>
      {myIndex === selIndex && (
        <Box
          borderWidth='1'
          borderTopWidth='0'
          borderColor='black'
          borderBottomWidth='0'
          paddingX='1'
          paddingY='2'
        >
          <VStack space={3}>
            <Box
              backgroundColor='info.500'
              rounded='md'
              paddingX='2'
              paddingY='1'
            >
              <HStack space={2}>
                <Center>
                  <Ionicons name='add-circle' size={36} />
                </Center>
                <Box flex='1'>
                  <Text fontWeight='semibold' fontSize='lg'>
                    Assignment 4
                  </Text>
                  <Text fontWeight='semibold' fontSize='lg'>
                    13 Resources
                  </Text>
                </Box>
              </HStack>
            </Box>
            <Box
              backgroundColor='amber.500'
              rounded='md'
              paddingX='2'
              paddingY='1'
            >
              <HStack space={2}>
                <Center>
                  <Ionicons name='pencil' size={36} />
                </Center>
                <Box flex='1'>
                  <Text fontWeight='semibold' fontSize='lg'>
                    Assignment 3
                  </Text>
                  <Text fontWeight='semibold' fontSize='lg'>
                    2 Resources
                  </Text>
                </Box>
              </HStack>
            </Box>
            <Box
              backgroundColor='emerald.500'
              rounded='md'
              paddingX='2'
              paddingY='1'
            >
              <HStack space={2}>
                <Center>
                  <Ionicons name='checkmark-circle' size={36} />
                </Center>
                <Box flex='1'>
                  <Text fontWeight='semibold' fontSize='lg'>
                    Assignment 2
                  </Text>
                  <Text fontWeight='semibold' fontSize='lg'>
                    Assignment 1
                  </Text>
                  <Text fontWeight='semibold' fontSize='lg'>
                    5 Resources
                  </Text>
                </Box>
              </HStack>
            </Box>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default CourseUpdateTile;
