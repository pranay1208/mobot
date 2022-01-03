import React from "react";
import { Box } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";
import { CalendarList } from "react-native-calendars";
import { useAppSelector } from "../../redux";
import { isAssignment } from "../../utils/course";

type Props = DrawerScreenProps<RootDrawerParamList, "Deadlines">;

interface Dot {
  key: string,
  color: string
}

const DeadlinePage = ({ navigation }: Props) => {
  const modules = useAppSelector((state) => state.modules);
  const courses = useAppSelector((state) => state.courses);
  const deadlines = modules.filter((mod) => isAssignment(mod.type));

  const courseUrlToColors: Record<string, string> = {}
  for(let i=0; i<courses.length; i++) {
    courseUrlToColors[courses[i].courseUrl] = courses[i].courseColor
  }

  const dates: Record<string, {dots: Dot[]}> = {}
  for(let i=0; i<deadlines.length; i++) {
    if ((deadlines[i].dueDate !== null) && (!deadlines[i].removedFromMoodle) && (!deadlines[i].userMarkedDeleted)) {
      var formattedDueDate = new Date(deadlines[i].dueDate).toISOString().split('T')[0]
      dates[formattedDueDate] = {dots: []}
      dates[formattedDueDate].dots.push({key: deadlines[i].courseUrl, color: courseUrlToColors[deadlines[i].courseUrl]})
    }
  }

  return (
    <Box flex='1'>
      <CalendarList
        onDayPress={day => {
          console.log('selected day', day);
        }}
        pastScrollRange={0}
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
