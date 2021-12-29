import { Box, Circle, HStack, Text } from "native-base";
import React from "react";
import { BACKGROUND_WHITE } from "../../colours.styles";
import { Ionicons } from "@expo/vector-icons";

import { NotificationType } from "../../interfaces/interface";

const AddedIconCircle = () => {
  return (
    <Circle size='12' backgroundColor='green.500'>
      <Ionicons name='bookmark-outline' size={32} color='white' />
    </Circle>
  );
};

const ModifiedIconCircle = () => {
  return (
    <Circle size='12' backgroundColor='yellow.500'>
      <Ionicons name='pencil' size={32} color='white' />
    </Circle>
  );
};

const DeadlineIconCircle = () => {
  return (
    <Circle size='12' backgroundColor='red.600'>
      <Ionicons name='calendar' size={32} color='white' />
    </Circle>
  );
};

export interface NotificationProp {
  notificationType: NotificationType;
  notificationText: string;
  index: number;
}

const NotificationItem = ({
  notificationText,
  notificationType,
  index,
}: NotificationProp) => {
  let IconCircle: () => JSX.Element;
  if (notificationType === "ADD") {
    IconCircle = AddedIconCircle;
  } else if (notificationType === "MODIFY") {
    IconCircle = ModifiedIconCircle;
  } else if (notificationType === "DEADLINE") {
    IconCircle = DeadlineIconCircle;
  } else {
    throw Error(`UNKNOWN circleType... ${notificationType}`);
  }
  return (
    <Box
      borderColor='#00000060'
      borderTopWidth='1'
      borderBottomWidth='1'
      backgroundColor={BACKGROUND_WHITE}
      paddingX='1'
      key={index}
    >
      <HStack space='1' alignItems='center'>
        <Box padding='1.5' paddingLeft='0.5'>
          <IconCircle />
        </Box>
        <Box flex='1'>
          <Text fontSize='sm' fontWeight='semibold' noOfLines={2}>
            {notificationText}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default NotificationItem;
