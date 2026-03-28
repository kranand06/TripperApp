import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Home() {
  const router = useRouter();

  return (
    <ScreenWrapper>

      <View style={styles.container}>
        {/* Heading */}
        <Text style={styles.heading}>
          <Text style={styles.highlight}>
            Discover Your Next Adventure with AI:
          </Text>{" "}
          Personalized Itineraries at Your Fingertips
        </Text>

        {/* Subtitle */}
        <Text style={styles.subText}>
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/CreateTrip")}
        >
          <Text style={styles.buttonText}>Get Started, It's Free</Text>
        </TouchableOpacity>

        {/* Image */}
        <Image
          source={require("../../assets/images/landing.png")} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30,
  },

  heading: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 40,
  },

  highlight: {
    color: "#fb923c", // orange-400
  },

  subText: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 26,
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 25,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  image: {
    width: "100%",
    height: 250,
    marginTop: 20,
  },
});