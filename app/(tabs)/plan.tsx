import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
} from "react-native";
import {
  CalendarDays,
  MapPin,
  Plus,
  Trash2,
  Wallet,
  Plane,
  X,
  ChevronRight,
  Sparkles,
  Navigation,
  CloudSun,
  Hotel,
  Bus,
  Car,
  Train,
  Utensils,
  NotebookPen,
  Save,
  Check,
  Pencil,
  RotateCcw,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { districts } from "../../data/districts";

type TransportType = "Car" | "Bus" | "Train" | "Other";

interface TripDay {
  dayNumber: number;
  districtId: string | null;
  placeNames: string[];
  hotelName: string;
  note: string;
}

interface SavedTravelPlan {
  tripName: string;
  startDate: string;
  endDate: string;
  selectedDistrictIds: string[];
  transportType: TransportType;
  hotelBudget: string;
  transportBudget: string;
  foodBudget: string;
  otherBudget: string;
  notes: string;
  tripDays: TripDay[];
  savedAt: string;
}

const STORAGE_KEY = "serendib_travel_plan";
const GREEN = "#1A5F3F";
const LIGHT_GREEN = "#EAF4EE";
const ORANGE = "#E48A32";

export default function TravelPlanScreen() {
  const router = useRouter();

  const [tripName, setTripName] = useState("My Sri Lanka Trip");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [selectedDistrictIds, setSelectedDistrictIds] = useState<string[]>([]);
  const [destinationModalVisible, setDestinationModalVisible] = useState(false);

  const [transportType, setTransportType] = useState<TransportType>("Car");

  const [hotelBudget, setHotelBudget] = useState("");
  const [transportBudget, setTransportBudget] = useState("");
  const [foodBudget, setFoodBudget] = useState("");
  const [otherBudget, setOtherBudget] = useState("");

  const [notes, setNotes] = useState("");
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);

  const numberOfDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const difference = end.getTime() - start.getTime();
    const calculated = Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

    return Math.max(1, calculated);
  }, [startDate, endDate]);

  useEffect(() => {
    setTripDays((currentDays) => {
      const updated: TripDay[] = [];

      for (let i = 0; i < numberOfDays; i++) {
        if (currentDays[i]) {
          updated.push({ ...currentDays[i], dayNumber: i + 1 });
        } else {
          updated.push({
            dayNumber: i + 1,
            districtId: null,
            placeNames: [],
            hotelName: "",
            note: "",
          });
        }
      }

      return updated;
    });
  }, [numberOfDays]);

  const selectedDistricts = useMemo(
    () => districts.filter((district) => selectedDistrictIds.includes(district.id)),
    [selectedDistrictIds]
  );

  const totalBudget = useMemo(() => {
    return (
      (Number(hotelBudget) || 0) +
      (Number(transportBudget) || 0) +
      (Number(foodBudget) || 0) +
      (Number(otherBudget) || 0)
    );
  }, [hotelBudget, transportBudget, foodBudget, otherBudget]);

  useEffect(() => {
    loadTravelPlan();
  }, []);

  const loadTravelPlan = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const plan: SavedTravelPlan = JSON.parse(saved);

      setTripName(plan.tripName || "My Sri Lanka Trip");
      setStartDate(new Date(plan.startDate));
      setEndDate(new Date(plan.endDate));
      setSelectedDistrictIds(plan.selectedDistrictIds || []);
      setTransportType(plan.transportType || "Car");
      setHotelBudget(plan.hotelBudget || "");
      setTransportBudget(plan.transportBudget || "");
      setFoodBudget(plan.foodBudget || "");
      setOtherBudget(plan.otherBudget || "");
      setNotes(plan.notes || "");
      setTripDays(plan.tripDays || []);
    } catch (error) {
      console.log("LOAD PLAN ERROR:", error);
    }
  };

  const saveTravelPlan = async () => {
    if (!tripName.trim()) {
      Alert.alert("Trip Name Required", "Please enter a name for your travel plan.");
      return;
    }

    try {
      const plan: SavedTravelPlan = {
        tripName: tripName.trim(),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        selectedDistrictIds,
        transportType,
        hotelBudget,
        transportBudget,
        foodBudget,
        otherBudget,
        notes,
        tripDays,
        savedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(plan));

      Alert.alert(
        "Travel Plan Saved 🌴",
        "Your Sri Lanka travel plan has been saved successfully."
      );
    } catch (error) {
      console.log("SAVE PLAN ERROR:", error);
      Alert.alert("Save Failed", "Unable to save your travel plan.");
    }
  };

  const resetForm = () => {
    const today = new Date();

    setTripName("My Sri Lanka Trip");
    setStartDate(today);
    setEndDate(today);
    setSelectedDistrictIds([]);
    setTransportType("Car");
    setHotelBudget("");
    setTransportBudget("");
    setFoodBudget("");
    setOtherBudget("");
    setNotes("");
    setTripDays([
      {
        dayNumber: 1,
        districtId: null,
        placeNames: [],
        hotelName: "",
        note: "",
      },
    ]);
  };

  const deleteTravelPlan = () => {
    Alert.alert(
      "Delete Travel Plan?",
      "This will remove your saved travel plan.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(STORAGE_KEY);
            resetForm();
          },
        },
      ]
    );
  };

  const toggleDistrict = (id: string) => {
    setSelectedDistrictIds((current) =>
      current.includes(id)
        ? current.filter((districtId) => districtId !== id)
        : [...current, id]
    );
  };

  const removeDistrict = (id: string) => {
    setSelectedDistrictIds((current) =>
      current.filter((districtId) => districtId !== id)
    );

    setTripDays((current) =>
      current.map((day) =>
        day.districtId === id
          ? { ...day, districtId: null, placeNames: [], hotelName: "" }
          : day
      )
    );
  };

  const updateDay = (index: number, updates: Partial<TripDay>) => {
    setTripDays((current) =>
      current.map((day, currentIndex) =>
        currentIndex === index ? { ...day, ...updates } : day
      )
    );
  };

  const toggleDayPlace = (dayIndex: number, placeName: string) => {
    const currentDay = tripDays[dayIndex];
    if (!currentDay) return;

    const exists = currentDay.placeNames.includes(placeName);
    const updated = exists
      ? currentDay.placeNames.filter((name) => name !== placeName)
      : [...currentDay.placeNames, placeName];

    updateDay(dayIndex, { placeNames: updated });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDayDate = (index: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);
    return formatDate(date);
  };

  const openDistrictMap = (district: any) => {
    router.push({
      pathname: "/(tabs)/map",
      params: {
        destLat: district.coordinates?.latitude,
        destLng: district.coordinates?.longitude,
        destName: district.name,
      },
    });
  };

  const openWeather = (district: any) => {
    router.push({
      pathname: "/(tabs)/weather",
      params: { district: district.name },
    });
  };

  const editingDay =
    editingDayIndex !== null ? tripDays[editingDayIndex] : null;

  const editingDistrict =
    editingDay?.districtId
      ? districts.find((district) => district.id === editingDay.districtId)
      : null;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <LinearGradient
          colors={["#103D2B", "#1A5F3F", "#2E8B57"]}
          style={styles.header}
        >
          <View style={styles.headerDecoration} />

          <View style={styles.headerTop}>
            <View style={styles.headerIcon}>
              <Plane size={25} color="#FFFFFF" />
            </View>

            <TouchableOpacity style={styles.resetTopButton} onPress={deleteTravelPlan}>
              <Trash2 size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerEyebrow}>PLAN YOUR JOURNEY</Text>
          <Text style={styles.headerTitle}>Travel Planner</Text>
          <Text style={styles.headerSubtitle}>
            Create your perfect Sri Lanka adventure
          </Text>
        </LinearGradient>

        <View style={styles.mainCard}>
          <View style={styles.orangeLabelRow}>
            <Sparkles size={14} color={ORANGE} />
            <Text style={styles.orangeLabel}>TRIP DETAILS</Text>
          </View>

          <Text style={styles.inputLabel}>Trip Name</Text>

          <TextInput
            style={styles.textInput}
            value={tripName}
            onChangeText={setTripName}
            placeholder="Enter your trip name"
            placeholderTextColor="#A0A9A4"
          />

          <View style={styles.dateRow}>
            <TouchableOpacity
              style={[styles.dateBox, { marginRight: 7 }]}
              onPress={() => setShowStartPicker(true)}
            >
              <CalendarDays size={21} color={GREEN} />

              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Start</Text>
                <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dateBox, { marginLeft: 7 }]}
              onPress={() => setShowEndPicker(true)}
            >
              <CalendarDays size={21} color={GREEN} />

              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>End</Text>
                <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.daysSummary}>
            <CalendarDays size={18} color={GREEN} />
            <Text style={styles.daysSummaryText}>
              {numberOfDays} {numberOfDays === 1 ? "Day" : "Days"} Adventure
            </Text>
          </View>
        </View>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            minimumDate={new Date()}
            onChange={(_, selectedDate) => {
              setShowStartPicker(false);

              if (selectedDate) {
                setStartDate(selectedDate);
                if (selectedDate > endDate) setEndDate(selectedDate);
              }
            }}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            minimumDate={startDate}
            onChange={(_, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Destinations</Text>
              <Text style={styles.sectionSubtitle}>
                {selectedDistricts.length} destinations selected
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setDestinationModalVisible(true)}
            >
              <Plus size={17} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {selectedDistricts.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIcon}>
                <MapPin size={30} color={GREEN} />
              </View>

              <Text style={styles.emptyTitle}>Choose your destinations</Text>

              <Text style={styles.emptyDescription}>
                Add the districts you want to explore during your trip.
              </Text>

              <TouchableOpacity
                style={styles.emptyAction}
                onPress={() => setDestinationModalVisible(true)}
              >
                <Plus size={17} color="#FFFFFF" />
                <Text style={styles.emptyActionText}>Add Destination</Text>
              </TouchableOpacity>
            </View>
          ) : (
            selectedDistricts.map((district, index) => (
              <View key={district.id} style={styles.destinationCard}>
                <Image
                  source={{ uri: district.imageUrl }}
                  style={styles.destinationImage}
                />

                <View style={styles.destinationNumber}>
                  <Text style={styles.destinationNumberText}>{index + 1}</Text>
                </View>

                <TouchableOpacity
                  style={styles.destinationInfo}
                  onPress={() => router.push(`/district/${district.id}`)}
                >
                  <Text style={styles.destinationName} numberOfLines={1}>
                    {district.name}
                  </Text>

                  <View style={styles.locationRow}>
                    <MapPin size={12} color="#87928C" />
                    <Text style={styles.destinationProvince}>
                      {district.province} Province
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.destinationDelete}
                  onPress={() => removeDistrict(district.id)}
                >
                  <Trash2 size={17} color="#E45868" />
                </TouchableOpacity>

                <ChevronRight size={18} color="#ABB3AF" />
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Transport</Text>
              <Text style={styles.sectionSubtitle}>How will you travel?</Text>
            </View>

            <Bus size={23} color={GREEN} />
          </View>

          <View style={styles.transportGrid}>
            <TransportButton
              label="Car"
              selected={transportType === "Car"}
              icon={
                <Car
                  size={22}
                  color={transportType === "Car" ? "#FFFFFF" : GREEN}
                />
              }
              onPress={() => setTransportType("Car")}
            />

            <TransportButton
              label="Bus"
              selected={transportType === "Bus"}
              icon={
                <Bus
                  size={22}
                  color={transportType === "Bus" ? "#FFFFFF" : GREEN}
                />
              }
              onPress={() => setTransportType("Bus")}
            />

            <TransportButton
              label="Train"
              selected={transportType === "Train"}
              icon={
                <Train
                  size={22}
                  color={transportType === "Train" ? "#FFFFFF" : GREEN}
                />
              }
              onPress={() => setTransportType("Train")}
            />

            <TransportButton
              label="Other"
              selected={transportType === "Other"}
              icon={
                <Plane
                  size={22}
                  color={transportType === "Other" ? "#FFFFFF" : GREEN}
                />
              }
              onPress={() => setTransportType("Other")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Daily Itinerary</Text>
              <Text style={styles.sectionSubtitle}>
                Plan each day of your journey
              </Text>
            </View>

            <CalendarDays size={23} color={GREEN} />
          </View>

          {tripDays.map((day, index) => {
            const dayDistrict = day.districtId
              ? districts.find((district) => district.id === day.districtId)
              : null;

            return (
              <TouchableOpacity
                key={day.dayNumber}
                style={styles.dayCard}
                activeOpacity={0.9}
                onPress={() => setEditingDayIndex(index)}
              >
                <View style={styles.dayTopRow}>
                  <View style={styles.dayNumberBox}>
                    <Text style={styles.dayNumberSmall}>DAY</Text>
                    <Text style={styles.dayNumber}>{day.dayNumber}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.dayDate}>{getDayDate(index)}</Text>
                    <Text style={styles.dayDistrict}>
                      {dayDistrict ? dayDistrict.name : "Choose destination"}
                    </Text>
                  </View>

                  <View style={styles.editDayButton}>
                    <Pencil size={17} color={GREEN} />
                  </View>
                </View>

                {day.placeNames.length > 0 && (
                  <View style={styles.dayPlaces}>
                    {day.placeNames.slice(0, 3).map((place) => (
                      <View key={place} style={styles.dayPlaceChip}>
                        <MapPin size={10} color={GREEN} />
                        <Text style={styles.dayPlaceText} numberOfLines={1}>
                          {place}
                        </Text>
                      </View>
                    ))}

                    {day.placeNames.length > 3 && (
                      <Text style={styles.morePlaces}>
                        +{day.placeNames.length - 3} more
                      </Text>
                    )}
                  </View>
                )}

                {day.hotelName ? (
                  <View style={styles.dayHotelRow}>
                    <Hotel size={14} color={ORANGE} />
                    <Text style={styles.dayHotelText}>{day.hotelName}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Trip Budget</Text>
              <Text style={styles.sectionSubtitle}>
                Estimate your travel expenses
              </Text>
            </View>

            <Wallet size={23} color={GREEN} />
          </View>

          <View style={styles.budgetCard}>
            <BudgetInput
              title="Hotels"
              icon={<Hotel size={19} color={GREEN} />}
              value={hotelBudget}
              onChangeText={setHotelBudget}
            />

            <View style={styles.budgetDivider} />

            <BudgetInput
              title="Transport"
              icon={<Bus size={19} color={GREEN} />}
              value={transportBudget}
              onChangeText={setTransportBudget}
            />

            <View style={styles.budgetDivider} />

            <BudgetInput
              title="Food"
              icon={<Utensils size={19} color={GREEN} />}
              value={foodBudget}
              onChangeText={setFoodBudget}
            />

            <View style={styles.budgetDivider} />

            <BudgetInput
              title="Other"
              icon={<Wallet size={19} color={GREEN} />}
              value={otherBudget}
              onChangeText={setOtherBudget}
            />

            <LinearGradient
              colors={["#103D2B", "#1A5F3F"]}
              style={styles.totalBudgetBox}
            >
              <View>
                <Text style={styles.totalBudgetLabel}>TOTAL ESTIMATED BUDGET</Text>
                <Text style={styles.totalBudgetValue}>
                  LKR {totalBudget.toLocaleString()}
                </Text>
              </View>

              <Wallet size={29} color="#FFFFFF" />
            </LinearGradient>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Travel Notes</Text>
              <Text style={styles.sectionSubtitle}>
                Keep reminders and important details
              </Text>
            </View>

            <NotebookPen size={23} color={GREEN} />
          </View>

          <TextInput
            style={styles.notesInput}
            multiline
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
            placeholder="Hotel bookings, tickets, activities, reminders..."
            placeholderTextColor="#9CA59F"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.saveButton}
          onPress={saveTravelPlan}
        >
          <Save size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Travel Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            Alert.alert(
              "Reset Plan?",
              "Clear all current travel plan details?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Reset", onPress: resetForm },
              ]
            );
          }}
        >
          <RotateCcw size={17} color="#69756F" />
          <Text style={styles.resetButtonText}>Reset Current Plan</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={destinationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDestinationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Add Destinations</Text>
                <Text style={styles.modalSubtitle}>
                  Select districts for your journey
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setDestinationModalVisible(false)}
              >
                <X size={21} color="#28352F" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {districts.map((district) => {
                const selected = selectedDistrictIds.includes(district.id);

                return (
                  <TouchableOpacity
                    key={district.id}
                    style={[
                      styles.modalDistrictCard,
                      selected && styles.modalDistrictSelected,
                    ]}
                    onPress={() => toggleDistrict(district.id)}
                  >
                    <Image
                      source={{ uri: district.imageUrl }}
                      style={styles.modalDistrictImage}
                    />

                    <View style={{ flex: 1 }}>
                      <Text style={styles.modalDistrictName}>{district.name}</Text>
                      <Text style={styles.modalDistrictProvince}>
                        {district.province} Province
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.selectionCircle,
                        selected && styles.selectionCircleSelected,
                      ]}
                    >
                      {selected && <Check size={15} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}

              <View style={{ height: 20 }} />
            </ScrollView>

            <TouchableOpacity
              style={styles.modalDoneButton}
              onPress={() => setDestinationModalVisible(false)}
            >
              <Check size={18} color="#FFFFFF" />
              <Text style={styles.modalDoneText}>
                Done ({selectedDistrictIds.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={editingDayIndex !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setEditingDayIndex(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dayModalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {editingDay ? `Day ${editingDay.dayNumber}` : "Plan Day"}
                </Text>

                <Text style={styles.modalSubtitle}>
                  {editingDayIndex !== null ? getDayDate(editingDayIndex) : ""}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setEditingDayIndex(null)}
              >
                <X size={21} color="#28352F" />
              </TouchableOpacity>
            </View>

            {editingDayIndex !== null && editingDay && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
              >
                <Text style={styles.modalSectionTitle}>Destination</Text>

                {selectedDistricts.length === 0 ? (
                  <View style={styles.dayWarning}>
                    <Text style={styles.dayWarningText}>
                      Add destinations first before planning this day.
                    </Text>
                  </View>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dayDistrictScroll}
                  >
                    {selectedDistricts.map((district) => {
                      const selected = editingDay.districtId === district.id;

                      return (
                        <TouchableOpacity
                          key={district.id}
                          style={[
                            styles.dayDistrictChoice,
                            selected && styles.dayDistrictChoiceSelected,
                          ]}
                          onPress={() =>
                            updateDay(editingDayIndex, {
                              districtId: district.id,
                              placeNames: [],
                              hotelName: "",
                            })
                          }
                        >
                          <Image
                            source={{ uri: district.imageUrl }}
                            style={styles.dayDistrictChoiceImage}
                          />

                          <Text
                            style={[
                              styles.dayDistrictChoiceText,
                              selected && styles.dayDistrictChoiceTextSelected,
                            ]}
                          >
                            {district.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                )}

                {editingDistrict && (
                  <>
                    <Text style={styles.modalSectionTitle}>Places to Visit</Text>

                    <View style={styles.modalPlaceGrid}>
                      {editingDistrict.topPlaces.map((place: any) => {
                        const selected = editingDay.placeNames.includes(place.name);

                        return (
                          <TouchableOpacity
                            key={place.name}
                            style={[
                              styles.modalPlaceCard,
                              selected && styles.modalPlaceCardSelected,
                            ]}
                            onPress={() =>
                              toggleDayPlace(editingDayIndex, place.name)
                            }
                          >
                            <Image
                              source={{ uri: place.imageUrl }}
                              style={styles.modalPlaceImage}
                            />

                            <View style={styles.modalPlaceInfo}>
                              <Text
                                style={styles.modalPlaceName}
                                numberOfLines={2}
                              >
                                {place.name}
                              </Text>

                              {selected && <Check size={16} color={GREEN} />}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    <Text style={styles.modalSectionTitle}>Accommodation</Text>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.hotelScroll}
                    >
                      {editingDistrict.hotels.map(
                        (hotelItem: any, hotelIndex: number) => {
                          const selected =
                            editingDay.hotelName === hotelItem.name;

                          return (
                            <TouchableOpacity
                              key={`${hotelItem.name}-${hotelIndex}`}
                              style={[
                                styles.hotelChoice,
                                selected && styles.hotelChoiceSelected,
                              ]}
                              onPress={() =>
                                updateDay(editingDayIndex, {
                                  hotelName: hotelItem.name,
                                })
                              }
                            >
                              <Hotel
                                size={20}
                                color={selected ? "#FFFFFF" : GREEN}
                              />

                              <Text
                                style={[
                                  styles.hotelChoiceName,
                                  selected && styles.hotelChoiceNameSelected,
                                ]}
                                numberOfLines={2}
                              >
                                {hotelItem.name}
                              </Text>

                              <Text
                                style={[
                                  styles.hotelPrice,
                                  selected && styles.hotelPriceSelected,
                                ]}
                              >
                                {hotelItem.priceRange}
                              </Text>
                            </TouchableOpacity>
                          );
                        }
                      )}
                    </ScrollView>

                    <View style={styles.quickDayActions}>
                      <TouchableOpacity
                        style={styles.mapDayButton}
                        onPress={() => openDistrictMap(editingDistrict)}
                      >
                        <Navigation size={17} color="#FFFFFF" />
                        <Text style={styles.mapDayButtonText}>Open Map</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.weatherDayButton}
                        onPress={() => openWeather(editingDistrict)}
                      >
                        <CloudSun size={17} color={GREEN} />
                        <Text style={styles.weatherDayButtonText}>Weather</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                <Text style={styles.modalSectionTitle}>Day Notes</Text>

                <TextInput
                  style={styles.dayNotesInput}
                  multiline
                  textAlignVertical="top"
                  value={editingDay.note}
                  onChangeText={(value) =>
                    updateDay(editingDayIndex, { note: value })
                  }
                  placeholder="Add notes for this day..."
                  placeholderTextColor="#9DA6A1"
                />
              </ScrollView>
            )}

            <TouchableOpacity
              style={styles.modalDoneButton}
              onPress={() => setEditingDayIndex(null)}
            >
              <Check size={18} color="#FFFFFF" />
              <Text style={styles.modalDoneText}>Save Day</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function TransportButton({
  label,
  selected,
  icon,
  onPress,
}: {
  label: string;
  selected: boolean;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.transportButton,
        selected && styles.transportButtonSelected,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {icon}

      <Text
        style={[
          styles.transportText,
          selected && styles.transportTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function BudgetInput({
  title,
  icon,
  value,
  onChangeText,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.budgetRow}>
      <View style={styles.budgetIcon}>{icon}</View>

      <View style={{ flex: 1 }}>
        <Text style={styles.budgetTitle}>{title}</Text>

        <View style={styles.budgetInputRow}>
          <Text style={styles.currency}>LKR</Text>

          <TextInput
            style={styles.budgetInput}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#A7AFAA"
            value={value}
            onChangeText={(text) =>
              onChangeText(text.replace(/[^0-9]/g, ""))
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F5",
  },
  header: {
    height: 280,
    paddingTop: 62,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    overflow: "hidden",
  },
  headerDecoration: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.05)",
    right: -80,
    top: -60,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  resetTopButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerEyebrow: {
    color: "#F5BD62",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 5,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 13,
    marginTop: 5,
  },
  mainCard: {
    marginHorizontal: 20,
    marginTop: -30,
    padding: 20,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    elevation: 9,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
  },
  orangeLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },
  orangeLabel: {
    marginLeft: 6,
    color: ORANGE,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  inputLabel: {
    color: "#53605A",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
  },
  textInput: {
    height: 52,
    backgroundColor: "#F5F7F6",
    borderRadius: 16,
    paddingHorizontal: 15,
    color: "#24322C",
    fontSize: 15,
  },
  dateRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  dateBox: {
    flex: 1,
    minHeight: 67,
    borderRadius: 18,
    backgroundColor: "#F2F7F4",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dateTextContainer: {
    marginLeft: 9,
    flex: 1,
  },
  dateLabel: {
    color: "#8D9792",
    fontSize: 10,
  },
  dateValue: {
    color: "#33423A",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },
  daysSummary: {
    marginTop: 15,
    paddingVertical: 11,
    borderRadius: 15,
    backgroundColor: LIGHT_GREEN,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  daysSummaryText: {
    marginLeft: 7,
    color: GREEN,
    fontSize: 13,
    fontWeight: "800",
  },
  section: {
    marginTop: 31,
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  addButton: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },
  emptyCard: {
    marginHorizontal: 20,
    padding: 27,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5EBE7",
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    marginTop: 14,
    color: "#24322C",
    fontSize: 18,
    fontWeight: "800",
  },
  emptyDescription: {
    marginTop: 6,
    maxWidth: 260,
    color: "#89938E",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  emptyAction: {
    marginTop: 18,
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
  },
  emptyActionText: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginLeft: 6,
  },
  destinationCard: {
    height: 92,
    marginHorizontal: 20,
    marginBottom: 11,
    paddingRight: 12,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    elevation: 2,
  },
  destinationImage: {
    width: 90,
    height: "100%",
  },
  destinationNumber: {
    position: "absolute",
    left: 8,
    top: 8,
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  destinationNumberText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: "800",
  },
  destinationInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  destinationName: {
    color: "#24322C",
    fontSize: 16,
    fontWeight: "800",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  destinationProvince: {
    color: "#87928C",
    fontSize: 11,
    marginLeft: 4,
  },
  destinationDelete: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#FFF0F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  transportGrid: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transportButton: {
    width: "23%",
    minHeight: 85,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E9E6",
    alignItems: "center",
    justifyContent: "center",
  },
  transportButtonSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
    elevation: 5,
  },
  transportText: {
    color: "#56635D",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 7,
  },
  transportTextSelected: {
    color: "#FFFFFF",
  },
  dayCard: {
    marginHorizontal: 20,
    marginBottom: 13,
    padding: 17,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5EAE7",
  },
  dayTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayNumberBox: {
    width: 53,
    height: 53,
    borderRadius: 17,
    backgroundColor: LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  dayNumberSmall: {
    color: "#7B8982",
    fontSize: 8,
    fontWeight: "800",
  },
  dayNumber: {
    color: GREEN,
    fontSize: 20,
    fontWeight: "900",
  },
  dayDate: {
    color: "#909A95",
    fontSize: 10,
  },
  dayDistrict: {
    color: "#28372F",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 3,
  },
  editDayButton: {
    width: 37,
    height: 37,
    borderRadius: 13,
    backgroundColor: LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  dayPlaces: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 14,
  },
  dayPlaceChip: {
    maxWidth: "47%",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#F2F7F4",
    flexDirection: "row",
    alignItems: "center",
  },
  dayPlaceText: {
    marginLeft: 4,
    color: "#526159",
    fontSize: 10,
    fontWeight: "600",
    flexShrink: 1,
  },
  morePlaces: {
    alignSelf: "center",
    color: ORANGE,
    fontSize: 10,
    fontWeight: "700",
  },
  dayHotelRow: {
    marginTop: 12,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: "#EDF0EE",
    flexDirection: "row",
    alignItems: "center",
  },
  dayHotelText: {
    marginLeft: 7,
    color: "#65716B",
    fontSize: 11,
    fontWeight: "600",
  },
  budgetCard: {
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  budgetRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 63,
  },
  budgetIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  budgetTitle: {
    color: "#7C8882",
    fontSize: 11,
  },
  budgetInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  currency: {
    color: GREEN,
    fontSize: 11,
    fontWeight: "800",
    marginRight: 7,
  },
  budgetInput: {
    flex: 1,
    paddingVertical: 0,
    color: "#25342C",
    fontSize: 18,
    fontWeight: "800",
  },
  budgetDivider: {
    height: 1,
    backgroundColor: "#EDF1EF",
    marginVertical: 4,
  },
  totalBudgetBox: {
    minHeight: 88,
    borderRadius: 20,
    paddingHorizontal: 18,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalBudgetLabel: {
    color: "rgba(255,255,255,0.67)",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  totalBudgetValue: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    marginTop: 5,
  },
  notesInput: {
    height: 130,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4EAE6",
    color: "#27352E",
    fontSize: 14,
    lineHeight: 21,
  },
  saveButton: {
    height: 59,
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 19,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 8,
  },
  resetButton: {
    height: 50,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resetButtonText: {
    marginLeft: 7,
    color: "#69756F",
    fontSize: 13,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.43)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    height: "83%",
    backgroundColor: "#F4F7F5",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 21,
  },
  dayModalSheet: {
    height: "90%",
    backgroundColor: "#F4F7F5",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 21,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingBottom: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    color: "#24322C",
    fontSize: 22,
    fontWeight: "800",
  },
  modalSubtitle: {
    color: "#89938E",
    fontSize: 11,
    marginTop: 3,
  },
  modalClose: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  modalDistrictCard: {
    height: 82,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 8,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  modalDistrictSelected: {
    backgroundColor: "#F0F8F3",
    borderColor: GREEN,
  },
  modalDistrictImage: {
    width: 66,
    height: 66,
    borderRadius: 14,
    marginRight: 12,
  },
  modalDistrictName: {
    color: "#24322C",
    fontSize: 15,
    fontWeight: "800",
  },
  modalDistrictProvince: {
    color: "#89938E",
    fontSize: 11,
    marginTop: 4,
  },
  selectionCircle: {
    width: 29,
    height: 29,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DCE4E0",
    alignItems: "center",
    justifyContent: "center",
  },
  selectionCircleSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  modalDoneButton: {
    height: 56,
    marginHorizontal: 20,
    marginTop: 9,
    marginBottom: 20,
    borderRadius: 18,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalDoneText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 7,
  },
  modalSectionTitle: {
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 12,
    color: "#26352D",
    fontSize: 17,
    fontWeight: "800",
  },
  dayWarning: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 17,
    backgroundColor: "#FFF5E8",
  },
  dayWarningText: {
    color: "#9A6A2F",
    fontSize: 12,
    lineHeight: 18,
  },
  dayDistrictScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  dayDistrictChoice: {
    width: 105,
    padding: 7,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "transparent",
  },
  dayDistrictChoiceSelected: {
    borderColor: GREEN,
    backgroundColor: "#F0F8F3",
  },
  dayDistrictChoiceImage: {
    width: "100%",
    height: 65,
    borderRadius: 13,
  },
  dayDistrictChoiceText: {
    marginTop: 7,
    marginBottom: 3,
    textAlign: "center",
    color: "#54615B",
    fontSize: 11,
    fontWeight: "700",
  },
  dayDistrictChoiceTextSelected: {
    color: GREEN,
  },
  modalPlaceGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalPlaceCard: {
    width: "48%",
    marginBottom: 11,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "transparent",
  },
  modalPlaceCardSelected: {
    borderColor: GREEN,
  },
  modalPlaceImage: {
    width: "100%",
    height: 105,
  },
  modalPlaceInfo: {
    minHeight: 54,
    padding: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalPlaceName: {
    flex: 1,
    color: "#344239",
    fontSize: 11,
    fontWeight: "700",
    marginRight: 4,
  },
  hotelScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  hotelChoice: {
    width: 160,
    minHeight: 105,
    padding: 14,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E9E6",
  },
  hotelChoiceSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  hotelChoiceName: {
    color: "#344239",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 9,
  },
  hotelChoiceNameSelected: {
    color: "#FFFFFF",
  },
  hotelPrice: {
    color: ORANGE,
    fontSize: 10,
    marginTop: 5,
    fontWeight: "700",
  },
  hotelPriceSelected: {
    color: "rgba(255,255,255,0.76)",
  },
  quickDayActions: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  mapDayButton: {
    flex: 1,
    height: 50,
    marginRight: 6,
    borderRadius: 16,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mapDayButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
    marginLeft: 6,
  },
  weatherDayButton: {
    flex: 1,
    height: 50,
    marginLeft: 6,
    borderRadius: 16,
    backgroundColor: LIGHT_GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherDayButtonText: {
    color: GREEN,
    fontWeight: "700",
    fontSize: 12,
    marginLeft: 6,
  },
  dayNotesInput: {
    minHeight: 105,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4EAE6",
    color: "#344239",
    fontSize: 13,
  },
});
