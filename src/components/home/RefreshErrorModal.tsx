import { Modal, Center, Text, Button } from "native-base";
import React from "react";
import {
  CommonModalCloseButton,
  CommonModalDangerHeader,
} from "../common/ModalCommons";

interface RefreshErrorModalParams {
  err: string | null;
  onClose: () => void;
}

const getTitle = (err: string | null): string => {
  if (err === null) {
    return "";
  }
  return err.split(": ")[0];
};

const getError = (err: string | null): string => {
  if (err === null) {
    return "";
  }
  const splitVal = err.split(": ");
  if (splitVal.length === 0) {
    return splitVal[0];
  }
  return splitVal.slice(1).join(": ");
};

const RefreshErrorModal = ({ err, onClose }: RefreshErrorModalParams) => {
  return (
    <Modal isOpen={err !== null} onClose={() => onClose()}>
      {err !== null && (
        <Modal.Content>
          <CommonModalCloseButton />
          <CommonModalDangerHeader title={getTitle(err)} />
          <Modal.Body paddingY='4' paddingX='4'>
            <Center>
              <Text fontSize='lg' fontWeight='medium'>
                {getError(err)}
              </Text>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme='danger' onPress={() => onClose()}>
              OK
            </Button>
          </Modal.Footer>
        </Modal.Content>
      )}
    </Modal>
  );
};

export default RefreshErrorModal;
