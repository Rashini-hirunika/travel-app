import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { useMemo, useState } from "react";
import { Link } from "expo-router";

import {
  Search,
  MapPin,
  Heart,
  Compass,
  ChevronRight,
  Sparkles,
} from "lucide-react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  districts,
  provinces,
} from "../../data/districts";

import {
  useFavorites,
} from "../../contexts/FavoritesContext";

const { width } = Dimensions.get("window");

const SMALL_CARD_WIDTH =
  (width - 54) / 2;

const FEATURED_DISTRICTS = [
  "colombo",
  "kandy",
  "galle",
  "sigiriya",
  "nuwara-eliya",
];

// ========================================================
// DISTRICT CARD
// ========================================================

const DistrictCard = ({
  item,
  isWide = false,
  isFeatured = false,
  onToggleFavorite,
  isFavorite,
}: {
  item: any;
  isWide?: boolean;
  isFeatured?: boolean;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}) => {
  return (
    <View
      style={[
        styles.card,

        isFeatured
          ? styles.featuredCard
          : isWide
          ? styles.wideCard
          : styles.smallCard,
      ]}
    >
      <Link
        href={`/district/${item.id}`}
        asChild
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.cardTouch}
        >
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.cardImage}
          />

          <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,0.10)",
              "rgba(0,0,0,0.78)",
            ]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Explore Badge */}
          <View style={styles.exploreBadge}>
            <MapPin
              size={11}
              color="#1A5F3F"
            />

            <Text
              style={styles.exploreBadgeText}
            >
              EXPLORE
            </Text>
          </View>

          {/* Content */}
          <View style={styles.cardContent}>
            <Text
              style={[
                styles.cardName,
                isWide &&
                  styles.wideCardName,
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <View
              style={styles.locationRow}
            >
              <MapPin
                size={12}
                color="#FFFFFF"
              />

              <Text
                style={styles.provinceText}
                numberOfLines={1}
              >
                {item.province}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>

      {/* Favorite Button */}
      <TouchableOpacity
        style={styles.heartButton}
        activeOpacity={0.8}
        onPress={() =>
          onToggleFavorite(item.id)
        }
      >
        <Heart
          size={18}
          color="#FFFFFF"
          fill={
            isFavorite
              ? "#FF5364"
              : "transparent"
          }
        />
      </TouchableOpacity>
    </View>
  );
};

