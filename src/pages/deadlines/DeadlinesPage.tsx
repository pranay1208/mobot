import React from "react";
import { Box } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";
import { CalendarList } from "react-native-calendars";
import { useAppSelector } from "../../redux";
import { isAssignment } from "../../utils/course";

type Props = DrawerScreenProps<RootDrawerParamList, "Deadlines">;

const DeadlinePage = ({ navigation }: Props) => {
  const modules = useAppSelector((state) => state.modules);
  const courses = useAppSelector((state) => state.courses);
  const deadlines = modules.filter((mod) => isAssignment(mod.type));
  // const data: CourseCardProps[] = [
  //   {
  //     courseTitle: "STAT1603: Introduction to Statistics",
  //     courseAlerts: 5,
  //     numberAssignments: 4,
  //     numberQuizzes: 1,
  //     numberResources: 33,
  //     totalModules: 42,
  //     completedModules: 35,
  //   },
  // ];

  const vacation = {key: 'vacation', color: 'red'};
  const massage = {key: 'massage', color: 'blue'};
  const workout = {key: 'workout', color: 'green'};
  
  return (
    <Box flex='1'>
      <CalendarList
        onDayPress={day => {
          console.log('selected day', day);
        }}
        markingType={'multi-dot'}
        markedDates={{
          '2022-01-04': {dots: [vacation, massage, workout]},
          '2022-01-03': {dots: [massage, workout]}
        }}
      />
    </Box>
  );
};

export default DeadlinePage;
