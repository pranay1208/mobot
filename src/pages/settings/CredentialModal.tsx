import React from "react";
import { Modal, Input, FormControl, Button, Center } from "native-base";
import {
  ModalParamInterface,
  CommonModalCloseButton,
  CommonModalHeader,
} from "../../components/common/ModalCommons";
import { PRIMARY_BLUE } from "../../colours.styles";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  saveCredentialsAction,
  unsaveCredentialsAction,
} from "../../redux/actions/settingsActions";
import { useEffect } from "react";

const CredentialModal = ({ isOpen, onClose }: ModalParamInterface) => {
  const credentials = useAppSelector((state) => state.credentials);
  const dispatch = useAppDispatch();
  const [username, setUsername] = React.useState(credentials.username);
  const [password, setPassword] = React.useState(credentials.password);

  useEffect(() => {
    setUsername(credentials.username);
    setPassword(credentials.password);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Credentials' />
        <Modal.Body>
          <FormControl isInvalid={username === ""}>
            <FormControl.Label fontWeight='bold'>
              Moodle Username
            </FormControl.Label>
            <Input
              borderWidth='1'
              borderColor='black'
              size='md'
              placeholder='Username'
              value={username}
              onChangeText={setUsername}
              marginBottom='2'
            />
            <FormControl.ErrorMessage>
              Username is empty
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={password === ""}>
            <FormControl.Label fontWeight='bold'>
              Moodle Password
            </FormControl.Label>
            <Input
              borderWidth='1'
              borderColor='black'
              size='md'
              type='password'
              placeholder='Password'
              value={password}
              onChangeText={setPassword}
              marginBottom='2'
            ></Input>
            <FormControl.ErrorMessage>
              Password is empty
            </FormControl.ErrorMessage>
          </FormControl>
          <Center marginTop='2'>
            <Button
              colorScheme='danger'
              onPress={() => {
                dispatch(unsaveCredentialsAction());
                onClose(false);
              }}
            >
              Delete Credentials
            </Button>
          </Center>
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
              bgColor={PRIMARY_BLUE}
              onPress={() => {
                if (username === "" || password === "") {
                  return;
                }
                dispatch(saveCredentialsAction(username, password));
                onClose(false);
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

export default CredentialModal;
