import React from "react";
import { Modal, Button, Center } from "native-base";
import {
  ModalParamInterface,
  SettingsModalCloseButton,
  SettingsModalHeader,
} from "./ModalCommons";
import { useAppDispatch, useAppSelector } from "../../redux";
import { ModalCourseTile } from "./IndividualCourseComponents";
import { PRIMARY_BLUE } from "../../colours.styles";

const CoursesModal = ({ isOpen, onClose }: ModalParamInterface) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <SettingsModalCloseButton />
        <SettingsModalHeader title='Courses' />
        <Modal.Body>
          <ModalCourseTile />
          <ModalCourseTile />
          <Center marginTop='4' marginBottom='2'>
            <Button colorScheme='emerald'>Add Course</Button>
          </Center>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button bgColor={PRIMARY_BLUE} onPress={() => onClose(false)}>
              Done
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CoursesModal;
