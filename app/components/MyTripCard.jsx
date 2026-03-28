import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import GetPhoto from "../../services/getPhoto";

export default function MyTripCard({ trip }) {
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    const url = await GetPhoto(trip.userInput.place);
    setImage(url);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/viewtrip/${trip.id}`)}
    >
      <Image
        source={{
          uri: image || "https://via.placeholder.com/400",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {trip.userInput.place}
        </Text>

        <Text style={styles.subtitle}>
          {trip.userInput.days} days • {trip.userInput.budget}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 12,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  subtitle: {
    color: "gray",
    marginTop: 4,
  },
});
