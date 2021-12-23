import { FlatList } from "native-base";
import React from "react";
import CredentialModal from "../../components/settings/CredentialModal";
import SettingOptionTile, {
  SettingOptionTileInterface,
} from "../../components/settings/SettingsOptionTile";

const SettingsPage = () => {
  const [credModal, setCredModal] = React.useState(false);
  const listData: SettingOptionTileInterface[] = [
    {
      text: "Credentials",
      onClickAction: () => {
        setCredModal(true);
      },
    },
    {
      text: "Courses",
      onClickAction: () => {},
    },
    {
      text: "Notifications",
      onClickAction: () => {},
    },
    {
      text: "About",
      onClickAction: () => {},
    },
  ];
  return (
    <>
      <FlatList
        data={listData}
        renderItem={({ item }: { item: SettingOptionTileInterface }) => (
          <SettingOptionTile
            text={item.text}
            onClickAction={item.onClickAction}
          />
        )}
      />
      <CredentialModal isOpen={credModal} onClose={setCredModal} />
    </>
  );
};

export default SettingsPage;
