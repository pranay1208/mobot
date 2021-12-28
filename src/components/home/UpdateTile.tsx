import { Box, HStack, Center, Text } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface UpdateTileProps {
  color: string;
  iconName: "information-circle" | "add-circle" | "checkmark-circle";
  texts: string[];
}

const UpdateTile = ({ color, iconName, texts }: UpdateTileProps) => {
  return (
    <Box backgroundColor={color} rounded='md' paddingX='2' paddingY='1'>
      <HStack space={2}>
        <Center>
          <Ionicons name={iconName} size={36} />
        </Center>
        <Box flex='1'>
          {texts.map((txt, index) => (
            <Text fontWeight='semibold' fontSize='lg' key={index} isTruncated>
              {txt}
            </Text>
          ))}
        </Box>
      </HStack>
    </Box>
  );
};

export default UpdateTile;
