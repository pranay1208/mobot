import React from "react";
import { HStack, Box, Progress, Text } from "native-base";

interface ProgressBarParams {
  progress: number;
}
const ProgressBar = ({ progress }: ProgressBarParams) => {
  let progressColor = "";
  if (progress > 60) {
    progressColor = "emerald";
  } else if (progress > 35) {
    progressColor = "orange";
  } else {
    progressColor = "danger";
  }
  return (
    <HStack alignItems='center'>
      <Box flex='1'>
        <Progress value={progress} size='sm' colorScheme={progressColor} />
      </Box>
      <Box paddingLeft={1.5}>
        <Text fontSize='xs'>{progress}%</Text>
      </Box>
    </HStack>
  );
};

export default ProgressBar;
