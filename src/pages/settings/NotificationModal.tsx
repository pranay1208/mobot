import { Button, Center, Modal, Text, Box } from "native-base";
import React from "react";
import { PRIMARY_BLUE } from "../../colours.styles";
import AddNotificationModal from "../../components/settings/AddNotificationModal";
import {
  ModalParamInterface,
  CommonModalCloseButton,
  CommonModalHeader,
} from "../../components/common/ModalCommons";
import NotificationTile from "../../components/settings/NotificationTile";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  addNotificationDurationAction,
  deleteNotificationDurationAction,
} from "../../redux/actions/settingsActions";

const NotificationModal = ({ isOpen, onClose }: ModalParamInterface) => {
  const notifDurations = useAppSelector((state) => state.notificationDurations);
  const dispatch = useAppDispatch();
  const [addNotifModal, setAddNotifModal] = React.useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Notifications' />
        <Modal.Body>
          <Box marginBottom='1'>
            <Text>
              MoBot will send you push notifications before each uncompleted
              assignment
            </Text>
          </Box>
          {notifDurations.map((days, index) => {
            return (
              <NotificationTile
                key={index}
                numDays={days}
                onDeleteAction={() =>
                  dispatch(deleteNotificationDurationAction(days))
                }
              />
            );
          })}
          {notifDurations.length < 4 && (
            <Center marginTop='4' marginBottom='2'>
              <Button
                colorScheme='emerald'
                onPress={() => setAddNotifModal(true)}
              >
                Add Notification
              </Button>
            </Center>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant='ghost'
              colorScheme='blueGray'
              onPress={() => onClose(false)}
            >
              Cancel
            </Button>
            <Button bgColor={PRIMARY_BLUE} onPress={() => onClose(false)}>
              Done
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
      <AddNotificationModal
        isOpen={addNotifModal}
        onClose={setAddNotifModal}
        addAction={(d) => {
          dispatch(addNotificationDurationAction(d));
        }}
      />
    </Modal>
  );
};

export default NotificationModal;
