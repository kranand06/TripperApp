import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-toast-message";

export default function TabLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fb923c",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Create Trip */}
      <Tabs.Screen
        name="CreateTrip"
        options={{
          title: "Create Trip",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* My Trips */}
      <Tabs.Screen
        name="MyTrip"
        options={{
          title: "My Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      {/* 👇 hide this */}
      <Tabs.Screen
        name="viewtrip/[tripId]"
        options={{
          href: null, // ✅ hides from tab bar
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null, // ✅ hides from tab bar
        }}
      />
    </Tabs>
    <Toast />
    </>
  );
}