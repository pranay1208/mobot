import { Pressable, Text, VStack } from "native-base";
import React from "react";

interface DeadlineIndicatorInterface {
  name: string;
  courseName: string;
  onClickAction: () => void;
  backgroundColor: string;
}

const DeadlineIndicator = ({
  name,
  courseName,
  onClickAction,
  backgroundColor,
}: DeadlineIndicatorInterface) => {
  return (
    <Pressable
      paddingX='3'
      paddingY='2'
      backgroundColor={backgroundColor}
      borderWidth='1'
      borderColor='black'
      onPress={() => onClickAction()}
    >
      <VStack>
        <Text fontSize='lg' fontWeight='semibold' color='white' isTruncated>
          {name}
        </Text>
        <Text
          fontSize='sm'
          fontWeight='semibold'
          color='white'
          paddingLeft='2'
          isTruncated
        >
          {courseName}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default DeadlineIndicator;
