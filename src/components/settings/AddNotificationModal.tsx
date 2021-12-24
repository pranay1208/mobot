import React from "react";
import { Button, FormControl, Input, Modal } from "native-base";
import {
  ModalParamInterface,
  SettingsModalCloseButton,
  SettingsModalHeader,
} from "./ModalCommons";
import { PRIMARY_BLUE } from "../../colours.styles";

interface AddNotificationModalInterface extends ModalParamInterface {
  addAction: (d: number) => void;
}

const AddNotificationModal = ({
  isOpen,
  onClose,
  addAction,
}: AddNotificationModalInterface) => {
  const [numDays, setNumDays] = React.useState(0);
  const cleanClose = () => {
    setNumDays(0);
    onClose(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={cleanClose} size='xl'>
      <Modal.Content>
        <SettingsModalCloseButton />
        <SettingsModalHeader title='Add Notification' />
        <Modal.Body>
          <FormControl isInvalid={numDays === 0}>
            <FormControl.Label>
              Number of days before deadline
            </FormControl.Label>
            <Input
              placeholder='1'
              value={numDays === 0 ? "" : numDays.toString()}
              onChangeText={(text: string) => {
                if (text.length === 0) {
                  setNumDays(0);
                  return;
                }
                const num = parseFloat(text);
                if (isNaN(num)) return;
                setNumDays(num);
              }}
            />
            <FormControl.ErrorMessage>
              Number of days must be provided
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button
              variant='ghost'
              colorScheme='blueGray'
              onPress={() => cleanClose()}
            >
              Cancel
            </Button>
            <Button
              backgroundColor={PRIMARY_BLUE}
              onPress={() => {
                if (numDays === 0) return;
                addAction(numDays);
                cleanClose();
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddNotificationModal;
