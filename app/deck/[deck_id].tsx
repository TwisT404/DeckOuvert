import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";

export default function DeckPresentation() {
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>();
  const [dataDeck, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const url = "https://mdubois.alwaysdata.net/apiReigns/v3/reigns/deck/id";

  const getDeckFromAPI = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deck_id,
        }),
      });
      const json = await response.json();
      setData([json]); // Update state with fetched data
      setLoading(false); // Stop loading
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDeckFromAPI();
  }, [isLoading]);

  return (
    <View style={styles.view}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dataDeck}
          keyExtractor={(item) => item["id_deck"]}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.containerDeck}>
                  <Text style={styles.text}>Titre : {item["titre_deck"]}</Text>
                  <View>
                    <Text style={styles.text}>Description :</Text>
                    <Text style={styles.text}>{item["body_deck"]}</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>Nombre de cartes :</Text>
                    <Text style={styles.text}>{item["nb_cartes"]}</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>
                      Nombre de personnes qui ont aimés :
                    </Text>
                    <Text style={styles.text}>{item["nb_jaime"]}</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>Date de création :</Text>
                    <Text style={styles.text}>{item["date_debut_deck"]}</Text>
                  </View>
                </View>
                <View style={styles.containerBtn}>
                  <Pressable
                    style={[styles.btn, styles.back]}
                    onPress={() => router.push("/deck/ChooseDecks")}
                  >
                    <Text style={[styles.text, styles.textBtn]}>Retour</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.btn, styles.play]}
                    onPress={() => {
                      router.push({
                        pathname: "/deck/[deck_id]",
                        params: {
                          deck_id: item.id_deck,
                          titre_deck: item.titre_deck,
                          deck_size: item.count,
                        },
                      });
                    }}
                  >
                    <Text style={[styles.text, styles.textBtn]}>Jouer</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#07091A",
  },
  text: {
    color: "white",
  },
  container: {
    gap: 50,
  },
  containerDeck: {
    width: "75%",
    marginLeft: 25,
    marginBlock: 25,
    gap: 15,
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  btn: {
    width: 100,
    height: 45,
    backgroundColor: "#ccc",
    borderRadius: 15,
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
  },
  textBtn: {
    fontSize: 16,
    color: "#fff", // Couleur du texte blanc
    textAlign: "center",
  },
  play: {
    backgroundColor: "#44DB36",
  },
  back: {
    backgroundColor: "#3644DB",
  },
});
