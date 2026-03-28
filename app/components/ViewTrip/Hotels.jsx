import { View, Text, StyleSheet } from "react-native";
import HotelsCard from "./HotelCard";

export default function Hotels({ hotel }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Hotel Recommendations 🏩
      </Text>

      <View style={styles.list}>
        {hotel?.length > 0 ? (
          hotel?.map((i, index) => (
            <HotelsCard key={index} hotel={i} />
          ))
        ) : (
          [1, 2, 3].map((item) => (
            <View key={item} style={styles.skeleton} />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
  },

  heading: {
    fontWeight: "600",
    fontSize: 27,
    marginBottom: 24,
  },

  list: {
    flexDirection: "column",
    gap: 24,
  },

  skeleton: {
    height: 320,
    width: "100%",
    backgroundColor: "#e2e8f0",
    borderRadius: 12,
  },
});