import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import { LocationContext } from "../../(tabs)/viewtrip/[tripId]";
import GetPhoto from "../../../services/getPhoto";

function HotelsCard({ hotel }) {
  const value = useContext(LocationContext);

  const [imageurl, setimageurl] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      const url = await GetPhoto(hotel.hotelName);
      setimageurl(url);
    };
    fetchImage();
  }, [hotel]);

  const handlePress = () => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      hotel.hotelName +
      " " +
      value.location;

    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageurl }}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            {hotel.hotelName}
          </Text>

          <Text style={styles.address}>
            <Text style={styles.icon}>📍 </Text>
            {hotel.hotelAddress}
          </Text>

          <Text style={styles.text}>
            💵 {hotel.price}
          </Text>

          <Text style={styles.text}>
            ⭐️ {hotel.rating} Stars
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default HotelsCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 12,
  },

  content: {
    padding: 2,
  },

  title: {
    fontWeight: "500",
    fontSize: 18,
    paddingTop: 8,
  },

  address: {
    fontSize: 14,
    color: "#6b7280",
    paddingTop: 6,
  },

  icon: {
    fontSize: 16,
     paddingTop: 4,
  },

  text: {
    fontSize: 16,
     paddingTop: 4,
  },
});