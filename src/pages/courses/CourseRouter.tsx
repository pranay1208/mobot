import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CourseRouterParamList } from "../../interfaces/navigatorInterfaces";
import MainCoursePage from "./MainCoursePage";
import IndividualCoursePage from "./IndividualCoursePage";

const Stack = createStackNavigator<CourseRouterParamList>();

const CourseRouter = () => {
  return (
    <Stack.Navigator initialRouteName='Overview'>
      <Stack.Screen
        name='Overview'
        component={MainCoursePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Course'
        component={IndividualCoursePage}
        // initialParams={{ courseName: "Dummy", courseUrl: "Dummy" }}
        options={({ route }) => {
          return { title: route.params.courseName };
        }}
      />
    </Stack.Navigator>
  );
};

export default CourseRouter;