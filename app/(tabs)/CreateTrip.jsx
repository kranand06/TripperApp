import { View, Text } from "react-native";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Create() {
  return (
    <ScreenWrapper>
      <Header />
      <Text style={{ padding: 20 }}>Create Trip</Text>
    </ScreenWrapper>
  );
}