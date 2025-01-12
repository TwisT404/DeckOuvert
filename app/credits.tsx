import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, ActivityIndicator, BackHandler, Alert, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigationState } from "@react-navigation/native";

export default function Credits() {


    const isCurrentPage = useNavigationState(
      (state) => state.routes[state.index].name === 'credits' // Check if the current page is 'deck/ChooseDecks' and return a bool
    );
    //Install a backhandler to return on main menu instead of get back on previous page
    const handler = () =>{
      if (isCurrentPage) {
        router.push("/deck/ChooseDecks");
        return true;
      }
      return false;
    };
    
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handler);
  
      return () => BackHandler.removeEventListener("hardwareBackPress", handler);
    }, [handler]);
    
    const urlLike = "https://mdubois.alwaysdata.net/apiReigns/v3/reigns/deck/like";
    const urlMaker = "https://mdubois.alwaysdata.net/apiReigns/v3/reigns/createur/names";
    const { deck_id } = useLocalSearchParams<{ deck_id: string }>();
    const [dataMaker, setData] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
    const [isPress, setPress] = useState(false);



    const giveLikeToDeck = async () => {
        try {
            await fetch(urlLike, {
              method: "PATCH",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: deck_id,
              }),
            });
            setPress(true);
          } catch (error) {
            console.error(error);
          }
    }

    const getMakersFromAPI = async () => {
        try {
          const response = await fetch(urlMaker, {
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
          setData(json);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
    };

    useEffect(() => {
      getMakersFromAPI();
    }, [isLoading]);

    const handleLike = () => {
      setPress(true);
      giveLikeToDeck();
      
    };
  
    return (
      <View style={credits.container}>
        <Text style={credits.title}>CRÉDITS POUR CE DECK</Text>
        <Text style={credits.subtitle}>Liste des auteurs:</Text>
        <View style={credits.listContainer}>
          {isLoading ? (
            <ActivityIndicator/>
          ) : (
            <FlatList
              data={dataMaker}
              numColumns={3}
              keyExtractor={(item) => item["id_createur"]}
              renderItem={({ item }) => (
                <View>
                  <Text style={credits.author}>{item["nom_createur"]}</Text>
                </View>
              )}
            />
          )}
        </View>
        <View style={credits.feedbackSection}>
          <Text style={credits.feedbackText}>Avez-vous apprécié cette partie?</Text>
          <Pressable onPress={handleLike}>
            <AntDesign
              name={isPress ? "heart" : "hearto"}
              size={24}
              color="blue"
            />
          </Pressable>
        </View>
        <Pressable
          style={credits.backButton}
          onPress={() => router.push("/deck/ChooseDecks")}
        >
          <Text style={credits.backButtonText}>Retour sur la page principale</Text>
        </Pressable>
      </View>
    );
  };

  const credits = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#07091A", // Couleur de fond foncée
      alignItems: "center",
      padding: 20,
    },
    title: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 16,
      color: "#fff",
      marginBottom: 10,
    },
    listContainer: {
      width: "100%",
      padding: 10,
      borderRadius: 10,
      height: 200, // Fixe la hauteur
      marginBottom: 20,
    },
    author: {
      fontSize: 14,
      color: "white",
    },
    feedbackSection: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      gap: 15,
    },
    feedbackText: {
      fontSize: 16,
      color: "#fff",
      marginRight: 10,
    },
    backButton: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 20,
    },
    backButtonText: {
      color: "#fff",
      fontSize: 16,
    },
  });