// ========================================================
// HOME SCREEN
// ========================================================

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [
    selectedProvince,
    setSelectedProvince,
  ] =
    useState<string | null>(null);

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  // Featured places
  const featuredDistricts =
    useMemo(
      () =>
        districts.filter((district) =>
          FEATURED_DISTRICTS.includes(
            district.id
          )
        ),
      []
    );

  // Search + Province filter
  const filteredDistricts =
    useMemo(() => {
      let result = districts;

      if (selectedProvince) {
        result = result.filter(
          (district) =>
            district.province ===
            selectedProvince
        );
      }

      if (searchQuery.trim()) {
        const query =
          searchQuery
            .trim()
            .toLowerCase();

        result = result.filter(
          (district) =>
            district.name
              .toLowerCase()
              .includes(query)
        );
      }

      return result;
    }, [
      searchQuery,
      selectedProvince,
    ]);

  return (
    <View style={styles.screen}>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 135,
        }}
      >

        {/* =================================================
            HERO HEADER
        ================================================= */}

        <View style={styles.hero}>

          <LinearGradient
            colors={[
              "#103D2B",
              "#1A5F3F",
              "#2E8B57",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={
              StyleSheet.absoluteFill
            }
          />

          {/* Decorative circles */}
          <View
            style={
              styles.heroCircleLarge
            }
          />

          <View
            style={
              styles.heroCircleSmall
            }
          />

          <View style={styles.heroTop}>

            <View>

              <Text
                style={
                  styles.heroEyebrow
                }
              >
                AYUBOWAN 👋
              </Text>

              <Text
                style={
                  styles.heroSmallTitle
                }
              >
                Explore the beauty of
              </Text>

              <Text
                style={
                  styles.heroMainTitle
                }
              >
                Sri Lanka
              </Text>

            </View>

            <View
              style={
                styles.compassButton
              }
            >
              <Compass
                size={27}
                color="#FFFFFF"
              />
            </View>

          </View>

          <Text
            style={
              styles.heroDescription
            }
          >
            Discover breathtaking places,
            culture and unforgettable
            experiences across the island.
          </Text>

        </View>

        {/* =================================================
            SEARCH BAR
        ================================================= */}

        <View
          style={
            styles.searchContainer
          }
        >
          <Search
            size={21}
            color="#1A5F3F"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search destination..."
            placeholderTextColor="#8B9690"
            value={searchQuery}
            onChangeText={
              setSearchQuery
            }
          />

          <View
            style={
              styles.searchLocation
            }
          >
            <MapPin
              size={18}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* =================================================
            QUICK STATS
        ================================================= */}

        <View style={styles.statsCard}>

          <View style={styles.statItem}>
            <Text
              style={
                styles.statNumber
              }
            >
              25
            </Text>

            <Text
              style={styles.statLabel}
            >
              Districts
            </Text>
          </View>

          <View
            style={styles.statDivider}
          />

          <View style={styles.statItem}>
            <Text
              style={
                styles.statNumber
              }
            >
              500+
            </Text>

            <Text
              style={styles.statLabel}
            >
              Places
            </Text>
          </View>

          <View
            style={styles.statDivider}
          />

          <View style={styles.statItem}>
            <Text
              style={
                styles.statNumber
              }
            >
              9
            </Text>

            <Text
              style={styles.statLabel}
            >
              Provinces
            </Text>
          </View>

        </View>

        {/* =================================================
            PROVINCE FILTER
        ================================================= */}

        <View style={styles.section}>

          <View
            style={
              styles.sectionHeader
            }
          >
            <View>

              <Text
                style={
                  styles.sectionTitle
                }
              >
                Explore Regions
              </Text>

              <Text
                style={
                  styles.sectionSubtitle
                }
              >
                Choose a province
              </Text>

            </View>

          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.chipScroll
            }
          >

            <TouchableOpacity
              style={[
                styles.chip,

                !selectedProvince &&
                  styles.chipActive,
              ]}
              onPress={() =>
                setSelectedProvince(
                  null
                )
              }
            >
              <Text
                style={[
                  styles.chipText,

                  !selectedProvince &&
                    styles.chipTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            {provinces.map(
              (province) => (
                <TouchableOpacity
                  key={province}
                  style={[
                    styles.chip,

                    selectedProvince ===
                      province &&
                      styles.chipActive,
                  ]}
                  onPress={() =>
                    setSelectedProvince(
                      province
                    )
                  }
                >
                  <Text
                    style={[
                      styles.chipText,

                      selectedProvince ===
                        province &&
                        styles.chipTextActive,
                    ]}
                  >
                    {province}
                  </Text>
                </TouchableOpacity>
              )
            )}

          </ScrollView>

        </View>

        {/* =================================================
            POPULAR DESTINATIONS
        ================================================= */}

        {!searchQuery &&
          !selectedProvince && (
            <View style={styles.section}>

              <View
                style={
                  styles.sectionHeader
                }
              >
                <View>

                  <View
                    style={
                      styles.sectionLabelRow
                    }
                  >
                    <Sparkles
                      size={14}
                      color="#E58A2B"
                    />

                    <Text
                      style={
                        styles.sectionLabel
                      }
                    >
                      TRENDING
                    </Text>
                  </View>

                  <Text
                    style={
                      styles.sectionTitle
                    }
                  >
                    Popular Destinations
                  </Text>

                  <Text
                    style={
                      styles.sectionSubtitle
                    }
                  >
                    Most loved places in Sri Lanka
                  </Text>

                </View>

                <ChevronRight
                  size={22}
                  color="#1A5F3F"
                />

              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={
                  false
                }
                contentContainerStyle={
                  styles.featuredScroll
                }
              >
                {featuredDistricts.map(
                  (item) => (
                    <DistrictCard
                      key={item.id}
                      item={item}
                      isFeatured
                      onToggleFavorite={
                        toggleFavorite
                      }
                      isFavorite={isFavorite(
                        item.id
                      )}
                    />
                  )
                )}

              </ScrollView>

            </View>
          )}

        {/* =================================================
            ALL DISTRICTS
        ================================================= */}

        <View style={styles.section}>

          <View
            style={
              styles.sectionHeader
            }
          >
            <View>

              <Text
                style={
                  styles.sectionTitle
                }
              >
                {searchQuery ||
                selectedProvince
                  ? "Search Results"
                  : "Discover Sri Lanka"}
              </Text>

              <Text
                style={
                  styles.sectionSubtitle
                }
              >
                {
                  filteredDistricts.length
                }{" "}
                destinations available
              </Text>

            </View>

          </View>

          {/* Modern mixed grid */}
          <View style={styles.grid}>

            {filteredDistricts.map(
              (district, index) => {

                // 1st, 6th, 11th...
                // becomes large card
                const isWide =
                  index % 5 === 0;

                return (
                  <DistrictCard
                    key={district.id}
                    item={district}
                    isWide={isWide}
                    onToggleFavorite={
                      toggleFavorite
                    }
                    isFavorite={isFavorite(
                      district.id
                    )}
                  />
                );
              }
            )}

          </View>

        </View>

      </ScrollView>

    </View>
  );
}

