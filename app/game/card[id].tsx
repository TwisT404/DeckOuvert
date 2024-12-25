import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Play() {
  const url =
    "https://mdubois.alwaysdata.net/apiReigns/v3/reigns/carte/deck/order";
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>();
  const { titre_deck } = useLocalSearchParams<{ titre_deck: string }>();
  const { size_deck } = useLocalSearchParams<{ size_deck: string }>();
  let OrdreSoumission = 0;
  const [dataPage, SetDataPage] = useState<any>([]);

  const getCardsFromAPI = async () => {
    if (OrdreSoumission != 0) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: deck_id,
            order: OrdreSoumission,
          }),
        });
        const json = await response.json();
        SetDataPage(json);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCardsFromAPI();
  }, [OrdreSoumission]);
  return ( 
        <View>{dataPage === 0 ? 
              <View>
              </View> 
              : 
              <View></View>
            }
        </View>);
}
