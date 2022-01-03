import React from "react";
import { Box, Text, Center, ScrollView } from "native-base";
import { DeadlineRouterParamList } from "../../interfaces/navigatorInterfaces";
import { Calendar } from "react-native-calendars";
import { useAppSelector } from "../../redux";
import { isAssignment } from "../../utils/course";
import { Ionicons } from "@expo/vector-icons";
import DeadlineIndicator from "../../components/deadlines/DeadlineIndicator";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<DeadlineRouterParamList, "Overview">;

interface MarkedDate {
  selected?: boolean;
  dots: Dot[];
}

interface Dot {
  key: string;
  color: string;
}

const getFormattedDate = (dateString?: string): string => {
  let dateObj = dateString ? new Date(dateString) : new Date();
  return dateObj.toISOString().split("T")[0];
};

const getHumanReadableDate = (dateString: string): string => {
  const semiReadable = new Date(dateString).toDateString();
  const firstSpace = semiReadable.indexOf(" ");
  return (
    semiReadable.slice(0, firstSpace) + "," + semiReadable.slice(firstSpace)
  );
};

const DeadlinePage = ({ navigation }: Props) => {
  const modules = useAppSelector((state) => state.modules);
  const courses = useAppSelector((state) => state.courses);
  const deadlines = modules.filter((mod) => isAssignment(mod.type));

  const [selectedDate, setSelectedDate] = React.useState(getFormattedDate());

  const courseUrlToColors: Record<string, string> = {};
  const courseUrlToNames: Record<string, string> = {};
  for (let i = 0; i < courses.length; i++) {
    courseUrlToColors[courses[i].courseUrl] = courses[i].courseColor;
    courseUrlToNames[courses[i].courseUrl] = courses[i].courseName;
  }

  const dates: Record<string, MarkedDate> = {
    [selectedDate]: { dots: [], selected: true },
  };
  for (let i = 0; i < deadlines.length; i++) {
    const dueDate = deadlines[i].dueDate;
    if (
      dueDate !== null &&
      !deadlines[i].removedFromMoodle &&
      !deadlines[i].userMarkedDeleted
    ) {
      var formattedDueDate = getFormattedDate(dueDate);
      if (!(formattedDueDate in dates)) {
        dates[formattedDueDate] = { dots: [] };
      }
      dates[formattedDueDate].dots.push({
        key: deadlines[i].resourceUrl,
        color: courseUrlToColors[deadlines[i].courseUrl],
      });
    }
  }

  const displayedDeadlines = deadlines.filter(
    (ddl) =>
      ddl.dueDate !== null &&
      selectedDate === getFormattedDate(ddl.dueDate) &&
      !ddl.userMarkedDeleted &&
      !ddl.removedFromMoodle
  );

  return (
    <Box flex='1'>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markingType={"multi-dot"}
        markedDates={{ ...dates }}
        theme={{
          dotStyle: { width: 8, height: 8 },
        }}
        renderArrow={(direction) => {
          if (direction === "left") {
            return <Ionicons name='chevron-back' size={24} />;
          } else {
            return <Ionicons name='chevron-forward' size={24} />;
          }
        }}
      />
      <ScrollView>
        <Box>
          <Text fontSize='xl' fontWeight='semibold' paddingY='2' paddingX='3'>
            {getHumanReadableDate(selectedDate)}
          </Text>
          {displayedDeadlines.map((ddl) => (
            <DeadlineIndicator
              key={ddl.resourceUrl}
              name={ddl.name}
              courseName={courseUrlToNames[ddl.courseUrl]}
              onClickAction={() =>
                navigation.push("Module", {
                  courseName: courseUrlToNames[ddl.courseUrl],
                  resourceName: ddl.name,
                  resourceUrl: ddl.resourceUrl,
                })
              }
              backgroundColor={courseUrlToColors[ddl.courseUrl]}
            />
          ))}
          {displayedDeadlines.length === 0 && (
            <Center>
              <Text fontSize='xl' paddingTop='15'>
                No deadlines!
              </Text>
            </Center>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default DeadlinePage;
