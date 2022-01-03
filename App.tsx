import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, reduxStore } from "./src/redux";
import { NavigationContainer } from "@react-navigation/native";
import { RootDrawerParamList } from "./src/interfaces/navigatorInterfaces";
import NotificationListPage from "./src/pages/notifications/NotificationListPage";
import AppDrawer from "./src/components/AppDrawer";
import { PRIMARY_BLUE } from "./src/colours.styles";
import SettingsPage from "./src/pages/settings/SettingsPage";
import DeadlinesPage from "./src/pages/deadlines/DeadlinesPage";
import HomePage from "./src/pages/home/HomePage";
import CourseRouter from "./src/pages/courses/CourseRouter";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

//Edit this to add navigators and other content into the application
function AppContent() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName='Home'
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
            name='Home'
            component={HomePage}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='home' color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name='Courses'
            component={CourseRouter}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='book' color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name='Deadlines'
            component={DeadlinesPage}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='alarm' color={color} size={size} />
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
            initialParams={{
              openAbout: false,
              openCourses: false,
              openCreds: false,
              openNotifs: false,
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
      <PersistGate persistor={persistor} loading={null}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}
