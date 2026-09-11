import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  ArrowLeft,
  Heart,
  MapPin,
  Download,
  Check,
  Utensils,
  History,
  Navigation,
  Compass,
  Map,
  Sparkles,
  ChevronRight,
} from "lucide-react-native";

import { LinearGradient } from "expo-linear-gradient";

import { getDistrictById } from "../../data/districts";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useOffline } from "../../contexts/OfflineContext";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import MapView, {
  Marker,
} from "react-native-maps";

interface Place {
  name: string;
  description: string;
  imageUrl: any;
  latitude: number;
  longitude: number;
}

const { width } = Dimensions.get("window");

const DEFAULT_COORDS = {
  latitude: 7.8731,
  longitude: 80.7718,
};

export default function DistrictDetailScreen() {
  const { id } =
    useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const mapRef = useRef<MapView>(null);

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const {
    downloadDistrict,
    removeDownload,
    isDownloaded,
  } = useOffline();

  const district = useMemo(
    () => getDistrictById(id),
    [id]
  );

  const [
    activeCoords,
    setActiveCoords,
  ] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  if (!district) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIcon}>
          <MapPin
            size={30}
            color="#1A5F3F"
          />
        </View>

        <Text style={styles.errorTitle}>
          District Not Found
        </Text>

        <Text style={styles.errorText}>
          We couldn't find this destination.
        </Text>

        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => router.back()}
        >
          <ArrowLeft
            size={18}
            color="#FFFFFF"
          />

          <Text
            style={styles.errorButtonText}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleOpenMapTap = (
    place: Place
  ) => {
    router.push({
      pathname: "/(tabs)/map",
      params: {
        destLat: place.latitude,
        destLng: place.longitude,
        destName: place.name,
      },
    });
  };

  const handlePlacePress = (
    place: Place
  ) => {
    const targetCoords = {
      latitude: place.latitude,
      longitude: place.longitude,
    };

    setActiveCoords(targetCoords);

    mapRef.current?.animateToRegion(
      {
        ...targetCoords,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000
    );
  };

  const handleDownloadToggle = () => {
    if (isDownloaded(district.id)) {
      removeDownload(district.id);
    } else {
      downloadDistrict(district.id);
    }
  };

  const districtCoords =
    district.coordinates ??
    DEFAULT_COORDS;

  const markerCoords =
    activeCoords ?? districtCoords;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{
          paddingBottom: 70,
        }}
      >
        {/* HERO */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: district.imageUrl,
            }}
            style={styles.heroImage}
          />

          <LinearGradient
            colors={[
              "rgba(0,0,0,0.05)",
              "rgba(0,0,0,0.20)",
              "rgba(5,32,21,0.92)",
            ]}
            style={
              StyleSheet.absoluteFillObject
            }
          />

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <ArrowLeft
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.topActions}>
            <TouchableOpacity
              style={
                styles.heroIconButton
              }
              activeOpacity={0.8}
              onPress={
                handleDownloadToggle
              }
            >
              {isDownloaded(
                district.id
              ) ? (
                <Check
                  size={21}
                  color="#A7E8BE"
                />
              ) : (
                <Download
                  size={21}
                  color="#FFFFFF"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.heroIconButton
              }
              activeOpacity={0.8}
              onPress={() =>
                toggleFavorite(
                  district.id
                )
              }
            >
              <Heart
                size={21}
                color={
                  isFavorite(
                    district.id
                  )
                    ? "#FF5A6D"
                    : "#FFFFFF"
                }
                fill={
                  isFavorite(
                    district.id
                  )
                    ? "#FF5A6D"
                    : "transparent"
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.heroContent}>
            <View
              style={
                styles.destinationBadge
              }
            >
              <Sparkles
                size={12}
                color="#F3B456"
              />

              <Text
                style={
                  styles.destinationBadgeText
                }
              >
                DISCOVER
              </Text>
            </View>

            <Text
              style={styles.districtName}
            >
              {district.name}
            </Text>

            <View
              style={
                styles.heroLocationRow
              }
            >
              <MapPin
                size={15}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.heroProvince
                }
              >
                {district.province} Province
              </Text>
            </View>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View
          style={
            styles.quickActionsCard
          }
        >
          <TouchableOpacity
            style={styles.quickAction}
            activeOpacity={0.8}
            onPress={() =>
              handleOpenMapTap({
                name: district.name,
                latitude:
                  districtCoords.latitude,
                longitude:
                  districtCoords.longitude,
                description: "",
                imageUrl: "",
              })
            }
          >
            <View
              style={[
                styles.quickActionIcon,
                styles.quickActionIconActive,
              ]}
            >
              <Navigation
                size={19}
                color="#FFFFFF"
              />
            </View>

            <Text
              style={
                styles.quickActionText
              }
            >
              Directions
            </Text>
          </TouchableOpacity>

          <View
            style={styles.quickDivider}
          />

          <TouchableOpacity
            style={styles.quickAction}
            activeOpacity={0.8}
            onPress={
              handleDownloadToggle
            }
          >
            <View
              style={
                styles.quickActionIcon
              }
            >
              {isDownloaded(
                district.id
              ) ? (
                <Check
                  size={19}
                  color="#1A5F3F"
                />
              ) : (
                <Download
                  size={19}
                  color="#1A5F3F"
                />
              )}
            </View>

            <Text
              style={
                styles.quickActionText
              }
            >
              {isDownloaded(
                district.id
              )
                ? "Offline"
                : "Download"}
            </Text>
          </TouchableOpacity>

          <View
            style={styles.quickDivider}
          />

          <TouchableOpacity
            style={styles.quickAction}
            activeOpacity={0.8}
            onPress={() =>
              toggleFavorite(
                district.id
              )
            }
          >
            <View
              style={
                styles.quickActionIcon
              }
            >
              <Heart
                size={19}
                color={
                  isFavorite(
                    district.id
                  )
                    ? "#FF5364"
                    : "#1A5F3F"
                }
                fill={
                  isFavorite(
                    district.id
                  )
                    ? "#FF5364"
                    : "transparent"
                }
              />
            </View>

            <Text
              style={
                styles.quickActionText
              }
            >
              {isFavorite(
                district.id
              )
                ? "Saved"
                : "Favorite"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ABOUT */}
        <View style={styles.section}>
          <View
            style={
              styles.smallLabelRow
            }
          >
            <Compass
              size={14}
              color="#E48A32"
            />

            <Text
              style={styles.smallLabel}
            >
              ABOUT DESTINATION
            </Text>
          </View>

          <Text style={styles.mainTitle}>
            Discover {district.name}
          </Text>

          <Text
            style={styles.description}
          >
            {district.description}
          </Text>
        </View>

        {/* TOP ATTRACTIONS */}
        <View style={styles.section}>
          <View
            style={
              styles.sectionHeadingRow
            }
          >
            <View style={{ flex: 1 }}>
              <Text
                style={
                  styles.headingTitle
                }
              >
                Top Attractions
              </Text>

              <Text
                style={
                  styles.sectionSubtitle
                }
              >
                Places you shouldn't miss
              </Text>
            </View>

            <View
              style={styles.sectionIcon}
            >
              <MapPin
                size={19}
                color="#1A5F3F"
              />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.placeScroll
            }
          >
            {district.topPlaces.map(
              (
                place: Place,
                index: number
              ) => (
                <TouchableOpacity
                  key={`${place.name}-${index}`}
                  style={styles.placeCard}
                  activeOpacity={0.9}
                  onPress={() =>
                    handleOpenMapTap(
                      place
                    )
                  }
                  onLongPress={() =>
                    handlePlacePress(
                      place
                    )
                  }
                >
                  <Image
                    source={{
                      uri:
                        place.imageUrl,
                    }}
                    style={
                      styles.placeImage
                    }
                  />

                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0,0,0,0.08)",
                      "rgba(0,0,0,0.85)",
                    ]}
                    style={
                      StyleSheet.absoluteFillObject
                    }
                  />

                  <View
                    style={
                      styles.placeNumber
                    }
                  >
                    <Text
                      style={
                        styles.placeNumberText
                      }
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.placeContent
                    }
                  >
                    <Text
                      style={
                        styles.placeName
                      }
                      numberOfLines={2}
                    >
                      {place.name}
                    </Text>

                    <View
                      style={
                        styles.placeAction
                      }
                    >
                      <Navigation
                        size={11}
                        color="#FFFFFF"
                      />

                      <Text
                        style={
                          styles.placeActionText
                        }
                      >
                        Get Route
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            )}
          </ScrollView>

          <Text style={styles.holdHint}>
            Tap for directions • Hold to preview on the map
          </Text>
        </View>

        {/* MAP */}
        <View style={styles.section}>
          <View
            style={
              styles.sectionHeadingRow
            }
          >
            <View style={{ flex: 1 }}>
              <Text
                style={
                  styles.headingTitle
                }
              >
                Explore on Map
              </Text>

              <Text
                style={
                  styles.sectionSubtitle
                }
              >
                Find your way around
              </Text>
            </View>

            <View
              style={styles.sectionIcon}
            >
              <Map
                size={19}
                color="#1A5F3F"
              />
            </View>
          </View>

          <View
            style={styles.mapContainer}
          >
            <MapView
              ref={mapRef}
              style={styles.map}
              scrollEnabled
              zoomEnabled
              initialRegion={{
                ...districtCoords,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              <Marker
                coordinate={markerCoords}
                title={district.name}
              />
            </MapView>

            <TouchableOpacity
              style={
                styles.directionButton
              }
              activeOpacity={0.9}
              onPress={() =>
                handleOpenMapTap({
                  name: district.name,
                  latitude:
                    districtCoords.latitude,
                  longitude:
                    districtCoords.longitude,
                  description: "",
                  imageUrl: "",
                })
              }
            >
              <View
                style={
                  styles.directionIcon
                }
              >
                <Navigation
                  size={17}
                  color="#1A5F3F"
                />
              </View>

              <Text
                style={
                  styles.directionText
                }
              >
                Get Directions
              </Text>

              <ChevronRight
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* HISTORY */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <View
              style={
                styles.infoCardHeader
              }
            >
              <View
                style={
                  styles.historyIcon
                }
              >
                <History
                  size={22}
                  color="#1A5F3F"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={
                    styles.infoEyebrow
                  }
                >
                  STORY & HERITAGE
                </Text>

                <Text
                  style={
                    styles.infoTitle
                  }
                >
                  Historical Significance
                </Text>
              </View>
            </View>

            <Text
              style={styles.infoText}
            >
              {
                district.historicalSignificance
              }
            </Text>
          </View>
        </View>

        {/* FOOD */}
        <View
          style={[
            styles.section,
            styles.lastSection,
          ]}
        >
          <View
            style={
              styles.sectionHeadingRow
            }
          >
            <View style={{ flex: 1 }}>
              <Text
                style={
                  styles.headingTitle
                }
              >
                Must Try Food
              </Text>

              <Text
                style={
                  styles.sectionSubtitle
                }
              >
                Taste local favorites
              </Text>
            </View>

            <View
              style={[
                styles.sectionIcon,
                styles.foodIconBox,
              ]}
            >
              <Utensils
                size={19}
                color="#E48A32"
              />
            </View>
          </View>

          <View style={styles.foodGrid}>
            {district.mustTryFood.map(
              (
                food: string,
                index: number
              ) => (
                <View
                  key={`${food}-${index}`}
                  style={
                    styles.foodChip
                  }
                >
                  <View
                    style={
                      styles.foodDot
                    }
                  />

                  <Text
                    style={
                      styles.foodText
                    }
                  >
                    {food}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F5",
  },

  errorContainer: {
    flex: 1,
    backgroundColor: "#F4F7F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  errorIcon: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: "#E7F2EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#24322C",
  },

  errorText: {
    marginTop: 6,
    color: "#8A948F",
    fontSize: 14,
  },

  errorButton: {
    marginTop: 24,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 16,
    backgroundColor: "#1A5F3F",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  errorButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  heroContainer: {
    width: "100%",
    height: 430,
    position: "relative",
    overflow: "hidden",
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  backButton: {
    position: "absolute",
    top: 52,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor:
      "rgba(0,0,0,0.32)",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  topActions: {
    position: "absolute",
    top: 52,
    right: 20,
    flexDirection: "row",
    gap: 10,
    zIndex: 10,
  },

  heroIconButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor:
      "rgba(0,0,0,0.32)",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  heroContent: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 50,
  },

  destinationBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:
      "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.20)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },

  destinationBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginLeft: 5,
  },

  districtName: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 44,
    maxWidth: width - 60,
  },

  heroLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    gap: 6,
  },

  heroProvince: {
    color:
      "rgba(255,255,255,0.90)",
    fontSize: 14,
    fontWeight: "500",
  },

  quickActionsCard: {
    height: 90,
    marginHorizontal: 20,
    marginTop: -28,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    zIndex: 20,
  },

  quickAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  quickActionIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#EAF4EE",
    alignItems: "center",
    justifyContent: "center",
  },

  quickActionIconActive: {
    backgroundColor: "#1A5F3F",
  },

  quickActionText: {
    color: "#47534D",
    marginTop: 6,
    fontSize: 11,
    fontWeight: "700",
  },

  quickDivider: {
    height: 42,
    width: 1,
    backgroundColor: "#E8ECEA",
  },

  section: {
    marginTop: 32,
  },

  lastSection: {
    marginBottom: 20,
  },

  smallLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 7,
  },

  smallLabel: {
    color: "#E48A32",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginLeft: 6,
  },

  mainTitle: {
    marginHorizontal: 20,
    color: "#24322C",
    fontSize: 23,
    fontWeight: "800",
  },

  description: {
    marginHorizontal: 20,
    marginTop: 11,
    color: "#66716B",
    fontSize: 15,
    lineHeight: 24,
  },

  sectionHeadingRow: {
    marginHorizontal: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
  },

  headingTitle: {
    color: "#24322C",
    fontSize: 22,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#8A948F",
    fontSize: 12,
    marginTop: 4,
  },

  sectionIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#E8F3EC",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  placeScroll: {
    paddingHorizontal: 20,
    gap: 14,
  },

  placeCard: {
    width: width * 0.66,
    height: 210,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#D8DFDB",
    elevation: 4,
  },

  placeImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  placeNumber: {
    position: "absolute",
    top: 13,
    left: 13,
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor:
      "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },

  placeNumberText: {
    color: "#1A5F3F",
    fontSize: 11,
    fontWeight: "800",
  },

  placeContent: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 14,
  },

  placeName: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 23,
  },

  placeAction: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  placeActionText: {
    marginLeft: 5,
    color:
      "rgba(255,255,255,0.82)",
    fontSize: 11,
    fontWeight: "600",
  },

  holdHint: {
    marginHorizontal: 20,
    marginTop: 9,
    color: "#9AA39F",
    fontSize: 10,
  },

  mapContainer: {
    height: 285,
    marginHorizontal: 20,
    borderRadius: 26,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#DDE5E0",
    elevation: 4,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  directionButton: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 15,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#1A5F3F",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 6,
  },

  directionIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  directionText: {
    flex: 1,
    marginLeft: 11,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  infoCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EBE7",
    elevation: 2,
  },

  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#E8F3EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  infoEyebrow: {
    color: "#E48A32",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 3,
  },

  infoTitle: {
    color: "#24322C",
    fontSize: 18,
    fontWeight: "800",
  },

  infoText: {
    color: "#65716B",
    fontSize: 14,
    lineHeight: 23,
  },

  foodIconBox: {
    backgroundColor: "#FFF5E8",
  },

  foodGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  foodChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3EAE6",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },

  foodDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#E48A32",
    marginRight: 7,
  },

  foodText: {
    color: "#45524C",
    fontSize: 13,
    fontWeight: "600",
  },
});