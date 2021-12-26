import { Modal, Heading } from "native-base";
import React from "react";
import {
  BACKGROUND_WHITE,
  NOTIIF_RED,
  PRIMARY_BLUE,
} from "../../colours.styles";

export interface ModalParamInterface {
  isOpen: boolean;
  onClose: (a: boolean) => void;
}

export const CommonModalHeader = ({ title }: { title: string }) => {
  return (
    <Modal.Header backgroundColor={PRIMARY_BLUE} tintColor={BACKGROUND_WHITE}>
      <Heading color='white' size='md'>
        {title}
      </Heading>
    </Modal.Header>
  );
};

export const CommonModalDangerHeader = ({ title }: { title: string }) => {
  return (
    <Modal.Header backgroundColor={NOTIIF_RED} tintColor={BACKGROUND_WHITE}>
      <Heading color='white' size='md'>
        {title}
      </Heading>
    </Modal.Header>
  );
};

export const CommonModalCloseButton = () => (
  <Modal.CloseButton
    _icon={{
      color: "white",
    }}
  />
);
