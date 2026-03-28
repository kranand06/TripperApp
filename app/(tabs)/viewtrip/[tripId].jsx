import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { db } from "../../../services/firebase";

import ScreenWrapper from "../../components/ScreenWrapper";

import Hotels from "../../components/ViewTrip/Hotels";
import Info from "../../components/ViewTrip/Info";
import Itinerary from "../../components/ViewTrip/Itinerary";

export const LocationContext = createContext();

export default function ViewTrip() {
  const [location, setLocation] = useState(false);
  const { tripId } = useLocalSearchParams();
  const [Data, setData] = useState();

  useEffect(() => {
    if (tripId) GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "tripper", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const res = docSnap.data();
        setData(res);
        setLocation(res?.userInput?.place);
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <ScreenWrapper>
        {!Data ? (
          <ActivityIndicator style={{ marginTop: 50 }} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 2,
              paddingTop: 14,
              paddingBottom: 40,
            }}
          >
            <Info Data={Data} />
            <Hotels hotel={Data?.tripInfo?.hotelOptions} />
            <Itinerary data={Data?.tripInfo.itinerary} />
          </ScrollView>
        )}
      </ScreenWrapper>
    </LocationContext.Provider>
  );
}