import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ScrapeRequest } from "./src/interface";
import runScraper from "./src/scraper";
import { MOODLE_PASSWORD, MOODLE_USERNAME } from "./testCredz";

async function doScrape() {
  const params: ScrapeRequest = {
    username: MOODLE_USERNAME as string,
    password: MOODLE_PASSWORD as string,
    courses: ["https://moodle.hku.hk/course/view.php?id=88357"],
  };
  console.log(params);
  const response = await runScraper(params);
  console.log(response);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <br />
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
