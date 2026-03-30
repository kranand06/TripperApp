import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const scrollRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;

  // 🔥 auto scroll
  const handleFocus = (event) => {
  event.target.measure((x, y, width, height, pageX, pageY) => {
    scrollRef.current?.scrollTo({
      y: pageY - screenHeight * 0.35, // 🔥 dynamic spacing
      animated: true,
    });
  });
};

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields",
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      Toast.show({
        type: "success",
        text1: "Welcome back 👋",
        position: "bottom",
      });

      router.replace("/");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Invalid email or password",
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper scroll scrollRef={scrollRef}>
      <View style={styles.container}>
        {/* 🎬 Lottie */}
        <LottieView
          source={require("../../assets/animation/signup.json")}
          autoPlay
          loop
          style={styles.lottie}
        />

        {/* Header */}
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your journey with Tripper.
        </Text>

        {/* Card */}
        <View style={styles.card}>
          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={handleFocus}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={secure}
              style={styles.passwordInput}
              onFocus={handleFocus}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? "eye-off" : "eye"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <Text
            style={styles.forgot}
            onPress={() => router.push("/forgot-password")}
          >
            Forgot Password?
          </Text>

          {/* Button */}
          <TouchableOpacity
            style={[
              styles.button,
              loading && { opacity: 0.7 },
            ]}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text
          onPress={() => router.push("/sign-up")}
          style={styles.link}
        >
          Don’t have an account? Sign Up
        </Text>
      </View>

      <Toast />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },

  lottie: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  label: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#f8fafc",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f8fafc",
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
  },

  forgot: {
    textAlign: "right",
    marginTop: 8,
    color: "#f97316",
    fontSize: 13,
  },

  button: {
    backgroundColor: "#0f172a",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#f97316",
    fontWeight: "500",
  },
});