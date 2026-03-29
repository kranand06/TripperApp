import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth"; // ✅ add this

export default function Header() {
  const { user } = useAuth(); // ✅ get user
  const router = useRouter();
  const name = user?.displayName || user?.email?.split("@")[0];

  return (
    <View style={styles.container}>

      {/* ✅ Logo Image */}
      <Image
        source={require("../../assets/images/logoNavbar.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* ✅ Show ONLY if logged in */}
      {user && (
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          activeOpacity={0.7}
        >
          <Image
            source={{
uri: `https://ui-avatars.com/api/?name=${name}&background=fb923c&color=fff&size=128`            }}
            style={styles.profile}
          />
        </TouchableOpacity>
      )}
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
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3, // Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});