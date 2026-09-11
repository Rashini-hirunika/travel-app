import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
  Heart,
  MapPin,
  Star,
  UserRound,
  Plane,
  Sparkles,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useUser } from "@/contexts/UserContext";

const GREEN = "#1A5F3F";
const DARK_GREEN = "#103D2B";
const LIGHT_GREEN = "#EAF4EE";
const ORANGE = "#E48A32";
const BG = "#F4F7F5";
const TEXT = "#24322C";
const MUTED = "#84908A";
const ERROR = "#E45868";

const SETTINGS_ITEMS = [
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    description: "Manage your app preferences",
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Notifications",
    description: "Manage alerts and updates",
  },
  {
    id: "privacy",
    icon: Shield,
    label: "Privacy & Security",
    description: "Account and security settings",
  },
  {
    id: "help",
    icon: HelpCircle,
    label: "Help & Support",
    description: "Get help using Serendib",
  },
];

export default function SerendibProfile() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { user } = useUser();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of Serendib?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace("/auth/signin");
            } catch (error) {
              console.log("SIGN OUT ERROR:", error);

              Alert.alert(
                "Error",
                "Could not sign out. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.guestScreen}>
        <StatusBar style="light" />

        <LinearGradient
          colors={[DARK_GREEN, GREEN, "#2E8B57"]}
          style={styles.guestGradient}
        >
          <View style={styles.guestLogo}>
            <Plane size={34} color="#FFFFFF" />
          </View>

          <Text style={styles.guestBrand}>SERENDIB</Text>

          <Text style={styles.guestSubtitle}>
            Discover the beauty of Sri Lanka
          </Text>

          <View style={styles.guestCard}>
            <View style={styles.guestAvatar}>
              <UserRound size={42} color={GREEN} />
            </View>

            <Text style={styles.guestTitle}>
              Welcome Traveler
            </Text>

            <Text style={styles.guestDescription}>
              Sign in to save destinations, manage your travel plan and personalize your journey.
            </Text>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => router.push("/auth/signin")}
            >
              <Text style={styles.loginBtnText}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.screen}
      edges={["top"]}
    >
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={[DARK_GREEN, GREEN, "#2E8B57"]}
          style={styles.header}
        >
          <View style={styles.headerCircleOne} />
          <View style={styles.headerCircleTwo} />

          <View style={styles.headerTop}>
            <View>
              <View style={styles.headerBrandRow}>
                <Sparkles
                  size={13}
                  color="#F5BD62"
                />

                <Text style={styles.headerEyebrow}>
                  YOUR SERENDIB PROFILE
                </Text>
              </View>

              <Text style={styles.headerTitle}>
                My Profile
              </Text>
            </View>

            <TouchableOpacity
              style={styles.settingsBtn}
            >
              <Settings
                size={21}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerSubtitle}>
            Manage your travel journey
          </Text>
        </LinearGradient>

        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <LinearGradient
              colors={["#EAF4EE", "#D9EEE2"]}
              style={styles.avatar}
            >
              <UserRound
                size={48}
                color={GREEN}
              />
            </LinearGradient>

            <View style={styles.statusBadge}>
              <Text style={styles.statusEmoji}>
                🌴
              </Text>
            </View>
          </View>

          <Text style={styles.userName}>
            {user.name || "Traveler"}
          </Text>

          <Text style={styles.userEmail}>
            {user.email}
          </Text>

          <View style={styles.locationChip}>
            <MapPin
              size={14}
              color={GREEN}
            />

            <Text style={styles.locationText}>
              Sri Lanka
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={styles.statIconGreen}>
              <Heart
                size={22}
                color={GREEN}
              />
            </View>

            <Text style={styles.statNum}>
              {favorites.length}
            </Text>

            <Text style={styles.statLabel}>
              Favorites
            </Text>
          </View>

          <View style={styles.statBox}>
            <View style={styles.statIconGreen}>
              <MapPin
                size={22}
                color={GREEN}
              />
            </View>

            <Text style={styles.statNum}>
              3
            </Text>

            <Text style={styles.statLabel}>
              Visited
            </Text>
          </View>

          <View style={styles.statBox}>
            <View style={styles.statIconOrange}>
              <Star
                size={22}
                color={ORANGE}
              />
            </View>

            <Text style={styles.statNum}>
              12
            </Text>

            <Text style={styles.statLabel}>
              Reviews
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Account
            </Text>

            <Text style={styles.sectionSubtitle}>
              Manage your profile and preferences
            </Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          {SETTINGS_ITEMS.map((item, index) => {
            const Icon = item.icon;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.75}
                style={[
                  styles.menuItem,
                  index === SETTINGS_ITEMS.length - 1 &&
                    styles.menuItemLast,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconBox}>
                    <Icon
                      size={20}
                      color={GREEN}
                    />
                  </View>

                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuLabel}>
                      {item.label}
                    </Text>

                    <Text style={styles.menuDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>

                <ChevronRight
                  size={20}
                  color="#A5AEA9"
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.travelCard}>
          <LinearGradient
            colors={["#103D2B", "#1A5F3F"]}
            style={styles.travelGradient}
          >
            <View style={styles.travelIcon}>
              <Plane
                size={24}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.travelInfo}>
              <Text style={styles.travelLabel}>
                SERENDIB TRAVELER
              </Text>

              <Text style={styles.travelTitle}>
                Keep exploring Sri Lanka
              </Text>

              <Text style={styles.travelDescription}>
                Discover new destinations and create unforgettable memories.
              </Text>
            </View>
          </LinearGradient>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={handleSignOut}
        >
          <View style={styles.logoutIcon}>
            <LogOut
              size={19}
              color={ERROR}
            />
          </View>

          <View style={styles.logoutContent}>
            <Text style={styles.logoutText}>
              Sign Out
            </Text>

            <Text style={styles.logoutDescription}>
              Sign out from your Serendib account
            </Text>
          </View>

          <ChevronRight
            size={20}
            color="#D59CA3"
          />
        </TouchableOpacity>

        <Text style={styles.versionText}>
          Serendib • Explore Sri Lanka
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },

  scrollContent: {
    paddingBottom: 130,
  },

  header: {
    height: 235,
    paddingHorizontal: 22,
    paddingTop: 18,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    overflow: "hidden",
  },

  headerCircleOne: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.05)",
    right: -80,
    top: -70,
  },

  headerCircleTwo: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.04)",
    left: -50,
    bottom: -40,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerBrandRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerEyebrow: {
    color: "#F5BD62",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginLeft: 5,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 5,
  },

  headerSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    marginTop: 7,
  },

  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    marginHorizontal: 20,
    marginTop: -70,
    padding: 23,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    elevation: 9,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 7,
    },
  },

  avatarWrap: {
    position: "relative",
  },

  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  statusBadge: {
    position: "absolute",
    width: 34,
    height: 34,
    right: -3,
    bottom: -2,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: BG,
    justifyContent: "center",
    alignItems: "center",
  },

  statusEmoji: {
    fontSize: 16,
  },

  userName: {
    marginTop: 15,
    color: TEXT,
    fontSize: 23,
    fontWeight: "800",
  },

  userEmail: {
    marginTop: 4,
    color: MUTED,
    fontSize: 13,
  },

  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 15,
    marginTop: 13,
  },

  locationText: {
    marginLeft: 5,
    color: GREEN,
    fontSize: 12,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 18,
    gap: 10,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    paddingVertical: 17,
    alignItems: "center",
    elevation: 2,
  },

  statIconGreen: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: LIGHT_GREEN,
    justifyContent: "center",
    alignItems: "center",
  },

  statIconOrange: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#FFF3E4",
    justifyContent: "center",
    alignItems: "center",
  },

  statNum: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 10,
  },

  statLabel: {
    color: MUTED,
    fontSize: 11,
    marginTop: 2,
  },

  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 29,
    marginBottom: 13,
  },

  sectionTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: MUTED,
    fontSize: 11,
    marginTop: 3,
  },

  menuCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 23,
    overflow: "hidden",
    elevation: 2,
  },

  menuItem: {
    minHeight: 78,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1EF",
  },

  menuItemLast: {
    borderBottomWidth: 0,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: LIGHT_GREEN,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  menuTextContainer: {
    flex: 1,
  },

  menuLabel: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "800",
  },

  menuDescription: {
    color: MUTED,
    fontSize: 10,
    marginTop: 3,
  },

  travelCard: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 24,
    overflow: "hidden",
  },

  travelGradient: {
    minHeight: 130,
    padding: 19,
    flexDirection: "row",
    alignItems: "center",
  },

  travelIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.14)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  travelInfo: {
    flex: 1,
  },

  travelLabel: {
    color: "#F5BD62",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.3,
  },

  travelTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 4,
  },

  travelDescription: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 4,
  },

  logoutBtn: {
    minHeight: 74,
    marginHorizontal: 20,
    marginTop: 18,
    paddingHorizontal: 15,
    borderRadius: 21,
    backgroundColor: "#FFF3F4",
    flexDirection: "row",
    alignItems: "center",
  },

  logoutIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#FFE4E7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  logoutContent: {
    flex: 1,
  },

  logoutText: {
    color: ERROR,
    fontSize: 14,
    fontWeight: "800",
  },

  logoutDescription: {
    color: "#A77F84",
    fontSize: 10,
    marginTop: 3,
  },

  versionText: {
    textAlign: "center",
    color: "#A0AAA5",
    fontSize: 10,
    marginTop: 22,
  },

  guestScreen: {
    flex: 1,
    backgroundColor: GREEN,
  },

  guestGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  guestLogo: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.14)",
    justifyContent: "center",
    alignItems: "center",
  },

  guestBrand: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 14,
  },

  guestSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 5,
  },

  guestCard: {
    width: "100%",
    marginTop: 35,
    padding: 25,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  guestAvatar: {
    width: 78,
    height: 78,
    borderRadius: 25,
    backgroundColor: LIGHT_GREEN,
    justifyContent: "center",
    alignItems: "center",
  },

  guestTitle: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "800",
    marginTop: 14,
  },

  guestDescription: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 6,
  },

  loginBtn: {
    width: "100%",
    height: 53,
    marginTop: 20,
    borderRadius: 17,
    backgroundColor: GREEN,
    justifyContent: "center",
    alignItems: "center",
  },

  loginBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});