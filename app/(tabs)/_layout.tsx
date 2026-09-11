import { Tabs } from "expo-router";

import {
  Home,
  Map,
  User,
  CloudSun,
  CalendarDays,
} from "lucide-react-native";

import {
  Platform,
  StyleSheet,
  View,
} from "react-native";

const GREEN = "#1A5F3F";
const LIGHT_GREEN = "#EAF4EE";
const GRAY = "#8D9892";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: GREEN,
        tabBarInactiveTintColor: GRAY,

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginTop: 3,
        },

        tabBarStyle: {
          position: "absolute",

          left: 14,
          right: 14,

          bottom:
            Platform.OS === "ios"
              ? 22
              : 14,

          height: 76,

          borderRadius: 28,

          backgroundColor: "#FFFFFF",

          borderTopWidth: 0,

          paddingTop: 8,
          paddingBottom: 8,

          elevation: 18,

          shadowColor: "#000",

          shadowOffset: {
            width: 0,
            height: 8,
          },

          shadowOpacity: 0.12,
          shadowRadius: 18,
        },

        sceneStyle: {
          backgroundColor: "#F4F7F5",
        },
      }}
    >

      {/* =========================
          HOME
      ========================= */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <View
              style={[
                styles.iconBox,
                focused &&
                  styles.activeIconBox,
              ]}
            >
              <Home
                size={22}
                color={color}
                strokeWidth={
                  focused ? 2.7 : 2
                }
              />
            </View>
          ),
        }}
      />


      {/* =========================
          WEATHER
      ========================= */}

      <Tabs.Screen
        name="weather"
        options={{
          title: "Weather",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <View
              style={[
                styles.iconBox,
                focused &&
                  styles.activeIconBox,
              ]}
            >
              <CloudSun
                size={23}
                color={color}
                strokeWidth={
                  focused ? 2.7 : 2
                }
              />
            </View>
          ),
        }}
      />


      {/* =========================
          EXPLORE / MAP
      ========================= */}

      <Tabs.Screen
        name="map"
        options={{
          title: "Explore",

          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "700",
            marginTop: 7,
          },

          tabBarIcon: () => (
            <View
              style={styles.mapOuter}
            >
              <View
                style={styles.mapButton}
              >
                <Map
                  size={28}
                  color="#FFFFFF"
                  strokeWidth={2.4}
                />
              </View>
            </View>
          ),
        }}
      />


      {/* =========================
          TRAVEL PLAN
      ========================= */}

      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <View
              style={[
                styles.iconBox,
                focused &&
                  styles.activeIconBox,
              ]}
            >
              <CalendarDays
                size={22}
                color={color}
                strokeWidth={
                  focused ? 2.7 : 2
                }
              />
            </View>
          ),
        }}
      />


      {/* =========================
          PROFILE
      ========================= */}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <View
              style={[
                styles.iconBox,
                focused &&
                  styles.activeIconBox,
              ]}
            >
              <User
                size={22}
                color={color}
                strokeWidth={
                  focused ? 2.7 : 2
                }
              />
            </View>
          ),
        }}
      />


      {/* =========================
          HIDE OLD FAVORITES TAB
      ========================= */}

      

    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    width: 40,
    height: 34,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",
  },

  activeIconBox: {
    backgroundColor: LIGHT_GREEN,
  },

  mapOuter: {
    width: 68,
    height: 68,

    borderRadius: 25,

    backgroundColor: "#F4F7F5",

    alignItems: "center",
    justifyContent: "center",

    marginTop: -31,
  },

  mapButton: {
    width: 58,
    height: 58,

    borderRadius: 21,

    backgroundColor: GREEN,

    alignItems: "center",
    justifyContent: "center",

    elevation: 10,

    shadowColor: GREEN,

    shadowOpacity: 0.32,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});