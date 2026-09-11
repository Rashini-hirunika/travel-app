import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react-native";

import { router } from "expo-router";

import { colors } from "../../constants/colors";

import { useUser } from "../../contexts/UserContext";

import { auth, db } from "../../config/firebase";

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function SignIn() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { setUser } = useUser();

  /*
   * Send Welcome Email
   */
  const sendWelcomeEmail = async (
    userEmail: string,
    userName: string
  ) => {
    try {
      const serviceID =
        "service_0ipxvv5";

      /*
       * IMPORTANT:
       * Create a SECOND EmailJS template
       * for the Welcome Email.
       *
       * Replace this with your new template ID.
       */
      const welcomeTemplateID =
        "template_738fbrr";

      const publicKey =
        "6YdxrooOEVFEmMqJV";

      const templateParams = {
        email: userEmail,
        to_name: userName,
        message: `Welcome to Serendib, ${userName}! Your journey through Sri Lanka starts now.`,
        time: new Date().toLocaleString(),
      };

      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            service_id: serviceID,
            template_id: welcomeTemplateID,
            user_id: publicKey,
            template_params: templateParams,
          }),
        }
      );

      if (!response.ok) {
        console.log(
          "Welcome email failed:",
          await response.text()
        );
      }
    } catch (error) {
      console.log(
        "WELCOME EMAIL ERROR:",
        error
      );

      /*
       * Don't stop login if welcome email fails.
       */
    }
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        "Input Error",
        "Please provide both an email address and a password."
      );

      return;
    }

    setLoading(true);

    try {
      const cleanEmail =
        email.trim().toLowerCase();

      /*
       * Firebase Login
       */
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );

      const user =
        userCredential.user;

      /*
       * Get Firestore user document
       */
      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnap =
        await getDoc(userRef);

      /*
       * Check whether user exists
       */
      if (!userSnap.exists()) {
        await signOut(auth);

        Alert.alert(
          "Account Error",
          "User profile was not found."
        );

        return;
      }

      const userData =
        userSnap.data();

      /*
       * Check verification
       */
      if (userData.isVerified !== true) {
        await signOut(auth);

        Alert.alert(
          "Email Not Verified",
          "Please verify your email before signing in."
        );

        return;
      }

      const userName =
        userData.name ||
        user.displayName ||
        cleanEmail.split("@")[0];

      /*
       * Update UserContext
       */
      setUser({
        name: userName,
        email: user.email ?? "",
        profilePic:
          user.photoURL ||
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000",
      });

      /*
       * Send Welcome Email
       */
      await sendWelcomeEmail(
        user.email ?? cleanEmail,
        userName
      );

      /*
       * Login Success
       */
      Alert.alert(
        `Welcome to Serendib, ${userName}! 🌴`,
        "You have successfully signed in.",
        [
          {
            text: "Continue",
            onPress: () =>
              router.replace("/(tabs)"),
          },
        ]
      );
    } catch (error: any) {
      console.log(
        "SIGN IN ERROR:",
        error
      );

      let errorMessage =
        "An unexpected error occurred.";

      if (
        error.code ===
          "auth/user-not-found" ||
        error.code ===
          "auth/invalid-credential"
      ) {
        errorMessage =
          "Incorrect email or password. Please try again.";
      } else if (
        error.code === "auth/wrong-password"
      ) {
        errorMessage =
          "Incorrect password. Please try again.";
      } else if (
        error.code === "auth/invalid-email"
      ) {
        errorMessage =
          "Please enter a valid email address.";
      } else if (
        error.code ===
        "auth/too-many-requests"
      ) {
        errorMessage =
          "Too many attempts. Please try again later.";
      }

      Alert.alert(
        "Access Denied",
        errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContainer
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[
            colors.primary || "#1a5f3f",
            "#2e8b57",
          ]}
          style={styles.header}
        >
          <View style={styles.logoCircle}>
            <Image
              source={require("../../assets/image/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.appName}>
            Serendib
          </Text>

          <Text style={styles.tagline}>
            DISCOVER SRI LANKA
          </Text>

          <View
            style={styles.statsContainer}
          >
            <View style={styles.statItem}>
              <Text style={styles.statNum}>
                25
              </Text>

              <Text style={styles.statLab}>
                Districts
              </Text>
            </View>

            <View
              style={styles.statDivider}
            />

            <View style={styles.statItem}>
              <Text style={styles.statNum}>
                500+
              </Text>

              <Text style={styles.statLab}>
                Places
              </Text>
            </View>

            <View
              style={styles.statDivider}
            />

            <View style={styles.statItem}>
              <Text style={styles.statNum}>
                ∞
              </Text>

              <Text style={styles.statLab}>
                Memories
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text
            style={styles.welcomeTitle}
          >
            Welcome Back
          </Text>

          <Text
            style={styles.welcomeSub}
          >
            Sign in to continue your journey
          </Text>

          {/* Email */}
          <View
            style={styles.inputGroup}
          >
            <View
              style={styles.inputWrapper}
            >
              <Mail
                size={20}
                color="#666"
                style={styles.inputIcon}
              />

              <TextInput
                placeholder="Email address"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
            </View>

            {/* Password */}
            <View
              style={styles.inputWrapper}
            >
              <Lock
                size={20}
                color="#666"
                style={styles.inputIcon}
              />

              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={
                  !showPassword
                }
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={20}
                    color="#666"
                  />
                ) : (
                  <Eye
                    size={20}
                    color="#666"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() =>
              router.push(
                "/auth/forgot-password"
              )
            }
            disabled={loading}
          >
            <Text
              style={styles.forgotText}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[
              styles.signInButton,
              loading && {
                opacity: 0.8,
              },
            ]}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator
                color="#fff"
              />
            ) : (
              <>
                <Text
                  style={
                    styles.signInButtonText
                  }
                >
                  Sign In
                </Text>

                <ArrowRight
                  size={20}
                  color="#fff"
                />
              </>
            )}
          </TouchableOpacity>

          {/* Sign Up */}
          <View
            style={styles.footer}
          >
            <Text
              style={styles.footerText}
            >
              Don't have an account?{" "}
            </Text>

            <TouchableOpacity
              onPress={() =>
                router.push(
                  "/auth/signup"
                )
              }
              disabled={loading}
            >
              <Text
                style={styles.signUpLink}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flexGrow: 1,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor:
      "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 60,
    height: 60,
  },

  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  tagline: {
    fontSize: 12,
    color:
      "rgba(255,255,255,0.8)",
    letterSpacing: 2,
  },

  statsContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "100%",
    justifyContent: "center",
  },

  statItem: {
    alignItems: "center",
    paddingHorizontal: 15,
  },

  statNum: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8C00",
  },

  statLab: {
    fontSize: 10,
    color: "#fff",
  },

  statDivider: {
    width: 1,
    height: 20,
    backgroundColor:
      "rgba(255,255,255,0.3)",
    alignSelf: "center",
  },

  formContainer: {
    padding: 30,
    marginTop: -30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  welcomeSub: {
    fontSize: 14,
    color: "#666",
    marginBottom: 25,
  },

  inputGroup: {
    marginBottom: 10,
    width: "100%",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  forgotText: {
    textAlign: "right",
    color: "#1a5f3f",
    fontWeight: "600",
    marginBottom: 25,
  },

  signInButton: {
    backgroundColor: "#1a5f3f",
    borderRadius: 15,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  footerText: {
    color: "#666",
  },

  signUpLink: {
    color: "#1a5f3f",
    fontWeight: "bold",
  },
});