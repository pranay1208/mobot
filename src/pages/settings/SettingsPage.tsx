import { FlatList } from "native-base";
import React from "react";
import CoursesModal from "./CoursesModal";
import CredentialModal from "./CredentialModal";
import SettingOptionTile, {
  SettingOptionTileInterface,
} from "../../components/settings/SettingsOptionTile";
import AboutModal from "./AboutModal";
import NotificationModal from "./NotificationModal";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";
import { useEffect } from "react";
import ClearAllDataModal from "./ClearAllDataModal";

type Props = DrawerScreenProps<RootDrawerParamList, "Settings">;
const SettingsPage = ({ route }: Props) => {
  const { openAbout, openCourses, openCreds, openNotifs } = route.params;
  const [credModal, setCredModal] = React.useState(false);
  const [coursesModal, setCourseModal] = React.useState(false);
  const [notifModal, setNotifModal] = React.useState(false);
  const [aboutModal, setAboutModal] = React.useState(false);
  const [clearAllDataModal, setClearAllDataModal] = React.useState(false);

  useEffect(() => {
    setCredModal(openCreds);
    setCourseModal(openCourses);
    setNotifModal(openNotifs);
    setAboutModal(openAbout);
  }, [route.params]);

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
      onClickAction: () => {
        setClearAllDataModal(true);
      },
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
      <ClearAllDataModal
        isOpen={clearAllDataModal}
        onClose={setClearAllDataModal}
      />
    </>
  );
};

export default SettingsPage;
