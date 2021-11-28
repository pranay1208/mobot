import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ScrapeBody } from "./src/interface";
import { MOODLE_PASSWORD, MOODLE_USERNAME, API_URL } from "./testCredz";

async function doScrape() {
  const params: ScrapeBody = {
    username: MOODLE_USERNAME as string,
    password: MOODLE_PASSWORD as string,
    courses: "https://moodle.hku.hk/course/view.php?id=88357",
  };
  try {
    console.log(JSON.stringify(params));
    const response = await axios.post(`${API_URL}/scrape`, params);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title='Scrape' onPress={doScrape} />
      <StatusBar style='auto' />
    </View>
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
