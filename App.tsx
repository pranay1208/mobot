import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import MainCoursePage from "./src/pages/courses/MainCoursePage";
import { reduxStore, useAppDispatch, useAppSelector } from "./src/redux";
import { decrement, increment } from "./src/redux/actions/testActions";
import { NavigationContainer } from "@react-navigation/native";
import { RootDrawerParamList } from "./src/interfaces/navigatorInterfaces";
import NotificationListPage from "./src/pages/notifications/NotificationListPage";
import AppDrawer from "./src/components/AppDrawer";
import { PRIMARY_BLUE } from "./src/colours.styles";
import SettingsPage from "./src/pages/settings/SettingsPage";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

//Edit this to add navigators and other content into the application
function AppContent() {
  const counter = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName='Settings'
          drawerContent={(props) => <AppDrawer {...props} />}
          screenOptions={{
            headerTintColor: "#FFF",
            drawerInactiveTintColor: "#000",
            drawerActiveTintColor: PRIMARY_BLUE,
            headerStyle: {
              backgroundColor: PRIMARY_BLUE,
            },
          }}
        >
          <Drawer.Screen
            name='Courses'
            component={MainCoursePage}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='book' color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name='Notifications'
            component={NotificationListPage}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='notifications' color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name='Settings'
            component={SettingsPage}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='settings' color={color} size={size} />
              ),
            }}
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
