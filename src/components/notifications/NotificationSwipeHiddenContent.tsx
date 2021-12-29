import React from "react";
import { HStack, Pressable, VStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../../redux";
import { dismissNotificationAction } from "../../redux/actions/notifActions";

const NotificationSwipeHiddenContent = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();
  return (
    <HStack flex='1' pl='2' bg='white'>
      <Pressable
        bg='red.500'
        w='70'
        ml='auto'
        justifyContent='center'
        onPress={() => dispatch(dismissNotificationAction(index))}
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
