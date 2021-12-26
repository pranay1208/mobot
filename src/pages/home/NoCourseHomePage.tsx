import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";
import { Box, Button, Center, Text, VStack } from "native-base";

type Props = DrawerScreenProps<RootDrawerParamList, "Home">;
const NoCourseHomePage = ({ navigation }: Props) => {
  return (
    <VStack space={10}>
      <Box marginTop='25'>
        <Center>
          <Text fontSize='xl' textAlign='center'>
            No courses registered. Add some to get started!
          </Text>
        </Center>
      </Box>
      <Box>
        <Center>
          <Button
            colorScheme='emerald'
            size='lg'
            onPress={() => {
              navigation.navigate("Settings", {
                openAbout: false,
                openCourses: true,
                openCreds: false,
                openNotifs: false,
              });
            }}
          >
            Add Courses
          </Button>
        </Center>
      </Box>
    </VStack>
  );
};

export default NoCourseHomePage;
