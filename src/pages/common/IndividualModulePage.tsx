import React from "react";
import { Button, HStack, VStack, Text, Box, Link } from "native-base";
import { BACKGROUND_WHITE } from "../../colours.styles";
import { StackScreenProps } from "@react-navigation/stack";
import {
  CourseRouterParamList,
  DeadlineRouterParamList,
} from "../../interfaces/navigatorInterfaces";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  toggleCompletionAction,
  toggleRemovalAction,
} from "../../redux/actions/moduleActions";

type Props =
  | StackScreenProps<CourseRouterParamList, "Module">
  | StackScreenProps<DeadlineRouterParamList, "Module">;

const IndividualModulePage = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const resourceUrl = route.params.resourceUrl;
  const resource = useAppSelector((state) =>
    state.modules.find((mod) => mod.resourceUrl === resourceUrl)
  );

  if (resource === undefined) {
    navigation.pop();
    return (
      <Text>
        This is an error page. Could not find any module with given
        url...redirecting back
      </Text>
    );
  }

  const textFontSize = "lg";
  return (
    <VStack
      size={4}
      paddingX='5'
      paddingY='3'
      backgroundColor={BACKGROUND_WHITE}
    >
      <HStack space={2} marginY='1'>
        <Text fontSize={textFontSize} fontWeight='bold'>
          Name:
        </Text>
        <Text fontSize={textFontSize} fontWeight='semibold' flex='1'>
          {route.params.resourceName}
        </Text>
      </HStack>
      <HStack space={2} marginY='1'>
        <Text fontSize={textFontSize} fontWeight='bold'>
          Course:
        </Text>
        <Text fontSize={textFontSize} fontWeight='semibold' flex='1'>
          {route.params.courseName}
        </Text>
      </HStack>
      <HStack space={2} marginY='1'>
        <Text fontSize={textFontSize} fontWeight='bold'>
          Section:
        </Text>
        <Text fontSize={textFontSize} fontWeight='semibold' flex='1'>
          {resource.sectionTitle}
        </Text>
      </HStack>
      <HStack space={2} marginY='1'>
        <Text fontSize={textFontSize} fontWeight='bold'>
          Due Date:
        </Text>
        <Text fontSize={textFontSize} fontWeight='semibold' flex='1'>
          {resource.dueDate ?? "Not Found"}
        </Text>
      </HStack>
      <HStack space={2} marginY='1'>
        <Text fontSize={textFontSize} fontWeight='bold'>
          Status:
        </Text>
        <Text fontSize={textFontSize} fontWeight='semibold' flex='1'>
          {resource.userMarkedCompleted ? "Complete" : "Incomplete"}
        </Text>
        <Button
          variant='subtle'
          colorScheme='emerald'
          onPress={() =>
            dispatch(toggleCompletionAction(route.params.resourceUrl))
          }
        >
          Toggle
        </Button>
      </HStack>
      {resource.comments !== null && (
        <Box marginY='1'>
          <Text fontSize={textFontSize} fontWeight='bold'>
            Comments:
          </Text>
          <Text fontSize={textFontSize} fontWeight='semibold' paddingLeft='1'>
            {resource.comments}
          </Text>
        </Box>
      )}
      {resource.removedFromMoodle || (
        <Link isExternal href={resourceUrl} marginY='2'>
          <Button colorScheme='emerald' width='100%' disabled={true}>
            View in Moodle
          </Button>
        </Link>
      )}
      <Button
        colorScheme='danger'
        marginY='2'
        onPress={() => dispatch(toggleRemovalAction(route.params.resourceUrl))}
      >
        {(resource.userMarkedDeleted ? "Restore" : "Hide") + " this Course"}
      </Button>
    </VStack>
  );
};

export default IndividualModulePage;
