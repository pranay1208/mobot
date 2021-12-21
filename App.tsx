import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import MainCoursePage from "./src/pages/courses/MainCoursePage";

import { reduxStore, useAppDispatch, useAppSelector } from "./src/redux";
import { decrement, increment } from "./src/redux/actions/testActions";

//Edit this to add navigators and other content into the application
function AppContent() {
  const counter = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();

  return (
    <NativeBaseProvider>
      <MainCoursePage />
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
