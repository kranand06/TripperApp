import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { auth } from "../../services/firebase";
import { updateProfile, updatePassword, signOut } from "firebase/auth";
import ScreenWrapper from "../components/ScreenWrapper";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const user = auth.currentUser;
  const router = useRouter();

  const [name, setName] = useState(user?.displayName || "");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const avatarName = user?.displayName || user?.email?.split("@")[0];

  const handleUpdateName = async () => {
    if (!name) {
      Toast.show({ type: "error", text1: "Name cannot be empty", position: "bottom" });
      return;
    }

    try {
      setLoading(true);
      await updateProfile(user, { displayName: name });

      Toast.show({
        type: "success",
        text1: "Name updated ✅",
        position: "bottom",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.message,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!password) {
      Toast.show({ type: "error", text1: "Enter new password", position: "bottom" });
      return;
    }

    try {
      setLoading(true);
      await updatePassword(user, password);

      Toast.show({
        type: "success",
        text1: "Password updated 🔐",
        position: "bottom",
      });

      setPassword("");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.message,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScreenWrapper scroll>
      <View style={styles.container}>
        {/* 👤 Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${avatarName}&background=f97316&color=fff&size=256`,
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>{user?.displayName || "User"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* ✏️ Update Name */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Profile</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Update your name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* 🔐 Password */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Security</Text>

          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter new password"
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? "eye-off" : "eye"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Change Password</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* 🚀 Actions */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/MyTrip")}
          >
            <Text style={styles.secondaryText}>View My Trips ✈️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Toast />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  profileCard: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  email: {
    color: "#64748b",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#f8fafc",
    marginBottom: 10,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f8fafc",
    marginBottom: 10,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
  },

  button: {
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#f97316",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  secondaryText: {
    color: "#f97316",
    fontWeight: "600",
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});