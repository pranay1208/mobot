import React from "react";
import { Modal, Button, Text, Link, VStack } from "native-base";
import {
  ModalParamInterface,
  CommonModalCloseButton,
  CommonModalHeader,
} from "../../components/common/ModalCommons";
import { PRIMARY_BLUE } from "../../colours.styles";

const AboutModal = ({ isOpen, onClose }: ModalParamInterface) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='About' />
        <Modal.Body>
          <VStack space={2}>
            <Text fontSize='lg'>
              MoBot is an app that stores all your data locally on your device.
              No information is stored on the cloud.
            </Text>
            <Text fontSize='lg'>
              MoBot does not save your Moodle credentials, and encrypts them
              using them to retrieve course information
            </Text>
            <Text fontSize='lg'>
              MoBot's application and the scraping API is open source and can be
              accessed through the following links:{"\n"}
              <Link
                href='https://github.com/pranay1208/mobot'
                isUnderlined
                isExternal
                _text={{
                  color: PRIMARY_BLUE,
                }}
              >
                Application
              </Link>
              {"\n"}
              <Link
                href='https://github.com/pranay1208/mobot_api'
                isUnderlined
                isExternal
                _text={{
                  color: PRIMARY_BLUE,
                }}
              >
                API Service
              </Link>
            </Text>
            <Text>Made by Pranay (HKU '22)</Text>
            <Text>Contributors: </Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant='ghost'
              onPress={() => onClose(false)}
              _text={{
                color: PRIMARY_BLUE,
              }}
            >
              Close
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AboutModal;
