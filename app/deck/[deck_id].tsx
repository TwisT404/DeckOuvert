import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DeckPresentation() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>();
  const url = "";

  const getAllDecksFromAPI = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Hello World! {deck_id}</Text>
    </View>
  );
}
