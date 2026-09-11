import { useEffect, useRef } from "react";

import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  MapPin,
  Compass,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  // Logo fade
  const fadeAnim =
    useRef(new Animated.Value(0)).current;

  // Logo zoom
  const scaleAnim =
    useRef(new Animated.Value(0.7)).current;

  // Text movement
  const slideAnim =
    useRef(new Animated.Value(25)).current;

  // Bottom text fade
  const footerAnim =
    useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo entrance
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),

        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 55,
          useNativeDriver: true,
        }),

        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),

      // Footer
      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={[
          "#103F2C",
          "#1A5F3F",
          "#2E8B57",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >

        {/* Decorative Circle */}
        <View style={styles.circleOne} />

        <View style={styles.circleTwo} />

        <View style={styles.circleThree} />

        {/* Main Content */}

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,

              transform: [
                {
                  scale: scaleAnim,
                },
                {
                  translateY:
                    slideAnim,
                },
              ],
            },
          ]}
        >

          {/* Logo */}

          <View style={styles.logoOuter}>

            <View style={styles.logoInner}>

              <MapPin
                size={48}
                color="#FFFFFF"
                strokeWidth={2.2}
              />

              <View
                style={
                  styles.logoSmallIcon
                }
              >
                <Compass
                  size={16}
                  color="#1A5F3F"
                  strokeWidth={2.5}
                />
              </View>

            </View>

          </View>

          {/* Brand */}

          <Text style={styles.title}>
            Serendib
          </Text>

          <Text style={styles.subtitle}>
            DISCOVER SRI LANKA
          </Text>

          <View style={styles.divider} />

          <Text style={styles.description}>
            Explore the beauty,
            culture and wonders of
            Sri Lanka
          </Text>

        </Animated.View>

        {/* Bottom */}

        <Animated.View
          style={[
            styles.bottomContainer,
            {
              opacity: footerAnim,
            },
          ]}
        >

          <View style={styles.loadingRow}>

            <View
              style={styles.loadingDot}
            />

            <Text
              style={styles.loadingText}
            >
              Preparing your journey
            </Text>

          </View>

          <Text style={styles.footer}>
            Explore • Discover • Experience
          </Text>

        </Animated.View>

      </LinearGradient>

    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gradient: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
  },

  // --------------------------------------------------
  // BACKGROUND DECORATIONS
  // --------------------------------------------------

  circleOne: {
    position: "absolute",

    width: width * 0.9,
    height: width * 0.9,

    borderRadius: width,

    backgroundColor:
      "rgba(255,255,255,0.035)",

    top: -170,
    right: -170,
  },

  circleTwo: {
    position: "absolute",

    width: width * 0.65,
    height: width * 0.65,

    borderRadius: width,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.07)",

    bottom: 100,
    left: -140,
  },

  circleThree: {
    position: "absolute",

    width: 100,
    height: 100,

    borderRadius: 50,

    backgroundColor:
      "rgba(255,255,255,0.025)",

    top: "30%",
    left: 20,
  },

  // --------------------------------------------------
  // CONTENT
  // --------------------------------------------------

  content: {
    alignItems: "center",

    paddingHorizontal: 35,
  },

  // --------------------------------------------------
  // LOGO
  // --------------------------------------------------

  logoOuter: {
    width: 130,
    height: 130,

    borderRadius: 40,

    backgroundColor:
      "rgba(255,255,255,0.08)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.15)",

    marginBottom: 28,
  },

  logoInner: {
    width: 100,
    height: 100,

    borderRadius: 32,

    backgroundColor:
      "rgba(255,255,255,0.16)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.25)",

    position: "relative",
  },

  logoSmallIcon: {
    position: "absolute",

    right: 7,
    bottom: 7,

    width: 29,
    height: 29,

    borderRadius: 15,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",
  },

  // --------------------------------------------------
  // TEXT
  // --------------------------------------------------

  title: {
    fontSize: 46,

    fontWeight: "800",

    color: "#FFFFFF",

    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 12,

    fontWeight: "700",

    color:
      "rgba(255,255,255,0.82)",

    letterSpacing: 4,

    marginTop: 7,
  },

  divider: {
    width: 40,
    height: 3,

    borderRadius: 10,

    backgroundColor: "#FFB347",

    marginTop: 22,
    marginBottom: 20,
  },

  description: {
    maxWidth: 280,

    color:
      "rgba(255,255,255,0.72)",

    textAlign: "center",

    lineHeight: 22,

    fontSize: 14,

    fontWeight: "400",
  },

  // --------------------------------------------------
  // BOTTOM
  // --------------------------------------------------

  bottomContainer: {
    position: "absolute",

    bottom: 45,

    width: "100%",

    alignItems: "center",
  },

  loadingRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 15,
  },

  loadingDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: "#FFB347",

    marginRight: 8,
  },

  loadingText: {
    fontSize: 12,

    color:
      "rgba(255,255,255,0.75)",

    fontWeight: "500",

    letterSpacing: 0.5,
  },

  footer: {
    fontSize: 11,

    color:
      "rgba(255,255,255,0.48)",

    letterSpacing: 1.2,
  },
});