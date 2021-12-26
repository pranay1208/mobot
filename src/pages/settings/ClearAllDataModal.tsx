import React from "react";
import { Modal, Button, Text } from "native-base";
import {
  ModalParamInterface,
  CommonModalCloseButton,
  CommonModalDangerHeader,
} from "../../components/common/ModalCommons";
import { useAppDispatch } from "../../redux";
import { NOTIIF_RED } from "../../colours.styles";
import { clearAllDataAction } from "../../redux/actions/settingsActions";

const ClearAllDataModal = ({ isOpen, onClose }: ModalParamInterface) => {
  const dispatch = useAppDispatch();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalDangerHeader title='Clear all data' />
        <Modal.Body>
          <Text fontSize='lg' paddingX='2'>
            Are you sure you want to delete all app data? This action is not
            reversable.
          </Text>
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
            <Button
              onPress={() => {
                dispatch(clearAllDataAction());
                onClose(false);
              }}
              backgroundColor={NOTIIF_RED}
            >
              Delete
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ClearAllDataModal;
