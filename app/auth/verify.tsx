import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  MailCheck,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
} from "lucide-react-native";

import { auth, db } from "@/config/firebase";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

export default function VerifyScreen() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Invalid PIN",
        "Please enter the complete 6-digit verification PIN."
      );

      return;
    }

    setIsLoading(true);

    try {
      /* =========================
         Get Pending Registration
      ========================= */

      const storedData =
        await AsyncStorage.getItem(
          "pendingRegistration"
        );

      if (!storedData) {
        Alert.alert(
          "Session Expired",
          "Your registration session has expired. Please register again.",
          [
            {
              text: "Back to Sign Up",
              onPress: () =>
                router.replace(
                  "/auth/signup"
                ),
            },
          ]
        );

        return;
      }

      const registration =
        JSON.parse(storedData);

      /* =========================
         Check OTP
      ========================= */

      if (
        registration.verificationCode !==
        otp.trim()
      ) {
        Alert.alert(
          "Invalid PIN",
          "The verification PIN is incorrect. Please try again."
        );

        return;
      }

      /* =========================
         Create Firebase Account
      ========================= */

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          registration.email,
          registration.password
        );

      const user =
        userCredential.user;

      /* =========================
         Update Display Name
      ========================= */

      await updateProfile(user, {
        displayName:
          registration.fullName,
      });

      /* =========================
         Save Firestore User
      ========================= */

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name:
            registration.fullName,
          email:
            registration.email,

          createdAt:
            new Date().toISOString(),

          userLocation:
            "Sri Lanka",

          isVerified: true,

          verificationCode: null,
        }
      );

      /* =========================
         Sign Out After Verify
      ========================= */

      await signOut(auth);

      /* =========================
         Remove Temporary Data
      ========================= */

      await AsyncStorage.removeItem(
        "pendingRegistration"
      );

      /* =========================
         Success
      ========================= */

      Alert.alert(
        "Successfully Verified! 🎉",
        "Your email has been verified and your Serendib account is ready.",
        [
          {
            text: "Go to Sign In",
            onPress: () =>
              router.replace(
                "/auth/signin"
              ),
          },
        ]
      );
    } catch (error: any) {
      console.log(
        "VERIFY ERROR:",
        error
      );

      let errorMessage =
        "Verification failed. Please try again.";

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        errorMessage =
          "This email is already registered. Please sign in instead.";
      } else if (
        error.code ===
        "auth/invalid-email"
      ) {
        errorMessage =
          "The email address is invalid.";
      } else if (
        error.code ===
        "auth/weak-password"
      ) {
        errorMessage =
          "The password is too weak.";
      }

      Alert.alert(
        "Verification Error",
        errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
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
            TOP HEADER
        ========================= */}

        <LinearGradient
          colors={[
            "#1a5f3f",
            "#2e8b57",
          ]}
          style={styles.header}
        >
          <View
            style={styles.iconCircle}
          >
            <MailCheck
              size={42}
              color="#ffffff"
              strokeWidth={2}
            />
          </View>

          <Text style={styles.appName}>
            Serendib
          </Text>

          <Text style={styles.tagline}>
            EMAIL VERIFICATION
          </Text>
        </LinearGradient>

        {/* =========================
            VERIFY CARD
        ========================= */}

        <View
          style={styles.formContainer}
        >
          <Text
            style={styles.title}
          >
            Verify Your Email
          </Text>

          <Text
            style={styles.subtitle}
          >
            We sent a 6-digit
            verification PIN to your
            email address.
          </Text>

          {/* PIN illustration */}

          <View
            style={styles.pinLabelRow}
          >
            <ShieldCheck
              size={18}
              color="#1a5f3f"
            />

            <Text
              style={styles.pinLabel}
            >
              Enter Verification PIN
            </Text>
          </View>

          {/* PIN INPUT */}

          <View
            style={
              styles.pinContainer
            }
          >
            <TextInput
              style={styles.pinInput}
              placeholder="------"
              placeholderTextColor="#c1c1c1"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={(text) =>
                setOtp(
                  text.replace(
                    /[^0-9]/g,
                    ""
                  )
                )
              }
              editable={!isLoading}
              autoFocus
              textContentType="oneTimeCode"
            />
          </View>

          <Text
            style={
              styles.helperText
            }
          >
            Enter the exact 6-digit
            code from your email.
          </Text>

          {/* =========================
              VERIFY BUTTON
          ========================= */}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleVerify}
            disabled={isLoading}
            style={[
              styles.verifyButton,
              isLoading &&
                styles.buttonDisabled,
            ]}
          >
            {isLoading ? (
              <>
                <ActivityIndicator
                  color="#fff"
                />

                <Text
                  style={
                    styles.verifyButtonText
                  }
                >
                  Verifying...
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={
                    styles.verifyButtonText
                  }
                >
                  Verify & Continue
                </Text>

                <ArrowRight
                  size={20}
                  color="#fff"
                />
              </>
            )}
          </TouchableOpacity>

          {/* =========================
              SECURITY INFO
          ========================= */}

          <View
            style={
              styles.securityCard
            }
          >
            <View
              style={
                styles.securityIcon
              }
            >
              <ShieldCheck
                size={22}
                color="#1a5f3f"
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={
                  styles.securityTitle
                }
              >
                Secure Verification
              </Text>

              <Text
                style={
                  styles.securityText
                }
              >
                Your account will only
                be created after the
                correct PIN is verified.
              </Text>
            </View>
          </View>

          {/* =========================
              BACK BUTTON
          ========================= */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              router.replace(
                "/auth/signup"
              )
            }
            disabled={isLoading}
          >
            <ArrowLeft
              size={18}
              color="#1a5f3f"
            />

            <Text
              style={styles.backText}
            >
              Back to Sign Up
            </Text>
          </TouchableOpacity>
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
      backgroundColor: "#ffffff",
    },

    scrollContainer: {
      flexGrow: 1,
    },

    /* Header */

    header: {
      paddingTop: 70,
      paddingBottom: 75,

      alignItems: "center",

      borderBottomLeftRadius: 45,
      borderBottomRightRadius: 45,
    },

    iconCircle: {
      width: 90,
      height: 90,

      borderRadius: 28,

      backgroundColor:
        "rgba(255,255,255,0.18)",

      justifyContent: "center",
      alignItems: "center",

      borderWidth: 1.5,

      borderColor:
        "rgba(255,255,255,0.3)",
    },

    appName: {
      fontSize: 31,

      fontWeight: "bold",

      color: "#ffffff",

      marginTop: 15,
    },

    tagline: {
      fontSize: 11,

      color:
        "rgba(255,255,255,0.8)",

      letterSpacing: 2.5,

      marginTop: 3,
    },

    /* White Form */

    formContainer: {
      flex: 1,

      backgroundColor: "#ffffff",

      marginTop: -40,

      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,

      paddingHorizontal: 28,

      paddingTop: 35,
      paddingBottom: 35,
    },

    title: {
      fontSize: 26,

      fontWeight: "bold",

      color: "#2b2b2b",

      textAlign: "center",
    },

    subtitle: {
      fontSize: 14,

      color: "#777",

      textAlign: "center",

      lineHeight: 21,

      marginTop: 8,

      marginBottom: 28,

      paddingHorizontal: 15,
    },

    /* PIN Label */

    pinLabelRow: {
      flexDirection: "row",

      alignItems: "center",

      marginBottom: 10,
    },

    pinLabel: {
      marginLeft: 7,

      fontSize: 14,

      fontWeight: "700",

      color: "#333",
    },

    /* PIN */

    pinContainer: {
      borderRadius: 18,

      backgroundColor: "#f6f8f7",

      borderWidth: 1.5,

      borderColor: "#dfe9e3",

      overflow: "hidden",
    },

    pinInput: {
      height: 70,

      textAlign: "center",

      fontSize: 30,

      fontWeight: "bold",

      letterSpacing: 13,

      color: "#1a5f3f",

      paddingLeft: 13,
    },

    helperText: {
      fontSize: 12,

      textAlign: "center",

      color: "#999",

      marginTop: 10,

      marginBottom: 25,
    },

    /* Verify Button */

    verifyButton: {
      height: 57,

      backgroundColor: "#1a5f3f",

      borderRadius: 16,

      flexDirection: "row",

      justifyContent: "center",

      alignItems: "center",

      elevation: 5,

      shadowColor: "#000",

      shadowOffset: {
        width: 0,
        height: 3,
      },

      shadowOpacity: 0.15,

      shadowRadius: 5,
    },

    buttonDisabled: {
      opacity: 0.65,
    },

    verifyButtonText: {
      color: "#ffffff",

      fontSize: 16,

      fontWeight: "bold",

      marginHorizontal: 8,
    },

    /* Secure Card */

    securityCard: {
      flexDirection: "row",

      alignItems: "center",

      marginTop: 25,

      backgroundColor: "#f2f8f4",

      padding: 15,

      borderRadius: 17,

      borderWidth: 1,

      borderColor: "#e0eee5",
    },

    securityIcon: {
      width: 42,
      height: 42,

      borderRadius: 13,

      backgroundColor: "#e1f0e6",

      justifyContent: "center",

      alignItems: "center",

      marginRight: 12,
    },

    securityTitle: {
      fontSize: 13,

      fontWeight: "bold",

      color: "#1a5f3f",

      marginBottom: 3,
    },

    securityText: {
      fontSize: 11,

      color: "#777",

      lineHeight: 17,
    },

    /* Back */

    backButton: {
      flexDirection: "row",

      justifyContent: "center",

      alignItems: "center",

      marginTop: 28,

      paddingVertical: 5,
    },

    backText: {
      color: "#1a5f3f",

      fontSize: 14,

      fontWeight: "700",

      marginLeft: 6,
    },
  });