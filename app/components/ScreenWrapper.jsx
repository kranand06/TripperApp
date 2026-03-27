import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import Header from "./Header";

export default function ScreenWrapper({
  children,
  scroll = false,
  showHeader = true,
}) {
  return (
    <SafeAreaView 
  style={{ flex: 1, backgroundColor: "#fff" }}
  edges={["top"]}
>
  {showHeader && <Header />}

  {scroll ? (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {children}
    </ScrollView>
  ) : (
    <View style={{ flex: 1, padding: 20 }}>
      {children}
    </View>
  )}
</SafeAreaView>
  );
}