

import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { db } from "../../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import MyTripCard from "../components/MyTripCard";

export default function MyTrip() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    try {
      // 🔥 for now skip user filter (we’ll add auth later)
      const q = query(collection(db, "tripper"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => doc.data());
      setTrips(data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>My Trips</Text>
      <Text style={styles.subtitle}>All your trips saved here</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MyTripCard trip={item} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: "gray",
    marginBottom: 20,
  },
});