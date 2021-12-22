import React from "react";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import NotificationItem, {
  NotificationProp,
} from "../../components/notifications/notificationItem";
import { Ionicons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";

const NotificationSwipeHiddenContent = ({ index }: { index: number }) => {
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

const NotificationListPage = () => {
  const data: NotificationProp[] = [
    {
      notificationType: "ADD",
      notificationText: "New modules added to STAT1603, COMP3258 and COMP4801",
      index: 0,
    },
    {
      notificationType: "DEADLINE",
      notificationText: "Upcoming deadline for STAT1603",
      index: 0,
    },
    {
      notificationType: "MODIFY",
      notificationText: "Modified resources in GEOG1012",
      index: 0,
    },
  ];
  return (
    <Box safeAreaTop>
      <SwipeListView
        data={data}
        disableRightSwipe
        renderItem={(data, rowMap) => (
          <NotificationItem
            notificationText={data.item.notificationText}
            notificationType={data.item.notificationType}
            index={data.index}
          />
        )}
        renderHiddenItem={(data, rowMap) => (
          <NotificationSwipeHiddenContent index={data.index} />
        )}
        rightOpenValue={-70}
        previewOpenDelay={3000}
      />
    </Box>
  );
};

export default NotificationListPage;
