import { Modal, Heading } from "native-base";
import React from "react";
import { BACKGROUND_WHITE, PRIMARY_BLUE } from "../../colours.styles";

export interface ModalParamInterface {
  isOpen: boolean;
  onClose: (a: boolean) => void;
}

export const SettingsModalHeader = ({ title }: { title: string }) => {
  return (
    <Modal.Header backgroundColor={PRIMARY_BLUE} tintColor={BACKGROUND_WHITE}>
      <Heading color='white' size='md'>
        {title}
      </Heading>
    </Modal.Header>
  );
};

export const SettingsModalCloseButton = () => (
  <Modal.CloseButton backgroundColor='white' />
);
