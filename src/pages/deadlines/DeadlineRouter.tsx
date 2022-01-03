import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DeadlineRouterParamList } from "../../interfaces/navigatorInterfaces";
import IndividualModulePage from "../courses/IndividualModulePage";
import DeadlinePage from "./DeadlinesPage";

const Stack = createStackNavigator<DeadlineRouterParamList>();

const DeadlineRouter = () => {
  return (
    <Stack.Navigator initialRouteName='Overview'>
      <Stack.Screen
        name='Overview'
        component={DeadlinePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Module'
        component={IndividualModulePage}
        options={({ route }) => {
          return { title: route.params.resourceName };
        }}
      />
    </Stack.Navigator>
  );
};

export default DeadlineRouter;
