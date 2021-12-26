import React from "react";
import {
  Modal,
  Input,
  FormControl,
  Button,
  Checkbox,
  Box,
  Text,
} from "native-base";
import {
  ModalParamInterface,
  CommonModalCloseButton,
  CommonModalHeader,
} from "../../components/common/ModalCommons";
import { PRIMARY_BLUE } from "../../colours.styles";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  unsaveCredentialsAction,
  saveCredentialsAction,
} from "../../redux/actions/settingsActions";
import { useEffect } from "react";

const CHECKBOX_VALUE = "save";

const CredentialModal = ({ isOpen, onClose }: ModalParamInterface) => {
  const credentials = useAppSelector((state) => state.credentials);
  const dispatch = useAppDispatch();
  const saveCredentialsInitValue =
    credentials.username !== "" || credentials.password !== ""
      ? [CHECKBOX_VALUE]
      : [];

  const [saveCredentials, setSaveCredentials] = React.useState(
    saveCredentialsInitValue
  );
  const shouldNotTakeCreds = saveCredentials.length === 0;
  const [username, setUsername] = React.useState(
    shouldNotTakeCreds ? "" : credentials.username
  );
  const [password, setPassword] = React.useState(
    shouldNotTakeCreds ? "" : credentials.password
  );

  useEffect(() => {
    setUsername(credentials.username);
    setPassword(credentials.password);
    setSaveCredentials(saveCredentialsInitValue);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Credentials' />
        <Modal.Body>
          <Box marginBottom='1'>
            <Text>
              You will be prompted on each scrape if you choose not to save
              credentials. Uncheck anytime to remove stored credentials
            </Text>
          </Box>
          <FormControl>
            <FormControl.Label fontWeight='bold'>
              Moodle Username
            </FormControl.Label>
            <Input
              borderWidth={shouldNotTakeCreds ? "0" : "1"}
              borderColor='black'
              size='md'
              placeholder='Username'
              value={username}
              onChangeText={setUsername}
              marginBottom='2'
            />
          </FormControl>
          <FormControl>
            <FormControl.Label fontWeight='bold'>
              Moodle Password
            </FormControl.Label>
            <Input
              borderWidth={shouldNotTakeCreds ? "0" : "1"}
              borderColor='black'
              size='md'
              type='password'
              placeholder='Password'
              value={password}
              onChangeText={setPassword}
              marginBottom='2'
            />
          </FormControl>
          <Checkbox.Group
            marginY='2'
            value={saveCredentials}
            onChange={setSaveCredentials}
          >
            <Checkbox value={CHECKBOX_VALUE} size='md' colorScheme='darkBlue'>
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
            <Button
              bgColor={PRIMARY_BLUE}
              onPress={() => {
                if (shouldNotTakeCreds) {
                  dispatch(unsaveCredentialsAction());
                } else {
                  dispatch(saveCredentialsAction(username, password));
                }
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
