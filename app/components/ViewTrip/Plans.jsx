import { useContext, useEffect, useState } from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LocationContext } from "../../(tabs)/viewtrip/[tripId]";
import GetPhoto from "../../../services/getPhoto";

function Plans({ plan }) {
  const [imageurl, setimageurl] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      const url = await GetPhoto(plan.placeName);
      setimageurl(url);
    };
    fetchImage();
  }, [plan]);

  const value = useContext(LocationContext);

  const handlePress = () => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      plan.placeName +
      " " +
      value.location;

    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageurl }}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            {plan.placeName}
          </Text>

          <Text style={styles.desc}>
            {plan.placeDetails}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.icon}>🎟️ </Text>
            Tickets: {plan.ticket}
          </Text>

          <Text style={styles.text}>
            Ratings: {plan.ratings} ⭐️
          </Text>

          <Text style={styles.desc}>
            <Text style={styles.icon}>⏱️ </Text>
            {plan.timeToTravel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Plans;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // flex-col (mobile first)
    borderRadius: 16,
    paddingVertical: 32,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },

  content: {
    marginTop: 16,
  },

  title: {
    marginTop: 6,
    fontWeight: "500",
    fontSize: 18,
  },

  desc: {
    marginTop: 6,
    color: "#6b7280",
  },

  text: {
    marginTop: 5,
    fontSize: 14,
  },

  icon: {
    fontSize: 18,
  },
});