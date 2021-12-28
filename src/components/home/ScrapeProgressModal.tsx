import { Modal, Spinner, Text, Box, Center } from "native-base";
import React from "react";
import { CommonModalHeader } from "../common/ModalCommons";

export enum REFRESH_STATE {
  ENCRYPTING,
  FETCHING,
  PROJECTING,
  COMPLETE,

  UNKNOWN,
}

const getAppropriateText = (state: REFRESH_STATE): string => {
  switch (state) {
    case REFRESH_STATE.ENCRYPTING:
      return "Encrypting your credentials...";
    case REFRESH_STATE.FETCHING:
      return "Fetching data now...";
    case REFRESH_STATE.PROJECTING:
      return "Received data. Updating app...";
    case REFRESH_STATE.COMPLETE:
      return "All done!";
    default:
      return "Something has gone wrong!!!!!";
  }
};

interface ScrapeProgressModalInterface {
  isOpen: boolean;
  refreshState: REFRESH_STATE;
}

const ScrapeProgressModal = ({
  isOpen,
  refreshState,
}: ScrapeProgressModalInterface) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content>
        <CommonModalHeader title='Refreshing Modules' />
        <Modal.Body>
          <Text fontSize='lg' fontWeight='semibold'>
            {getAppropriateText(refreshState)}
          </Text>
          <Box>
            <Center>
              <Spinner size='lg' color='emerald.500' />
            </Center>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ScrapeProgressModal;
