import React from "react";
import { Modal, Button, Center, FlatList } from "native-base";
import {
  ModalParamInterface,
  CommonModalCloseButton,
  CommonModalHeader,
} from "../../components/common/ModalCommons";
import { useAppSelector } from "../../redux";
import {
  AddCourseModal,
  DeleteCourseConfirmationModal,
  EditCourseInfoModal,
  ModalCourseTile,
} from "../../components/settings/IndividualCourseComponents";
import { PRIMARY_BLUE } from "../../colours.styles";

const CoursesModal = ({ isOpen, onClose }: ModalParamInterface) => {
  const listOfCourses = useAppSelector((state) => state.courses);
  const [addModal, setAddModal] = React.useState(false);
  const [editCourseModal, setEditCourseModal] = React.useState(false);
  const [deleteCourseModal, setDeleteCourseModal] = React.useState(false);
  const [clickedIndex, setClickedindex] = React.useState(-1);
  const tileDeleteClick = (index: number) => {
    setClickedindex(index);
    setDeleteCourseModal(true);
  };
  const tileEditClick = (index: number) => {
    setClickedindex(index);
    setEditCourseModal(true);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content>
        <CommonModalCloseButton />
        <CommonModalHeader title='Courses' />
        <Modal.Body>
          <FlatList
            data={listOfCourses}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) =>
              ModalCourseTile(
                item.courseName,
                item.courseColor,
                index,
                tileEditClick,
                tileDeleteClick
              )
            }
          />
          {listOfCourses.length < 6 && (
            <Center marginTop='4' marginBottom='2'>
              <Button colorScheme='emerald' onPress={() => setAddModal(true)}>
                Add Course
              </Button>
            </Center>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button bgColor={PRIMARY_BLUE} onPress={() => onClose(false)}>
              Done
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
      <AddCourseModal isOpen={addModal} onClose={setAddModal} />
      {clickedIndex !== -1 && (
        <EditCourseInfoModal
          isOpen={editCourseModal}
          onClose={(a) => {
            setClickedindex(-1);
            setEditCourseModal(a);
          }}
          courseIndex={clickedIndex}
        />
      )}
      {clickedIndex !== -1 && (
        <DeleteCourseConfirmationModal
          isOpen={deleteCourseModal}
          onClose={(a) => {
            setClickedindex(-1);
            setDeleteCourseModal(a);
          }}
          courseUrl={listOfCourses[clickedIndex].courseUrl}
        />
      )}
    </Modal>
  );
};

export default CoursesModal;
