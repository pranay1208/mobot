import { Box, HStack, Text, Center, Pressable } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface NotificationTileInterface {
  numDays: number;
  onDeleteAction: () => void;
}

const NotificationTile = ({
  numDays,
  onDeleteAction,
}: NotificationTileInterface) => {
  return (
    <Box paddingX='2' paddingY='2' borderColor='gray.500' borderBottomWidth='1'>
      <HStack>
        <Center paddingBottom='1' paddingRight='3'>
          <Ionicons name='notifications' size={18} />
        </Center>
        <Text flex={1} isTruncated paddingRight='4' fontWeight='semibold'>
          {numDays} days before due date
        </Text>
        <Pressable onPress={() => onDeleteAction()}>
          <Box paddingX='1'>
            <Ionicons name='close-circle-outline' color='red' size={28} />
          </Box>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default NotificationTile;
