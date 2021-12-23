import { Box, Pressable, Text } from "native-base";
import React from "react";

export interface SettingOptionTileInterface {
  onClickAction: () => void;
  text: string;
}

const SettingOptionTile = ({
  onClickAction,
  text,
}: SettingOptionTileInterface) => {
  return (
    <Pressable
      onPress={() => onClickAction()}
      _pressed={{
        opacity: "0.5",
      }}
    >
      <Box
        paddingX='4'
        paddingY='3'
        borderBottomWidth='2'
        borderBottomColor='coolGray.400'
      >
        <Text fontSize='2xl' fontWeight='semibold'>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default SettingOptionTile;
