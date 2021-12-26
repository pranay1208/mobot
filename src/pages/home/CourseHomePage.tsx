import { VStack, Box, Text, Fab } from "native-base";
import React from "react";
import { NOTIF_GREEN, NOTIF_YELLOW, PRIMARY_BLUE } from "../../colours.styles";
import OverviewText from "../../components/home/OverviewText";
import { Ionicons } from "@expo/vector-icons";
import CourseUpdateTile from "../../components/home/CourseUpdateTile";

const CourseHomePage = () => {
  const [expandIndex, setExpandIndex] = React.useState(1);
  const courseTileList = [
    {
      name: "STAT1603: Introduction to Statistics",
      p: 75,
    },
    {
      name: "GEOG1012: Urbanization in Globalizing World",
      p: 35,
    },
    {
      name: "COMP3258: Functional Programming",
      p: 45,
    },
    {
      name: "COMP4801: FYP",
      p: 95,
    },
  ];
  return (
    <VStack safeAreaTop>
      <Fab
        borderRadius='full'
        colorScheme='emerald'
        icon={<Ionicons name='refresh' size={24} color='white' />}
        label={
          <Text fontWeight='semibold' fontSize='xl' color='white'>
            Refresh
          </Text>
        }
        onPress={() =>
          console.log(
            "Opening loading modal, making network req, projecting..."
          )
        }
      />
      <Box paddingX='4'>
        <Box>
          <Text fontSize='2xl' fontWeight='semibold'>
            Last Update:
          </Text>
        </Box>
        <Box paddingLeft='2'>
          <Box marginBottom='5'>
            <Text fontSize='lg' fontWeight='semibold'>
              Last updated at 23/10/2021 3:17PM
            </Text>
          </Box>
          <Box>
            <OverviewText
              text='3 modules added'
              iconColor={PRIMARY_BLUE}
              iconName='add-circle'
            />
            <OverviewText
              text='2 modules modified'
              iconColor={NOTIF_YELLOW}
              iconName='pencil'
            />
            <OverviewText
              text='8 modules completed'
              iconColor={NOTIF_GREEN}
              iconName='checkmark-circle'
            />
          </Box>
        </Box>
        <Box marginY='2'>
          <Text fontSize='2xl' fontWeight='semibold'>
            Updates:
          </Text>
        </Box>
      </Box>
      {courseTileList.map((val, index) => (
        <CourseUpdateTile
          key={index}
          myIndex={index}
          selIndex={expandIndex}
          action={(i: number) => setExpandIndex(i)}
          name={val.name}
          progress={val.p}
        />
      ))}
    </VStack>
  );
};

export default CourseHomePage;
