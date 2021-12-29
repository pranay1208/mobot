import React from "react";
import { Box, Text, Center } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const EmptyNotifPage = () => {
  return (
    <Box paddingTop='15'>
      <Center>
        <Text fontSize='2xl' fontWeight='semibold'>
          No active notifications
        </Text>
      </Center>
      <Center>
        <Ionicons name='notifications-off-circle' size={184} color='#C3C3CC' />
      </Center>
    </Box>
  );
};

export default EmptyNotifPage;
