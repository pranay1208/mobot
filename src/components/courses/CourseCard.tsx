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
  //Populate this with the name, progress etc of the course
}

const CourseInfoText = (props: { value: string }) => {
  return (
    <Text fontSize='xs' fontWeight='semibold'>
      {props.value}
    </Text>
  );
};

const CourseCard = (props: CourseCardProps) => {
  const progressValue = 70; //Completed divided by total multiplied by 100 (and round to integer)
  let progressColor = "";
  if (progressValue > 60) {
    progressColor = "emerald";
  } else if (progressValue > 35) {
    progressColor = "orange";
  } else {
    progressColor = "danger";
  }

  return (
    <Pressable marginX='3' marginY='0.5' onPress={() => console.log("Hello")}>
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
              STAT1603: Introduction to Statistics
            </Heading>
          </Box>
          <Stack direction='row' space={1} marginLeft='1.5'>
            <Stack direction='column' flex='5' space='0'>
              <CourseInfoText value='4 Assignments' />
              <CourseInfoText value='1 Quizzes' />
              <CourseInfoText value='37 Resources' />
            </Stack>
            <Center flex={1}>
              <Circle
                bgColor={NOTIF_YELLOW}
                size='8'
                borderWidth='1'
                borderColor='#15151540'
              >
                <Text color='white'>10</Text>
              </Circle>
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
