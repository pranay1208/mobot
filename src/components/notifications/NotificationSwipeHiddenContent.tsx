import React from "react";
import { HStack, Pressable, VStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const NotificationSwipeHiddenContent = (index: number) => {
  return (
    <HStack flex='1' pl='2' bg='white' key={index}>
      <Pressable
        bg='red.500'
        w='70'
        ml='auto'
        justifyContent='center'
        onPress={() => console.log(`sending dispatch to delete index ${index}`)}
        _pressed={{
          opacity: 0.7,
        }}
      >
        <VStack alignItems='center'>
          <Ionicons name='close-circle-outline' color='white' size={32} />
          <Text color='white' fontSize='xs'>
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
};

export default NotificationSwipeHiddenContent;
