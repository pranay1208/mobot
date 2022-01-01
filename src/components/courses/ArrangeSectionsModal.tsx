import React from "react";
import {
  Modal,
  Button,
  Box,
  Pressable,
  HStack,
  FlatList,
  Text,
} from "native-base";
import {
  CommonModalCloseButton,
  CommonModalHeader,
  ModalParamInterface,
} from "../common/ModalCommons";
import { PRIMARY_BLUE } from "../../colours.styles";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../../redux";
import { updateSectionOrderAction } from "../../redux/actions/moduleActions";

interface ArrangeSectionsModalInterface extends ModalParamInterface {
  sectionList: string[];
  courseUrl: string;
}

const pressUpList = (data: string[], index: number) => {
  if (index === 0) {
    return data;
  }
  return [
    ...data.slice(0, index - 1),
    data[index],
    data[index - 1],
    ...data.slice(index + 1),
  ];
};

const pressDownList = (data: string[], index: number) => {
  if (index === data.length - 1) {
    return data;
  }
  return [
    ...data.slice(0, index),
    data[index + 1],
    data[index],
    ...data.slice(index + 2),
  ];
};

const ArrangeSectionsModal = ({
  isOpen,
  onClose,
  sectionList,
  courseUrl,
}: ArrangeSectionsModalInterface) => {
  const [data, setData] = React.useState(sectionList);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    setData(sectionList);
  }, [sectionList]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Arrange Sections' />
        <Modal.Body>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <Box
                  paddingX='2'
                  paddingY='4'
                  borderWidth='1'
                  borderColor='black'
                  backgroundColor='white'
                >
                  <HStack space={2} paddingLeft='2'>
                    <Text flex='1' fontSize='xl' fontWeight='semibold'>
                      {item}
                    </Text>
                    <Pressable
                      paddingX='2'
                      onPress={() => {
                        setData(pressDownList(data, index));
                      }}
                    >
                      <Ionicons
                        name='arrow-down-circle'
                        size={32}
                        color='red'
                      />
                    </Pressable>
                    <Pressable
                      paddingX='2'
                      onPress={() => {
                        setData(pressUpList(data, index));
                      }}
                    >
                      <Ionicons
                        name='arrow-up-circle'
                        size={32}
                        color='green'
                      />
                    </Pressable>
                  </HStack>
                </Box>
              );
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button
              variant='ghost'
              colorScheme='blueGray'
              onPress={() => onClose(false)}
            >
              Cancel
            </Button>
            <Button
              backgroundColor={PRIMARY_BLUE}
              _text={{ color: "white" }}
              onPress={() => {
                dispatch(updateSectionOrderAction(courseUrl, data));
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

export default ArrangeSectionsModal;
