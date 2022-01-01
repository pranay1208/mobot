import React, { useState } from "react";
import { Box, Card, CardItem } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { TouchableOpacity } from "react-native-gesture-handler";
import { typography } from "native-base/lib/typescript/theme/styled-system";
import { View, Text } from "react-native";
import { useAppSelector } from "../../redux";
import { isAssignment } from "../../utils/course";

type Props = DrawerScreenProps<RootDrawerParamList, "Deadlines">;

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const DeadlinePage = ({ navigation }: Props) => {
  // const modules = useAppSelector((state) => state.modules);
  // const courses = useAppSelector((state) => state.courses);
  // const deadlines = modules.filter((mod) => isAssignment(mod.type));
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
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    // const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Card>
          <Box>
            <Text>{item.name}</Text>
          </Box>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Box flex='1'>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2021-12-28"}
        showClosingKnob={true}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default DeadlinePage;
