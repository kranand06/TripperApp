

import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { db, auth } from "../../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import MyTripCard from "../components/MyTripCard";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "expo-router";

export default function MyTrip() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);


useFocusEffect(
  useCallback(() => {
    getTrips();
  }, [])
);

const getTrips = async () => {
  try {
    const user = auth.currentUser;

    if (!user || !user.email) {
      console.log("No user logged in");
      setTrips([]);
      return;
    }

    const q = query(
      collection(db, "tripper"),
      where("userMail", "==", user.email)
    );

    const querySnapshot = await getDocs(q);

    // ✅ collect all data first
    const data = querySnapshot.docs.map((doc) => doc.data());

    // ✅ sort descending (latest first)
    const sortedData = data.sort((a, b) => Number(b.id) - Number(a.id));

    setTrips(sortedData);

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