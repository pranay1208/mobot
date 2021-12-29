import React from "react";
import { Box } from "native-base";
import NotificationItem from "../../components/notifications/NotificationItem";
import { SwipeListView } from "react-native-swipe-list-view";
import NotificationSwipeHiddenContent from "../../components/notifications/NotificationSwipeHiddenContent";
import { useAppSelector } from "../../redux";
import EmptyNotifPage from "./EmptyNotifPage";

const NotificationListPage = () => {
  const notifs = useAppSelector((state) => state.notifications);

  if (notifs.length === 0) {
    return <EmptyNotifPage />;
  }

  const currentTime = new Date().getTime();
  const data = notifs.filter((notif) => notif.dateAvailable < currentTime);
  return (
    <Box>
      <SwipeListView
        data={data}
        disableRightSwipe
        keyExtractor={(_, index) => index.toString()}
        renderItem={(data, _) => (
          <NotificationItem
            notificationText={data.item.notificationText}
            notificationType={data.item.notificationType}
            index={data.index}
          />
        )}
        renderHiddenItem={(data, rowMap) => (
          <NotificationSwipeHiddenContent
            key={data.index}
            index={data.index}
            closeRow={() => rowMap[data.index].closeRowWithoutAnimation()}
          />
        )}
        rightOpenValue={-70}
        previewOpenDelay={3000}
      />
    </Box>
  );
};

export default NotificationListPage;
