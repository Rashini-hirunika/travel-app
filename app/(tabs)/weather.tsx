import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  RefreshCw,
  CloudSun,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Sparkles,
} from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";

import { districts } from "../../data/districts";

const { width } = Dimensions.get("window");

const API_KEY = "e68c2556113f3fc5fba830f6b97cc3f6";

const GREEN = "#1A5F3F";
const DARK_GREEN = "#103D2B";
const LIGHT_GREEN = "#EAF4EE";
const ORANGE = "#E48A32";
const BG = "#F4F7F5";
const TEXT = "#24322C";
const MUTED = "#84908A";

export default function WeatherScreen() {
  const params = useLocalSearchParams();

  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Colombo");

  useEffect(() => {
    if (params.district && typeof params.district === "string") {
      setSelectedCity(params.district);
    }
  }, [params.district]);

  const fetchWeather = async (city: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )},LK&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        Alert.alert(
          "Weather unavailable",
          `Weather information for ${city} could not be found.`
        );
      }
    } catch (error) {
      console.log("WEATHER FETCH ERROR:", error);

      Alert.alert(
        "Network Error",
        "Unable to load weather information. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const getBGColors = (): readonly [string, string, ...string[]] => {
    if (!weatherData) {
      return [DARK_GREEN, GREEN, "#2E8B57"];
    }

    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].main.toLowerCase();

    if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("thunder")
    ) {
      return ["#254E70", "#1D3557", "#102A43"];
    }

    if (condition.includes("cloud")) {
      return ["#5D737E", "#78909C", "#455A64"];
    }

    if (temp >= 29) {
      return ["#F2994A", "#F2C94C", "#E48A32"];
    }

    return ["#2E8B57", "#1A5F3F", "#103D2B"];
  };

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "--";

    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const visibilityKm = weatherData?.visibility
    ? (weatherData.visibility / 1000).toFixed(1)
    : "--";

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={[DARK_GREEN, GREEN, "#2E8B57"]}
          style={styles.header}
        >
          <View style={styles.headerDecorationOne} />
          <View style={styles.headerDecorationTwo} />

          <View style={styles.headerTop}>
            <View>
              <View style={styles.eyebrowRow}>
                <Sparkles size={13} color="#F5BD62" />

                <Text style={styles.eyebrow}>
                  SERENDIB WEATHER
                </Text>
              </View>

              <Text style={styles.headerTitle}>
                Weather
              </Text>

              <Text style={styles.headerSubtitle}>
                Live weather across Sri Lanka
              </Text>
            </View>

            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => fetchWeather(selectedCity)}
              disabled={loading}
            >
              <RefreshCw
                size={21}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.citySection}>
          <View style={styles.cityTitleRow}>
            <Text style={styles.citySectionTitle}>
              Select District
            </Text>

            <Text style={styles.citySectionSubtitle}>
              {selectedCity}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cityList}
          >
            {districts.map((district) => {
              const selected =
                selectedCity === district.name;

              return (
                <TouchableOpacity
                  key={district.id}
                  activeOpacity={0.8}
                  onPress={() =>
                    setSelectedCity(district.name)
                  }
                  style={[
                    styles.cityChip,
                    selected &&
                      styles.cityChipSelected,
                  ]}
                >
                  <MapPin
                    size={13}
                    color={
                      selected
                        ? "#FFFFFF"
                        : GREEN
                    }
                  />

                  <Text
                    style={[
                      styles.cityChipText,
                      selected &&
                        styles.cityChipTextSelected,
                    ]}
                  >
                    {district.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {loading && !weatherData ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator
              size="large"
              color={GREEN}
            />

            <Text style={styles.loadingTitle}>
              Checking the sky...
            </Text>

            <Text style={styles.loadingText}>
              Loading weather for {selectedCity}
            </Text>
          </View>
        ) : (
          <>
            <LinearGradient
              colors={getBGColors()}
              style={styles.heroCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.heroDecorationOne} />
              <View style={styles.heroDecorationTwo} />

              <View style={styles.locationTag}>
                <MapPin
                  size={14}
                  color="#FFFFFF"
                />

                <Text style={styles.locationText}>
                  {weatherData?.name || selectedCity},
                  {" "}Sri Lanka
                </Text>
              </View>

              {weatherData && (
                <>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
                    }}
                    style={styles.mainIcon}
                  />

                  <Text style={styles.tempMain}>
                    {Math.round(
                      weatherData.main.temp
                    )}
                    °
                  </Text>

                  <Text style={styles.description}>
                    {
                      weatherData.weather[0]
                        .description
                    }
                  </Text>

                  <Text style={styles.feelsHero}>
                    Feels like{" "}
                    {Math.round(
                      weatherData.main.feels_like
                    )}
                    °C
                  </Text>

                  <View style={styles.minMaxRow}>
                    <View style={styles.minMaxBox}>
                      <Text style={styles.minMaxLabel}>
                        HIGH
                      </Text>

                      <Text style={styles.minMaxValue}>
                        {Math.round(
                          weatherData.main.temp_max
                        )}
                        °
                      </Text>
                    </View>

                    <View style={styles.minMaxDivider} />

                    <View style={styles.minMaxBox}>
                      <Text style={styles.minMaxLabel}>
                        LOW
                      </Text>

                      <Text style={styles.minMaxValue}>
                        {Math.round(
                          weatherData.main.temp_min
                        )}
                        °
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </LinearGradient>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Weather Details
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Current conditions in {selectedCity}
                </Text>
              </View>

              <CloudSun
                size={23}
                color={GREEN}
              />
            </View>

            <View style={styles.infoGrid}>
              <WeatherInfoCard
                icon={
                  <Droplets
                    color="#2196F3"
                    size={21}
                  />
                }
                iconBackground="#E3F2FD"
                value={`${weatherData?.main?.humidity ?? "--"}%`}
                label="Humidity"
              />

              <WeatherInfoCard
                icon={
                  <Wind
                    color="#43A047"
                    size={21}
                  />
                }
                iconBackground="#E8F5E9"
                value={`${weatherData?.wind?.speed ?? "--"} m/s`}
                label="Wind"
              />

              <WeatherInfoCard
                icon={
                  <Thermometer
                    color="#FF9800"
                    size={21}
                  />
                }
                iconBackground="#FFF3E0"
                value={
                  weatherData?.main?.feels_like !==
                  undefined
                    ? `${Math.round(
                        weatherData.main.feels_like
                      )}°C`
                    : "--"
                }
                label="Feels Like"
              />
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Atmosphere
                </Text>

                <Text style={styles.sectionSubtitle}>
                  More weather information
                </Text>
              </View>
            </View>

            <View style={styles.detailsCard}>
              <DetailRow
                icon={
                  <Eye
                    size={20}
                    color={GREEN}
                  />
                }
                title="Visibility"
                value={`${visibilityKm} km`}
              />

              <View style={styles.divider} />

              <DetailRow
                icon={
                  <Gauge
                    size={20}
                    color={GREEN}
                  />
                }
                title="Pressure"
                value={`${weatherData?.main?.pressure ?? "--"} hPa`}
              />

              <View style={styles.divider} />

              <DetailRow
                icon={
                  <Sunrise
                    size={20}
                    color={ORANGE}
                  />
                }
                title="Sunrise"
                value={formatTime(
                  weatherData?.sys?.sunrise
                )}
              />

              <View style={styles.divider} />

              <DetailRow
                icon={
                  <Sunset
                    size={20}
                    color={ORANGE}
                  />
                }
                title="Sunset"
                value={formatTime(
                  weatherData?.sys?.sunset
                )}
              />
            </View>

            <View style={styles.travelTip}>
              <View style={styles.travelTipIcon}>
                <Sparkles
                  size={20}
                  color={ORANGE}
                />
              </View>

              <View style={styles.travelTipContent}>
                <Text style={styles.travelTipLabel}>
                  TRAVEL TIP
                </Text>

                <Text style={styles.travelTipText}>
                  {weatherData?.weather?.[0]?.main
                    ?.toLowerCase()
                    .includes("rain")
                    ? "Rain is expected. Carry an umbrella and plan indoor attractions too."
                    : weatherData?.main?.temp >=
                      29
                    ? "It is warm today. Stay hydrated and use sun protection while exploring."
                    : "The weather looks comfortable for exploring. Enjoy your journey!"}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function WeatherInfoCard({
  icon,
  iconBackground,
  value,
  label,
}: {
  icon: React.ReactNode;
  iconBackground: string;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.infoCard}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor:
              iconBackground,
          },
        ]}
      >
        {icon}
      </View>

      <Text style={styles.infoValue}>
        {value}
      </Text>

      <Text style={styles.infoLabel}>
        {label}
      </Text>
    </View>
  );
}

function DetailRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIcon}>
        {icon}
      </View>

      <Text style={styles.detailTitle}>
        {title}
      </Text>

      <Text style={styles.detailValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  scrollContent: {
    paddingBottom: 140,
  },

  header: {
    height: 230,
    paddingTop: 62,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    overflow: "hidden",
  },

  headerDecorationOne: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(255,255,255,0.05)",
    right: -80,
    top: -70,
  },

  headerDecorationTwo: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.04)",
    left: -50,
    bottom: -50,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  eyebrow: {
    color: "#F5BD62",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginLeft: 5,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 6,
  },

  headerSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    marginTop: 5,
  },

  refreshButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  citySection: {
    marginTop: -39,
  },

  cityTitleRow: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 17,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    elevation: 6,
  },

  citySectionTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "800",
  },

  citySectionSubtitle: {
    color: GREEN,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },

  cityList: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },

  cityChip: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    marginRight: 9,
    borderWidth: 1,
    borderColor: "#E2E8E5",
    flexDirection: "row",
    alignItems: "center",
  },

  cityChipSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
    elevation: 4,
  },

  cityChipText: {
    color: "#64716A",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },

  cityChipTextSelected: {
    color: "#FFFFFF",
  },

  loadingCard: {
    marginHorizontal: 20,
    marginTop: 40,
    paddingVertical: 55,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  loadingTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 17,
  },

  loadingText: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  heroCard: {
    minHeight: 450,
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 32,
    padding: 24,
    alignItems: "center",
    overflow: "hidden",
    elevation: 10,
  },

  heroDecorationOne: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.08)",
    right: -95,
    top: -80,
  },

  heroDecorationTwo: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.06)",
    left: -65,
    bottom: -50,
  },

  locationTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 15,
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },

  mainIcon: {
    width: 145,
    height: 145,
    marginTop: 8,
    marginBottom: -18,
  },

  tempMain: {
    color: "#FFFFFF",
    fontSize: 82,
    fontWeight: "900",
    letterSpacing: -4,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textTransform: "capitalize",
    marginTop: -4,
  },

  feelsHero: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 6,
  },

  minMaxRow: {
    width: "100%",
    marginTop: 22,
    paddingVertical: 14,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.13)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  minMaxBox: {
    flex: 1,
    alignItems: "center",
  },

  minMaxDivider: {
    width: 1,
    height: 32,
    backgroundColor:
      "rgba(255,255,255,0.22)",
  },

  minMaxLabel: {
    color:
      "rgba(255,255,255,0.65)",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },

  minMaxValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 3,
  },

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  infoCard: {
    width: (width - 60) / 3,
    minHeight: 135,
    paddingVertical: 16,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  iconCircle: {
    width: 43,
    height: 43,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 11,
  },

  infoValue: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "800",
  },

  infoLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },

  detailsCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    elevation: 2,
  },

  detailRow: {
    minHeight: 67,
    flexDirection: "row",
    alignItems: "center",
  },

  detailIcon: {
    width: 41,
    height: 41,
    borderRadius: 14,
    backgroundColor: LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  detailTitle: {
    flex: 1,
    marginLeft: 12,
    color: "#59665F",
    fontSize: 12,
    fontWeight: "700",
  },

  detailValue: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF1EF",
  },

  travelTip: {
    marginHorizontal: 20,
    marginTop: 25,
    padding: 17,
    borderRadius: 22,
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#F5E5CA",
    flexDirection: "row",
  },

  travelTipIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#FFF0D9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  travelTipContent: {
    flex: 1,
  },

  travelTipLabel: {
    color: ORANGE,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  travelTipText: {
    color: "#6C604E",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },
});