import React from "react";
import { Modal, Input, FormControl, Button, Checkbox } from "native-base";
import {
  ModalParamInterface,
  SettingsModalCloseButton,
  SettingsModalHeader,
} from "./ModalCommons";
import { PRIMARY_BLUE } from "../../colours.styles";

const CredentialModal = ({ isOpen, onClose }: ModalParamInterface) => {
  const [saveCredentials, setSaveCredentials] = React.useState([]);
  const shouldNotTakeCreds = saveCredentials.length === 0;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <Modal.Content>
        <SettingsModalCloseButton />
        <SettingsModalHeader title='Credentials' />
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              size='md'
              placeholder='Username'
              isDisabled={shouldNotTakeCreds}
              value={shouldNotTakeCreds ? "" : username}
              onChangeText={setUsername}
              marginBottom='2'
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              size='md'
              type='password'
              placeholder='Password'
              isDisabled={shouldNotTakeCreds}
              value={shouldNotTakeCreds ? "" : password}
              onChangeText={setPassword}
              marginBottom='2'
            />
          </FormControl>
          <Checkbox.Group
            marginY='2'
            value={saveCredentials}
            onChange={setSaveCredentials}
          >
            <Checkbox value='save' size='md'>
              Remember Credentials
            </Checkbox>
          </Checkbox.Group>
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
            <Button bgColor={PRIMARY_BLUE}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CredentialModal;
