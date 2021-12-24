import { FlatList } from "native-base";
import React from "react";
import CoursesModal from "./CoursesModal";
import CredentialModal from "./CredentialModal";
import SettingOptionTile, {
  SettingOptionTileInterface,
} from "../../components/settings/SettingsOptionTile";
import AboutModal from "./AboutModal";
import NotificationModal from "./NotificationModal";

const SettingsPage = () => {
  const [credModal, setCredModal] = React.useState(false);
  const [coursesModal, setCourseModal] = React.useState(false);
  const [notifModal, setNotifModal] = React.useState(false);
  const [aboutModal, setAboutModal] = React.useState(false);
  const listData: SettingOptionTileInterface[] = [
    {
      text: "Credentials",
      onClickAction: () => {
        setCredModal(true);
      },
    },
    {
      text: "Courses",
      onClickAction: () => {
        setCourseModal(true);
      },
    },
    {
      text: "Notifications",
      onClickAction: () => {
        setNotifModal(true);
      },
    },
    {
      text: "About",
      onClickAction: () => {
        setAboutModal(true);
      },
    },
    //TODO: This is the last thing to implement so we can set CLEAR_ALL_DATA on each reducer
    {
      text: "Clear Data",
      onClickAction: () => {},
    },
  ];
  return (
    <>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: SettingOptionTileInterface }) => (
          <SettingOptionTile
            text={item.text}
            onClickAction={item.onClickAction}
          />
        )}
      />
      <CredentialModal isOpen={credModal} onClose={setCredModal} />
      <CoursesModal isOpen={coursesModal} onClose={setCourseModal} />
      <NotificationModal isOpen={notifModal} onClose={setNotifModal} />
      <AboutModal isOpen={aboutModal} onClose={setAboutModal} />
    </>
  );
};

export default SettingsPage;
