import { View, Text } from "react-native";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import { useEffect } from "react";

export default function MyTrip() {
  useEffect(() => {
    console.log("🚀 System Check: The app has loaded successfully!");
  }, []);
  return (
    <ScreenWrapper>
      <Header />
      <Text style={{ padding: 20 }}>My Trips</Text>
    </ScreenWrapper>
  );
}