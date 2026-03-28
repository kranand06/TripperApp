import React, { use, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Day from "./Day";

function Itinerary({ data }) {

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Places to Visit 🌉
      </Text>

      <View style={styles.list}>
        {data?.length > 0
          ? data.map((i, index) => (
              <Day key={index} day={i} />
            ))
          : [1, 2, 3].map((item) => (
              <View key={item} style={styles.skeleton} />
            ))}
      </View>
    </View>
  );
}

export default Itinerary;

const styles = StyleSheet.create({
  container: {
    marginTop: 20, // mt-5
    marginBottom: 48, // mb-24
  },

  heading: {
    fontWeight: "600",
    fontSize: 30, // text-2xl
    marginTop: 12, // mb-6
  },

  list: {
    flexDirection: "column", // grid-cols-1
  },

  skeleton: {
    height: 160, // h-40
    width: "100%",
    backgroundColor: "#e2e8f0", // bg-slate-200
    padding: 20,
    borderRadius: 12, // rounded-xl
    marginBottom: 24, // gap-6
  },
});