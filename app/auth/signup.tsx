import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react-native";

import { colors } from "../../constants/colors";

const EMAILJS_SERVICE_ID = "service_0ipxvv5";
const EMAILJS_TEMPLATE_ID = "template_1yi5dsm";
const EMAILJS_PUBLIC_KEY = "6YdxrooOEVFEmMqJV";

const PENDING_REGISTRATION = "pendingRegistration";

/* =========================
   Generate 6 Digit OTP
========================= */

const generateOTP = (): string => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  /* =========================
     SIGN UP
  ========================= */

  const handleSignup = async () => {
    const name = fullName.trim();

    const userEmail = email
      .trim()
      .toLowerCase();

    /* -------------------------
       Validation
    ------------------------- */

    if (!name) {
      Alert.alert(
        "Input Error",
        "Please enter your full name."
      );

      return;
    }

    if (!userEmail) {
      Alert.alert(
        "Input Error",
        "Please enter your email address."
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userEmail)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );

      return;
    }

    if (!password) {
      Alert.alert(
        "Input Error",
        "Please enter a password."
      );

      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (!confirmPassword) {
      Alert.alert(
        "Input Error",
        "Please confirm your password."
      );

      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Error",
        "Passwords do not match."
      );

      return;
    }

    setIsLoading(true);

    try {
      /* =========================
         Generate OTP
      ========================= */

      const otpPin = generateOTP();

      console.log(
        "Generated OTP:",
        otpPin
      );

      /* =========================
         EmailJS Template Data
      ========================= */

      const templateParams = {
        email: userEmail,
        to_name: name,
        passcode: otpPin,
        time: new Date().toLocaleTimeString(),
      };

      /* =========================
         Send Verification Email
      ========================= */

      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            service_id:
              EMAILJS_SERVICE_ID,

            template_id:
              EMAILJS_TEMPLATE_ID,

            user_id:
              EMAILJS_PUBLIC_KEY,

            template_params:
              templateParams,
          }),
        }
      );

      const responseText =
        await response.text();

      console.log(
        "EMAILJS STATUS:",
        response.status
      );

      console.log(
        "EMAILJS RESPONSE:",
        responseText
      );

      if (!response.ok) {
        throw new Error(
          `EmailJS Error ${response.status}: ${responseText}`
        );
      }

      /* =========================
         Save Temporary User Data
      ========================= */

      const pendingRegistration = {
        fullName: name,
        email: userEmail,
        password: password,
        verificationCode: otpPin,
        createdAt:
          new Date().toISOString(),
      };

      await AsyncStorage.setItem(
        PENDING_REGISTRATION,
        JSON.stringify(
          pendingRegistration
        )
      );

      console.log(
        "Temporary registration saved."
      );

      /* =========================
         Go To Verification Screen
      ========================= */

      router.push("/auth/verify");
    } catch (error: any) {
      console.log(
        "REGISTER ERROR:",
        error
      );

      Alert.alert(
        "Registration Error",
        error?.message ||
          "Failed to send verification email."
      );
    } finally {
      setIsLoading(false);
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
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
      >
        {/* =========================
            HEADER
        ========================= */}

        <LinearGradient
          colors={[
            colors.primary ||
              "#1a5f3f",
            "#2e8b57",
          ]}
          style={styles.header}
        >
          <View
            style={styles.logoCircle}
          >
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

          {/* Stats */}

          <View
            style={
              styles.statsContainer
            }
          >
            <View
              style={styles.statItem}
            >
              <Text
                style={styles.statNum}
              >
                25
              </Text>

              <Text
                style={styles.statLab}
              >
                Districts
              </Text>
            </View>

            <View
              style={
                styles.statDivider
              }
            />

            <View
              style={styles.statItem}
            >
              <Text
                style={styles.statNum}
              >
                500+
              </Text>

              <Text
                style={styles.statLab}
              >
                Places
              </Text>
            </View>

            <View
              style={
                styles.statDivider
              }
            />

            <View
              style={styles.statItem}
            >
              <Text
                style={styles.statNum}
              >
                ∞
              </Text>

              <Text
                style={styles.statLab}
              >
                Memories
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* =========================
            FORM
        ========================= */}

        <View
          style={styles.formContainer}
        >
          <Text
            style={styles.title}
          >
            Create Account
          </Text>

          <Text
            style={styles.subtitle}
          >
            Join Serendib and start
            your journey
          </Text>

          {/* =========================
              FULL NAME
          ========================= */}

          <View
            style={styles.inputWrapper}
          >
            <User
              size={20}
              color="#666"
              style={styles.inputIcon}
            />

            <TextInput
              placeholder="Full name"
              placeholderTextColor="#999"
              style={styles.input}
              value={fullName}
              onChangeText={
                setFullName
              }
              autoCapitalize="words"
              editable={!isLoading}
            />
          </View>

          {/* =========================
              EMAIL
          ========================= */}

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
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
            />
          </View>

          {/* =========================
              PASSWORD
          ========================= */}

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
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry={
                !showPassword
              }
              value={password}
              onChangeText={
                setPassword
              }
              editable={!isLoading}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }
              disabled={isLoading}
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

          {/* =========================
              CONFIRM PASSWORD
          ========================= */}

          <View
            style={styles.inputWrapper}
          >
            <Lock
              size={20}
              color="#666"
              style={styles.inputIcon}
            />

            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry={
                !showConfirmPassword
              }
              value={confirmPassword}
              onChangeText={
                setConfirmPassword
              }
              editable={!isLoading}
            />

            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              disabled={isLoading}
            >
              {showConfirmPassword ? (
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

          {/* =========================
              SIGN UP BUTTON
          ========================= */}

          <TouchableOpacity
            style={[
              styles.signUpButton,
              isLoading && {
                opacity: 0.8,
              },
            ]}
            onPress={handleSignup}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <>
                <ActivityIndicator
                  color="#fff"
                />

                <Text
                  style={
                    styles.signUpButtonText
                  }
                >
                  Sending PIN...
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={
                    styles.signUpButtonText
                  }
                >
                  Create Account
                </Text>

                <ArrowRight
                  size={20}
                  color="#fff"
                />
              </>
            )}
          </TouchableOpacity>

          {/* =========================
              VERIFICATION INFO
          ========================= */}

          <View
            style={
              styles.verificationBox
            }
          >
            <Text
              style={
                styles.verificationIcon
              }
            >
              🔐
            </Text>

            <Text
              style={
                styles.verificationText
              }
            >
              A 6-digit verification
              PIN will be sent to your
              email address.
            </Text>
          </View>

          {/* =========================
              SIGN IN LINK
          ========================= */}

          <View style={styles.footer}>
            <Text
              style={styles.footerText}
            >
              Already have an
              account?{" "}
            </Text>

            <TouchableOpacity
              onPress={() =>
                router.push(
                  "/auth/signin"
                )
              }
              disabled={isLoading}
            >
              <Text
                style={
                  styles.signInLink
                }
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* =========================
   STYLES
