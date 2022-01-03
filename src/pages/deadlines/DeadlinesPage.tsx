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

  const courseUrlToColors = {}
  for(let i=0; i<courses.length; i++) {
    courseUrlToColors[courses[i].courseUrl] = courses[i].courseColor
  }

  const dates = {}
  for(let i=0; i<deadlines.length; i++) {
    var formattedDueDate = new Date(deadlines[i].dueDate).toISOString().split('T')[0]
    dates[formattedDueDate] = {dots: []}
    dates[formattedDueDate].dots.push({key: deadlines[i].courseUrl, color: courseUrlToColors[deadlines[i].courseUrl]})
  }

  return (
    <Box flex='1'>
      <CalendarList
        onDayPress={day => {
          console.log('selected day', day);
        }}
        pastScrollRange={5}
        futureScrollRange={5}
        markingType={'multi-dot'}
        markedDates={dates}
        theme={{
          dotStyle: {width: 8, height: 8},
        }}
      />
    </Box>
  );
};

export default DeadlinePage;
