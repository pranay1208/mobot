import React from "react";
import { HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface OverviewTextParams {
  text: string;
  iconName: "add-circle" | "pencil" | "checkmark-circle";
  iconColor: string;
}
const OverviewText = ({ text, iconColor, iconName }: OverviewTextParams) => {
  return (
    <HStack space={1} paddingY='1' paddingX='1'>
      <Ionicons name={iconName} size={24} color={iconColor} />
      <Text fontSize='lg' fontWeight='semibold'>
        {text}
      </Text>
    </HStack>
  );
};
export default OverviewText;
