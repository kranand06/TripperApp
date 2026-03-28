import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Plans from "./Plans";

function Day({ day }) {
  return (
    <View>
      <Text style={styles.heading}>
        Day {day.day}
      </Text>

      <View style={styles.list}>
        {day?.plan.length > 0 ? (
          day?.plan.map((i, index) => (
            <Plans key={index} plan={i} />
          ))
        ) : (
          [1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.skeleton} />
          ))
        )}
      </View>
    </View>
  );
}

export default Day;

const styles = StyleSheet.create({
  heading: {
    fontWeight: "700",
    fontSize: 40, // text-xl
    marginTop: 30, // mt-12
  },

  list: {
    flexDirection: "column",
    paddingVertical: 16, // grid-cols-1
  },

  skeleton: {
    height: 320, // h-80
    width: "100%",
    backgroundColor: "#e2e8f0", // bg-slate-200
    padding: 20,
    borderRadius: 12, // rounded-xl
    marginBottom: 24, // gap-6
  },
});