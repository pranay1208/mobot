import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import { reduxStore, useAppDispatch, useAppSelector } from "./src/redux";
import { decrement, increment } from "./src/redux/actions/testActions";

//Edit this to add navigators and other content into the application
function AppContent() {
  const counter = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <View style={{ padding: "20px" }}>
        <Button title='-' onPress={() => dispatch(decrement())} />
        <Text style={{ paddingHorizontal: "20px" }}>Value: {counter}</Text>
        <Button title='+' onPress={() => dispatch(increment())} />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={reduxStore}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