// ========================================================
// STYLES
// ========================================================

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#F3F6F4",
  },

  container: {
    flex: 1,
  },

  // ======================================================
  // HERO
  // ======================================================

  hero: {
    height: 295,

    paddingTop: 62,
    paddingHorizontal: 22,

    overflow: "hidden",

    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  heroCircleLarge: {
    position: "absolute",

    width: 240,
    height: 240,

    borderRadius: 120,

    backgroundColor:
      "rgba(255,255,255,0.05)",

    right: -80,
    top: -70,
  },

  heroCircleSmall: {
    position: "absolute",

    width: 110,
    height: 110,

    borderRadius: 55,

    backgroundColor:
      "rgba(255,255,255,0.04)",

    left: -35,
    bottom: 20,
  },

  heroTop: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems:
      "flex-start",
  },

  heroEyebrow: {
    color: "#F5BE63",

    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 2,

    marginBottom: 8,
  },

  heroSmallTitle: {
    color:
      "rgba(255,255,255,0.78)",

    fontSize: 17,

    fontWeight: "500",
  },

  heroMainTitle: {
    color: "#FFFFFF",

    fontSize: 43,

    fontWeight: "800",

    marginTop: -2,

    letterSpacing: 0.3,
  },

  heroDescription: {
    color:
      "rgba(255,255,255,0.75)",

    fontSize: 13,

    lineHeight: 20,

    marginTop: 15,

    maxWidth: 290,
  },

  compassButton: {
    width: 52,
    height: 52,

    borderRadius: 18,

    backgroundColor:
      "rgba(255,255,255,0.13)",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.18)",

    alignItems: "center",
    justifyContent: "center",
  },

  // ======================================================
  // SEARCH
  // ======================================================

  searchContainer: {
    height: 62,

    marginHorizontal: 20,

    marginTop: -31,

    paddingHorizontal: 16,

    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",

    alignItems: "center",

    elevation: 8,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  searchInput: {
    flex: 1,

    fontSize: 15,

    color: "#27352F",

    marginLeft: 11,

    height: "100%",
  },

  searchLocation: {
    width: 38,
    height: 38,

    borderRadius: 13,

    backgroundColor: "#1A5F3F",

    justifyContent: "center",
    alignItems: "center",
  },

  // ======================================================
  // STATS
  // ======================================================

  statsCard: {
    marginHorizontal: 20,

    marginTop: 22,

    paddingVertical: 15,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",

    alignItems: "center",

    elevation: 2,
  },

  statItem: {
    flex: 1,

    alignItems: "center",
  },

  statNumber: {
    color: "#1A5F3F",

    fontSize: 18,

    fontWeight: "800",
  },

  statLabel: {
    color: "#89938E",

    fontSize: 11,

    marginTop: 2,
  },

  statDivider: {
    height: 28,
    width: 1,

    backgroundColor: "#E5EAE7",
  },

  // ======================================================
  // SECTION
  // ======================================================

  section: {
    marginTop: 30,
  },

  sectionHeader: {
    paddingHorizontal: 20,

    marginBottom: 15,

    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",
  },

  sectionTitle: {
    color: "#24322C",

    fontSize: 21,

    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#89938E",

    fontSize: 12,

    marginTop: 3,
  },

  sectionLabelRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 4,
  },

  sectionLabel: {
    marginLeft: 5,

    color: "#E58A2B",

    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 1.5,
  },

  // ======================================================
  // CHIPS
  // ======================================================

  chipScroll: {
    paddingHorizontal: 20,

    paddingRight: 10,
  },

  chip: {
    paddingHorizontal: 18,

    paddingVertical: 10,

    marginRight: 9,

    borderRadius: 30,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,

    borderColor: "#E3EAE6",
  },

  chipActive: {
    backgroundColor: "#1A5F3F",

    borderColor: "#1A5F3F",
  },

  chipText: {
    color: "#69746E",

    fontSize: 13,

    fontWeight: "600",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },

  // ======================================================
  // FEATURED
  // ======================================================

  featuredScroll: {
    paddingHorizontal: 20,

    gap: 14,
  },

  // ======================================================
  // GRID
  // ======================================================

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    paddingHorizontal: 20,

    justifyContent:
      "space-between",
  },

  // ======================================================
  // DISTRICT CARD
  // ======================================================

  card: {
    marginBottom: 14,

    overflow: "hidden",

    backgroundColor: "#E4E9E6",

    elevation: 4,

    shadowColor: "#000",

    shadowOpacity: 0.09,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  smallCard: {
    width: SMALL_CARD_WIDTH,

    height: 205,

    borderRadius: 23,
  },

  wideCard: {
    width: "100%",

    height: 235,

    borderRadius: 27,
  },

  featuredCard: {
    width: width * 0.74,

    height: 235,

    borderRadius: 26,
  },

  cardTouch: {
    flex: 1,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardContent: {
    position: "absolute",

    left: 15,
    right: 15,
    bottom: 15,
  },

  cardName: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "800",
  },

  wideCardName: {
    fontSize: 25,
  },

  locationRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 5,
  },

  provinceText: {
    color:
      "rgba(255,255,255,0.84)",

    fontSize: 11,

    marginLeft: 5,

    fontWeight: "500",
  },

  exploreBadge: {
    position: "absolute",

    left: 12,
    top: 12,

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 20,

    backgroundColor:
      "rgba(255,255,255,0.90)",

    flexDirection: "row",

    alignItems: "center",
  },

  exploreBadgeText: {
    color: "#1A5F3F",

    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 1,

    marginLeft: 4,
  },

  heartButton: {
    position: "absolute",

    top: 11,
    right: 11,

    width: 38,
    height: 38,

    borderRadius: 14,

    backgroundColor:
      "rgba(0,0,0,0.30)",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.20)",

    alignItems: "center",
    justifyContent: "center",
  },
});