========================= */

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },

    scrollContainer: {
      flexGrow: 1,
    },

    /* Header */

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

    /* Statistics */

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

    /* Form */

    formContainer: {
      padding: 30,
      marginTop: -30,

      backgroundColor: "#fff",

      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,

      flex: 1,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
    },

    subtitle: {
      fontSize: 14,
      color: "#666",
      marginBottom: 25,
    },

    /* Input */

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

    /* Signup Button */

    signUpButton: {
      backgroundColor: "#1a5f3f",

      borderRadius: 15,

      height: 55,

      flexDirection: "row",

      justifyContent: "center",

      alignItems: "center",

      elevation: 5,

      marginTop: 10,
    },

    signUpButtonText: {
      color: "#fff",

      fontSize: 17,

      fontWeight: "bold",

      marginHorizontal: 8,
    },

    /* Verification */

    verificationBox: {
      flexDirection: "row",

      alignItems: "center",

      backgroundColor: "#f3f8f5",

      borderRadius: 15,

      padding: 15,

      marginTop: 20,
    },

    verificationIcon: {
      fontSize: 22,
      marginRight: 10,
    },

    verificationText: {
      flex: 1,

      color: "#666",

      fontSize: 12,

      lineHeight: 18,
    },

    /* Footer */

    footer: {
      flexDirection: "row",

      justifyContent: "center",

      marginTop: 30,

      marginBottom: 20,
    },

    footerText: {
      color: "#666",
    },

    signInLink: {
      color: "#1a5f3f",
      fontWeight: "bold",
    },
  });