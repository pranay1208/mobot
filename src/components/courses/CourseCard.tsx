import {
  Box,
  Center,
  Circle,
  Heading,
  HStack,
  Pressable,
  Progress,
  Stack,
  Text,
} from "native-base";
import React from "react";
import { BACKGROUND_WHITE, NOTIF_YELLOW } from "../../colours.styles";

export interface CourseCardProps {
  courseTitle: string;
  courseAlerts: number;
  numberAssignments: number;
  numberQuizzes: number;
  numberResources: number;
  totalModules: number;
  completedModules: number;
}

const CourseInfoText = (props: { value: string }) => {
  return (
    <Text fontSize='xs' fontWeight='semibold'>
      {props.value}
    </Text>
  );
};

const CourseCard = (props: CourseCardProps) => {
  const progressValue = Math.floor(
    (props.completedModules / props.totalModules) * 100
  );
  let progressColor = "";
  if (progressValue > 60) {
    progressColor = "emerald";
  } else if (progressValue > 35) {
    progressColor = "orange";
  } else {
    progressColor = "danger";
  }

  return (
    <Pressable marginX='3' marginY='2' onPress={() => console.log("Hello")}>
      <Box
        rounded='md'
        textOverflow='ellipsis'
        borderColor='gray.300'
        borderWidth='1'
        shadow='6'
        paddingX='2.5'
        paddingY='1'
        backgroundColor={BACKGROUND_WHITE}
      >
        <Stack direction='column' space={1}>
          <Box>
            <Heading size='sm' isTruncated>
              {props.courseTitle}
            </Heading>
          </Box>
          <Stack direction='row' space={1} marginLeft='1.5'>
            <Stack direction='column' flex='5' space='0'>
              <CourseInfoText
                value={`${props.numberAssignments} Assignments`}
              />
              <CourseInfoText value={`${props.numberQuizzes} Quizzes`} />
              <CourseInfoText value={`${props.numberResources} Resources`} />
            </Stack>
            <Center flex={1}>
              {props.courseAlerts === 0 || (
                <Circle
                  bgColor={NOTIF_YELLOW}
                  size='8'
                  borderWidth='1'
                  borderColor='#15151540'
                >
                  <Text color='white'>{props.courseAlerts}</Text>
                </Circle>
              )}
            </Center>
          </Stack>
          <HStack alignItems='center'>
            <Box flex='5'>
              <Progress
                value={progressValue}
                size='sm'
                colorScheme={progressColor}
              />
            </Box>
            <Box flex='1' paddingLeft={1.5}>
              <Text fontSize='xs'>{progressValue}%</Text>
            </Box>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
  );
};

export default CourseCard;
