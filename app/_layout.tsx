import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Firebase
import { auth, db } from "../config/firebase";
import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

// Contexts
import { LanguageProvider } from "../contexts/LanguageContext";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { OfflineProvider } from "../contexts/OfflineContext";
import { UserProvider } from "../contexts/UserContext";

// Colors
import { colors } from "../constants/colors";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const [user, setUser] = useState<User | null>(null);

  const [isVerified, setIsVerified] = useState(false);

  // Firebase check finished?
  const [authReady, setAuthReady] = useState(false);

  // Keep splash visible for a short period
  const [splashFinished, setSplashFinished] =
    useState(false);

  // =====================================================
  // SPLASH TIMER
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashFinished(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  // =====================================================
  // FIREBASE AUTH CHECK
  // =====================================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        try {
          // No logged-in user
          if (!currentUser) {
            setUser(null);
            setIsVerified(false);
            return;
          }

          // Read user from Firestore
          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const userSnap = await getDoc(userRef);

          // Firestore user doesn't exist
          if (!userSnap.exists()) {
            await signOut(auth);

            setUser(null);
            setIsVerified(false);

            return;
          }

          const userData = userSnap.data();

          // Account should already be verified
          if (userData.isVerified !== true) {
            await signOut(auth);

            setUser(null);
            setIsVerified(false);

            return;
          }

          // Everything OK
          setUser(currentUser);
          setIsVerified(true);
        } catch (error) {
          console.log(
            "ROOT AUTH CHECK ERROR:",
            error
          );

          setUser(null);
          setIsVerified(false);
        } finally {
          setAuthReady(true);
        }
      }
    );

    return unsubscribe;
  }, []);

  // =====================================================
  // ROUTING
  // =====================================================

  useEffect(() => {
    // Wait until Firebase check is complete
    if (!authReady) return;

    const firstSegment = segments[0];

    const isSplashScreen =
      firstSegment === undefined;

    const isAuthScreen =
      firstSegment === "auth";

    const isTabsScreen =
      firstSegment === "(tabs)";

    // ---------------------------------------------
    // Splash screen
    // ---------------------------------------------

    if (isSplashScreen) {
      if (!splashFinished) return;

      // Logged-in verified user
      if (user && isVerified) {
        router.replace("/(tabs)");
      } else {
        router.replace("/auth/signin");
      }

      return;
    }

    // ---------------------------------------------
    // Not logged in
    // ---------------------------------------------

    if (!user) {
      /*
        Allow:
        /auth/signin
        /auth/signup
        /auth/verify

        Because OTP verification happens BEFORE
        Firebase account creation.
      */

      if (!isAuthScreen) {
        router.replace("/auth/signin");
      }

      return;
    }

    // ---------------------------------------------
    // Logged in + verified
    // ---------------------------------------------

    if (user && isVerified) {
      // Logged-in users should not return to
      // Sign In / Sign Up / Verify screens.
      if (isAuthScreen) {
        router.replace("/(tabs)");
      }

      return;
    }

  }, [
    authReady,
    splashFinished,
    user,
    isVerified,
    segments,
    router,
  ]);

  // =====================================================
  // APP
  // =====================================================

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <OfflineProvider>
          <FavoritesProvider>
            <UserProvider>

              <StatusBar
                style="dark"
                translucent
              />

              <Stack
                screenOptions={{
                  headerShown: false,

                  contentStyle: {
                    backgroundColor:
                      colors.background ||
                      "#F7F9F8",
                  },

                  animation:
                    "slide_from_right",
                }}
              >
                {/* Splash */}
                <Stack.Screen
                  name="index"
                  options={{
                    animation: "fade",
                    gestureEnabled: false,
                  }}
                />

                {/* Sign In */}
                <Stack.Screen
                  name="auth/signin"
                  options={{
                    animation:
                      "fade_from_bottom",
                    gestureEnabled: false,
                  }}
                />

                {/* Sign Up */}
                <Stack.Screen
                  name="auth/signup"
                  options={{
                    animation:
                      "slide_from_right",
                    gestureEnabled: true,
                  }}
                />

                {/* Verify */}
                <Stack.Screen
                  name="auth/verify"
                  options={{
                    animation:
                      "slide_from_right",
                    gestureEnabled: false,
                  }}
                />

                {/* Main App */}
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    animation: "fade",
                    gestureEnabled: false,
                  }}
                />

                {/* District Details */}
                <Stack.Screen
                  name="district"
                  options={{
                    presentation: "card",
                    animation:
                      "slide_from_right",
                    gestureEnabled: true,
                  }}
                />

              </Stack>

            </UserProvider>
          </FavoritesProvider>
        </OfflineProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}