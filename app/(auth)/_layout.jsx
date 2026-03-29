import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import useAuth from "../../hooks/useAuth";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  // ✅ already logged in → go home
  if (user) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}