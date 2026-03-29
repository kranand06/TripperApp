import { View, Text, StyleSheet, Image } from "react-native";
import GetPhoto from "../../../services/getPhoto";
import { useEffect, useState } from "react";

export default function Info({ Data }) {
  const [imageurl, setimageurl] = useState(null);

  useEffect(() => {
    if (Data?.userInput?.place) {
      setimageurl(null); // Reset image URL when place changes
      fetchImage();
    }
  }, [Data]);

  const fetchImage = async () => {
    try {
      const url = await GetPhoto(Data.userInput.place);
      setimageurl(url);
    } catch (err) {
      console.log("Image fetch error:", err);
    }
  };
  return  (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={{
          uri: imageurl || "https://via.placeholder.com/400",
        }}
        style={styles.image}
      />

      {/* Content */}
      <View>
        <Text style={styles.title}>
          {Data?.userInput?.place}
        </Text>

        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>
            📅 {Data?.userInput?.days} Days
          </Text>

          <Text style={styles.badge}>
            💰 {Data?.userInput?.budget} Budget
          </Text>

          <Text style={styles.badge}>
            🧳 Travellers: {Data?.userInput?.traveller}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 24, // flex flex-col gap-6
  },

  image: {
    width: "100%",
    height: 260, // h-64 (approx)
    borderRadius: 12,
  },

  title: {
    fontSize: 40, // text-2xl
    fontWeight: "700",
    marginVertical: 16,
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  badge: {
    backgroundColor: "#e2e8f0", // bg-slate-200
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    fontSize: 14,
  },
});