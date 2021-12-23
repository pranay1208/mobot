import React from "react";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import NotificationItem, {
  NotificationProp,
} from "../../components/notifications/notificationItem";
import { SwipeListView } from "react-native-swipe-list-view";
import NotificationSwipeHiddenContent from "../../components/notifications/NotificationSwipeHiddenContent";

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
        renderHiddenItem={(data, rowMap) =>
          NotificationSwipeHiddenContent(data.index)
        }
        rightOpenValue={-70}
        previewOpenDelay={3000}
      />
    </Box>
  );
};

export default NotificationListPage;
