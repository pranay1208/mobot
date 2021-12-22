import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Box, Center, Heading, VStack } from "native-base";
import { PRIMARY_BLUE } from "../colours.styles";

const AppDrawer = (props: DrawerContentComponentProps) => {
  return (
    <VStack flex='1'>
      <Box
        padding='2'
        borderBottomWidth='1'
        borderColor={PRIMARY_BLUE}
        backgroundColor={PRIMARY_BLUE}
        safeArea
        shadow='6'
      >
        <Center>
          <Heading size='xl' color='white'>
            Mobot
          </Heading>
        </Center>
      </Box>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </VStack>
  );
};

export default AppDrawer;
