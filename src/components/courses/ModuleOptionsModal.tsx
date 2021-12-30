import React from "react";
import { Button, Modal, VStack } from "native-base";
import { useAppDispatch } from "../../redux";
import {
  CommonModalCloseButton,
  CommonModalHeader,
} from "../common/ModalCommons";
import { Ionicons } from "@expo/vector-icons";
import {
  toggleCompletionAction,
  toggleRemovalAction,
} from "../../redux/actions/moduleActions";

interface ModuleOptionsModalInterface {
  resourceUrl: string;
  closeAction: (url: string) => void;
  navigateAction: (url: string) => void;
}
export const ModuleOptionsModal = ({
  resourceUrl,
  closeAction,
  navigateAction,
}: ModuleOptionsModalInterface) => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      size='xl'
      isOpen={resourceUrl !== ""}
      onClose={() => closeAction("")}
    >
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Actions' />
        <Modal.Body paddingX='4' paddingY='2'>
          <VStack space={4}>
            <Button
              colorScheme='emerald'
              _text={{
                fontWeight: "semibold",
                fontSize: "xl",
              }}
              leftIcon={
                <Ionicons
                  name='checkmark-circle-outline'
                  size={28}
                  color='white'
                />
              }
              onPress={() => {
                closeAction("");
                dispatch(toggleCompletionAction(resourceUrl));
              }}
            >
              Mark Complete/Incomplete
            </Button>
            <Button
              _text={{
                fontWeight: "semibold",
                fontSize: "xl",
              }}
              colorScheme='danger'
              leftIcon={
                <Ionicons name='close-circle-outline' size={28} color='white' />
              }
              onPress={() => {
                closeAction("");
                dispatch(toggleRemovalAction(resourceUrl));
              }}
            >
              Hide this Module
            </Button>
            <Button
              _text={{
                fontWeight: "semibold",
                fontSize: "xl",
              }}
              colorScheme='info'
              onPress={() => {
                closeAction("");
                navigateAction(resourceUrl);
              }}
              leftIcon={
                <Ionicons name='enter-outline' size={28} color='white' />
              }
            >
              Open Module Page
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export const RemovedModuleOptionsModal = ({
  resourceUrl,
  closeAction,
  navigateAction,
}: ModuleOptionsModalInterface) => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      size='xl'
      isOpen={resourceUrl !== ""}
      onClose={() => closeAction("")}
    >
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Actions' />
        <Modal.Body paddingX='4' paddingY='2'>
          <VStack space={4}>
            <Button
              colorScheme='emerald'
              _text={{
                fontWeight: "semibold",
                fontSize: "xl",
              }}
              leftIcon={
                <Ionicons
                  name='checkmark-circle-outline'
                  size={28}
                  color='white'
                />
              }
              onPress={() => {
                closeAction("");
                dispatch(toggleCompletionAction(resourceUrl));
              }}
            >
              Mark Complete/Incomplete
            </Button>
            <Button
              _text={{
                fontWeight: "semibold",
                fontSize: "xl",
              }}
              colorScheme='danger'
              leftIcon={
                <Ionicons name='close-circle-outline' size={28} color='white' />
              }
              onPress={() => {
                closeAction("");
                dispatch(toggleRemovalAction(resourceUrl));
              }}
            >
              Restore this Module
            </Button>
            <Button
              _text={{
                fontWeight: "semibold",
                fontSize: "xl",
              }}
              colorScheme='info'
              onPress={() => {
                closeAction("");
                navigateAction(resourceUrl);
              }}
              leftIcon={
                <Ionicons name='enter-outline' size={28} color='white' />
              }
            >
              Open Module Page
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
