import React from "react";
import { Circle, HStack, Pressable } from "native-base";
import { LIST_OF_COURSE_COLORS } from "../../colours.styles";

interface ColorCircleRowInterface {
  currentColor: string;
  onChange: (color: string) => void;
}

interface ColorCircleInterface extends ColorCircleRowInterface {
  color: string;
  size?: number;
}

export const ColorCircle = ({
  currentColor,
  onChange,
  color,
  size,
}: ColorCircleInterface) => {
  return (
    <Pressable
      key={color}
      onPress={() => {
        onChange(color);
      }}
    >
      <Circle
        backgroundColor={color}
        size={size ?? 10}
        borderColor='black'
        borderWidth={color === currentColor ? 4 : 0}
      ></Circle>
    </Pressable>
  );
};

export const ColorCircleRow = ({
  currentColor,
  onChange,
}: ColorCircleRowInterface) => {
  return (
    <HStack space={2}>
      {LIST_OF_COURSE_COLORS.map((color) => (
        <ColorCircle
          currentColor={currentColor}
          onChange={onChange}
          color={color}
          key={color}
        />
      ))}
    </HStack>
  );
};
