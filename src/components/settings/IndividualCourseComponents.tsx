import {
  HStack,
  Box,
  Text,
  Pressable,
  Modal,
  Heading,
  Button,
  FormControl,
  Input,
  useToast,
  Center,
} from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ModalParamInterface,
  CommonModalCloseButton,
  CommonModalHeader,
  CommonModalDangerHeader,
} from "../common/ModalCommons";
import {
  BACKGROUND_WHITE,
  LIST_OF_COURSE_COLORS,
  NOTIIF_RED,
  PRIMARY_BLUE,
} from "../../colours.styles";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  addCourseAction,
  deleteCourseAction,
  editCourseAction,
} from "../../redux/actions/settingsActions";
import { ColorCircle, ColorCircleRow } from "./CourseColorSelector";
import { useEffect } from "react";

export const ModalCourseTile = (
  courseName: string,
  courseColor: string,
  courseIndex: number,
  editClick: (i: number) => void,
  deleteClick: (i: number) => void
) => {
  return (
    <Box borderBottomWidth='1' borderBottomColor='gray.500' height='12'>
      <HStack paddingX='1' paddingY='2'>
        <Center paddingBottom='1' paddingRight='3'>
          <ColorCircle
            currentColor=''
            onChange={() => {}}
            color={courseColor}
            size={6}
          />
        </Center>
        <Text flex={1} isTruncated paddingRight='4' fontWeight='semibold'>
          {courseName}
        </Text>
        <Pressable
          onPress={() => deleteClick(courseIndex)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Box
            borderRightWidth='1'
            borderLeftWidth='1'
            paddingX='1'
            borderColor='gray.300'
          >
            <Ionicons name='close-circle-outline' color='red' size={28} />
          </Box>
        </Pressable>
        <Pressable
          onPress={() => editClick(courseIndex)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Box
            borderRightWidth='1'
            borderLeftWidth='1'
            paddingX='1'
            borderColor='gray.300'
          >
            <Ionicons name='pencil' size={24} />
          </Box>
        </Pressable>
      </HStack>
    </Box>
  );
};

interface DeleteCourseModalParams extends ModalParamInterface {
  courseUrl: string;
}
export const DeleteCourseConfirmationModal = ({
  isOpen,
  onClose,
  courseUrl,
}: DeleteCourseModalParams) => {
  const dispatch = useAppDispatch();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalDangerHeader title='Delete course' />
        <Modal.Body>
          <Text fontSize='lg' paddingX='2'>
            Are you sure you want to delete this course? This will delete all
            courses and information associated with it
          </Text>
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
              onPress={() => {
                dispatch(deleteCourseAction(courseUrl));
                onClose(false);
              }}
              backgroundColor={NOTIIF_RED}
            >
              Delete
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

interface EditCourseModalParams extends ModalParamInterface {
  courseIndex: number;
}
export const EditCourseInfoModal = ({
  isOpen,
  onClose,
  courseIndex,
}: EditCourseModalParams) => {
  const selectedTile = useAppSelector((state) => {
    return state.courses[courseIndex];
  });
  const dispatch = useAppDispatch();
  const [courseName, setCourseName] = React.useState(
    selectedTile?.courseName ?? ""
  );
  const [courseUrl, setCourseUrl] = React.useState(
    selectedTile?.courseUrl ?? ""
  );
  const [courseColor, setCourseColor] = React.useState(
    selectedTile?.courseColor ?? ""
  );
  const editToast = useToast();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Edit Course' />
        <Modal.Body>
          <FormControl marginBottom='2' isInvalid={courseName.trim() === ""}>
            <FormControl.Label>Course Name</FormControl.Label>
            <Input
              value={courseName}
              onChangeText={setCourseName}
              placeholder='ENGG1330: Introduction to Programming'
              borderWidth='1'
              borderColor='gray.400'
            />
            <FormControl.HelperText fontWeight='semibold'>
              What you would like to refer to the course as
            </FormControl.HelperText>
          </FormControl>
          <FormControl isInvalid={courseUrl.trim() === ""}>
            <FormControl.Label>Course URL</FormControl.Label>
            <Input
              isDisabled={true}
              value={courseUrl}
              onChangeText={setCourseUrl}
              placeholder='https://moodle.hku.hk/course/view.php?id=12345'
              borderWidth='1'
              borderColor='gray.400'
            />
            <FormControl.HelperText fontWeight='semibold'>
              This is the course's URL on Moodle
            </FormControl.HelperText>
          </FormControl>
          <Box>
            <FormControl.Label>Color</FormControl.Label>
            <ColorCircleRow
              currentColor={courseColor}
              onChange={(color) => setCourseColor(color)}
            />
          </Box>
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
              onPress={() => {
                if (courseName && courseUrl && courseColor) {
                  dispatch(
                    editCourseAction(
                      courseIndex,
                      courseName,
                      courseUrl,
                      courseColor
                    )
                  );
                  onClose(false);
                } else {
                  editToast.show({
                    description: "Please fill in all fields",
                    backgroundColor: "red.500",
                    tintColor: "white",
                  });
                }
              }}
              backgroundColor={PRIMARY_BLUE}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export const AddCourseModal = ({ isOpen, onClose }: ModalParamInterface) => {
  const dispatch = useAppDispatch();
  const [courseName, setCourseName] = React.useState("");
  const [courseUrl, setCourseUrl] = React.useState("");
  const [courseColor, setCourseColor] = React.useState(
    LIST_OF_COURSE_COLORS[Math.floor(Math.random() * 6)]
  );
  const addToast = useToast();
  useEffect(() => {
    setCourseName("");
    setCourseUrl("");
    setCourseColor(LIST_OF_COURSE_COLORS[Math.floor(Math.random() * 6)]);
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Add Course' />
        <Modal.Body>
          <FormControl marginBottom='2' isInvalid={courseName.trim() === ""}>
            <FormControl.Label>Course Name</FormControl.Label>
            <Input
              value={courseName}
              onChangeText={setCourseName}
              placeholder='ENGG1330: Introduction to Programming'
              borderWidth='1'
              borderColor='gray.400'
            />
            <FormControl.HelperText fontWeight='semibold'>
              What you would like to refer to the course as
            </FormControl.HelperText>
          </FormControl>
          <FormControl marginBottom='2' isInvalid={courseUrl.trim() === ""}>
            <FormControl.Label>Course URL</FormControl.Label>
            <Input
              value={courseUrl}
              onChangeText={setCourseUrl}
              placeholder='https://moodle.hku.hk/course/view.php?id=12345'
              borderWidth='1'
              borderColor='gray.400'
            />
            <FormControl.HelperText fontWeight='semibold'>
              This is the course's URL on Moodle
            </FormControl.HelperText>
          </FormControl>
          <Box>
            <FormControl.Label>Color</FormControl.Label>
            <ColorCircleRow
              currentColor={courseColor}
              onChange={(color) => setCourseColor(color)}
            />
          </Box>
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
              onPress={() => {
                if (courseName !== "" && courseUrl !== "") {
                  dispatch(addCourseAction(courseName, courseUrl, courseColor));
                  onClose(false);
                } else {
                  addToast.show({
                    description: "Please fill in all fields",
                    backgroundColor: "red.500",
                    tintColor: "white",
                    duration: 3000,
                  });
                }
              }}
              backgroundColor={PRIMARY_BLUE}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
