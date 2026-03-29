import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";

import { Budget, Traveller, AiPrompt } from "../../utils/helper";
import chatSession from "../../services/gemini";
import { auth, db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

import { useRouter } from "expo-router";

export default function CreateTrip() {
  const [formData, setFormData] = useState({ place: "", days: "", budget: "", traveller: "" });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInput = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.place || !formData.days || !formData.budget || !formData.traveller) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill all fields",
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);

      const prompt = AiPrompt
        .replace("{location}", formData.place)
        .replace("{days}", formData.days)
        .replace("{traveller}", formData.traveller)
        .replace("{budget}", formData.budget);
      const res = await chatSession.sendMessage(prompt);
      const result = JSON.parse(res.response.candidates[0].content.parts[0].text);
      await saveData(result);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to generate trip",
        position: "bottom",
      });
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (data) => {
    setLoading(true);

    try {
      const docId = Date.now().toString();
      const user = auth.currentUser;

      if (!user) {
        Toast.show({
          type: "error",
          text1: "Not Logged In",
          text2: "Please login first",
        });
        return;
      }
      const name = user.displayName || user.email.split("@")[0];
      const userData = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
       picture: `https://ui-avatars.com/api/?name=${name}&background=fb923c&color=fff`,
      };
      await setDoc(doc(db, "tripper", docId), {
        id: docId,
        tripInfo: data,
        userDetail: userData,
        // userId: user.uid,
        userInput: formData,
        userMail: user.email,
      });
      Toast.show({
        type: "success",
        text1: "Trip Created 🎉",
        text2: "Your itinerary is ready",
        position: "bottom",
      });
      setFormData({ place: "", days: "", budget: "", traveller: "" });
      router.push(`/viewtrip/${docId}`);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Save Failed",
        text2: "Could not save trip",
        position: "bottom",
      });
      console.log("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper scroll>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

        {/* HEADER */}
        <Text style={styles.title}>
          Plan Your Perfect Trip ✈️
        </Text>
        <Text style={styles.subtitle}>
          Tell us your preferences and we’ll create a personalized itinerary.
        </Text>

        {/* DESTINATION */}
        <View style={styles.section}>
          <Text style={styles.label}>Destination 🌍</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-outline" size={18} color="gray" />
            <TextInput
              placeholder="Where do you want to go?"
              style={styles.input}
              value={formData.place}
              onChangeText={(text) => handleInput("place", text)}
            />
          </View>
        </View>

        {/* DAYS */}
        <View style={styles.section}>
          <Text style={styles.label}>Trip Duration 🗓️</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="calendar-outline" size={18} color="gray" />
            <TextInput
              placeholder="Number of days"
              keyboardType="numeric"
              style={styles.input}
              value={formData.days}
              onChangeText={(text) => handleInput("days", text)}
            />
          </View>
        </View>

        {/* BUDGET */}
        <View style={styles.section}>
          <Text style={styles.label}>Budget 💰</Text>
          <View style={styles.grid}>
            {Budget.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  formData.budget === item.title && styles.selectedCard,
                ]}
                onPress={() => handleInput("budget", item.title)}
              >
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* TRAVELLER */}
        <View style={styles.section}>
          <Text style={styles.label}>Who are you traveling with? 👨‍👩‍👧</Text>
          <View style={styles.grid}>
            {Traveller.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  formData.traveller === item.title && styles.selectedCard,
                ]}
                onPress={() => handleInput("traveller", item.title)}
              >
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Generate Trip</Text>
              <Ionicons name="airplane" size={18} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 8,
    marginBottom: 25,
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 8,
  },
  input: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  selectedCard: {
    borderColor: "#fb923c",
    backgroundColor: "#fff7ed",
  },
  icon: {
    fontSize: 26,
  },
  cardTitle: {
    fontWeight: "700",
    marginTop: 6,
  },
  cardDesc: {
    fontSize: 12,
    color: "#6b7280",
  },
  button: {
    backgroundColor: "#fb923c",
    padding: 16,
    borderRadius: 14,
    marginTop: 30,
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
