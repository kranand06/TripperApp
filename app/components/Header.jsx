import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      
      {/* ✅ Logo Image */}
      <Image
        source={require("../../assets/images/logoNavbar.png")} // Ensure this path is correct
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Profile Icon */}
      <TouchableOpacity>
        <Image
          source={{ uri: "https://i.pravatar.cc/40" }}
          style={styles.profile}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 170,   // adjust based on your logo
    height: 60,
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
});