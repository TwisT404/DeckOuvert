import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useNavigationState } from "@react-navigation/native";


export default function ChooseDecks() {

  const isCurrentPage = useNavigationState(
    (state) => state.routes[state.index].name === 'deck/ChooseDecks' // Check if the current page is 'deck/ChooseDecks' and return a bool
  );
  //Can't go the first of the game so install a back Handler
  const handler = () =>{
    if (isCurrentPage) {
    Alert.alert('Attends!', "Es-tu sur de vouloir quiiter l'application?", [
      {
        text: 'Non',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Partir', onPress: () => BackHandler.exitApp()},
    ]);
    
      return true;
    }
    return false;
  };
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);

    return () => BackHandler.removeEventListener("hardwareBackPress", handler);
  }, [handler]);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nbMin, setNbMin] = useState("");
  const [nbMax, setNbMax] = useState("");

  const [isPress, setIsPress] = useState(null);

  //Fetch on URL API in method GET
  const url =
    "https://mdubois.alwaysdata.net/apiReigns/v3/reigns/deck/valid/minmax";

  const getAllDecksFromAPI = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max: nbMax,
          min: nbMin,
        }),
      });
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  
//Update when a value Min adn/or Max change on the 
  useEffect(() => {
    getAllDecksFromAPI();
    setIsPress(null);
  }, [nbMax, nbMin]);

  //Function to change css of an select item when it si on press
  const selectItem = {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#3644DB",
  };

  const btnPlay = () => {
    if (isPress) {
      return (
        <View style={styles.btnContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              router.push({
                pathname: "/deck/[deck_id]",
                params: { deck_id: isPress },
              });
            }}
          >
            <Text style={{ color: "white" }}>Voir le deck</Text>
          </Pressable>
        </View>
      );
    }
  };

  return (
    <View style={styles.backgroundApp}>

      <View style={styles.sortMinMax}>
        <Text style={styles.textInput}>
          Nombre de carte minimum et maximum:
        </Text>
        <View style={styles.containerInput}>
          <TextInput
            keyboardType="numeric"
            value={nbMin}
            placeholder="Min"
            onChangeText={(newMinValue) => setNbMin(newMinValue)}
            placeholderTextColor={"white"}
            style={styles.input}
          />
          <TextInput
            keyboardType="numeric"
            value={nbMax}
            placeholder="Max"
            onChangeText={(newMaxValue) => setNbMax(newMaxValue)}
            placeholderTextColor={"white"}
            style={styles.input}
          />
        </View>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={{ height: 400, overflowY: "scroll" }}
            data={data}
            numColumns={3}
            keyExtractor={(item) => item["id_deck"]}
            renderItem={({ item }) => {
              const isSelected = isPress === item["id_deck"];
              return (
                <Pressable
                  onPress={() => setIsPress(item["id_deck"])}
                  style={[isSelected ? selectItem : null, styles.Pressable]}
                >
                  <Image style={{width: 35, height: 35,}} source={require("../../assets/images/livre.png")}/>
                  <Text style={styles.TitleDeck}>{item["titre_deck"]}</Text>
                </Pressable>
              );
            }}
          />
        )}
        {btnPlay()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundApp: {
    backgroundColor: "#07091A",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
  infoIcone: {
    width: 35,
    height: 35,
  },
  TitleDeck: {
    color: "white",
  },

  sortMinMax: {
    gap: 20,
    height: 150,
  },

  textInput: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  containerInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },

  input: {
    width: 100,
    fontSize: 15,
    height: 45,
    color: "white",
    borderColor: "#3644DB",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 15,
  },

  Pressable: {
    marginLeft: 25,
    marginTop: 10,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 100,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#3644DB",
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
