import { router } from "expo-router";
import { BackHandler, View, Text, StyleSheet, Pressable } from "react-native";

export default function Index() {


  return (
    <View style={styles.view}>
      <Text style={styles.description}>
        DeckOuvert est un jeu narratif stratégique développé par Nerial, mêlant
        éléments de simulation de règne et de jeu de cartes. Vous incarnez un
        souverain (roi ou reine, selon les versions) qui doit gérer un royaume
        en prenant des décisions rapides grâce à un système de bouton qui
        définira deux décisions. Chaque décision affecte deux piliers de votre
        règne : le Peuple et les Finances.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/deck/ChooseDecks")}
      >
        <Text style={{ color: "white" }}>Retour</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 50,
    backgroundColor: "#07091A",
  },
  description: {
    width: "80%",
    textAlign: "center",
    color: "white",
    fontSize: 20,
    marginTop: 50,
  },
  button: {
    marginTop: 50,
    backgroundColor: "#3644DB",
    width: 90,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
