import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import { updateProfile, updatePassword, signOut } from "firebase/auth";
import ScreenWrapper from "../components/ScreenWrapper";
import { useRouter } from "expo-router";

export default function Profile() {
  const user = auth.currentUser;
  const router = useRouter();

  const [name, setName] = useState(user?.displayName || "");
  const [password, setPassword] = useState("");

  const handleUpdateName = async () => {
    try {
      await updateProfile(user, { displayName: name });
      alert("Name updated");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(user, password);
      alert("Password updated");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const avatarName = user?.displayName || user?.email?.split("@")[0];

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        
        {/* Avatar */}
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${avatarName}&background=fb923c&color=fff&size=256`,
          }}
          style={styles.avatar}
        />

        {/* Name */}
        <Text style={styles.name}>{user?.displayName}</Text>

        {/* Email */}
        <Text style={styles.email}>{user?.email}</Text>

        {/* Update Name */}
        <TextInput
          placeholder="Update name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
          <Text style={styles.buttonText}>Update Name</Text>
        </TouchableOpacity>

        {/* Update Password */}
        <TextInput
          placeholder="New password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        {/* My Trips */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/(tabs)/mytrip")}
        >
          <Text style={styles.secondaryText}>My Trips</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  email: {
    color: "gray",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    backgroundColor: "#fff",
  },

  button: {
    width: "100%",
    backgroundColor: "#fb923c",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  secondaryButton: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#fb923c",
  },

  secondaryText: {
    color: "#fb923c",
    fontWeight: "600",
  },

  logoutButton: {
    width: "100%",
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});