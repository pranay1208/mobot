import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainCoursePage from "./src/pages/courses/MainCoursePage";
import { reduxStore, useAppDispatch, useAppSelector } from "./src/redux";
import { decrement, increment } from "./src/redux/actions/testActions";
import { NavigationContainer } from "@react-navigation/native";
import { RootDrawerParamList } from "./src/navigatorInterfaces";
import NotificationListPage from "./src/components/notifications/NotificationListPage";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

//Edit this to add navigators and other content into the application
function AppContent() {
  const counter = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Courses'>
          <Drawer.Screen name='Courses' component={MainCoursePage} />
          <Drawer.Screen
            name='Notifications'
            component={NotificationListPage}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default function App() {
  return (
    <Provider store={reduxStore}>
      <AppContent />
    </Provider>
  );
}
