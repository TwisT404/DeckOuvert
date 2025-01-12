import { useNavigationState } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, BackHandler, Pressable, View, Text, FlatList, ActivityIndicator, ImageBackground, StyleSheet, Button } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Play() {
  const isCurrentPage = useNavigationState(
    (state) => state.routes[state.index].name === 'game' // Check if the current page is '/game' and return a bool
    
  );
  //Can't go the first of the game so install a back Handler
  const handler = () =>{
    if (isCurrentPage) {
    Alert.alert('Attends!', "Es-tu sur de vouloir quiiter la partie?", [
      {
        text: 'Non',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Partir', onPress: () => router.push("/deck/ChooseDecks")},
    ]);
    
      return true;
    }
    return false;
  };
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);

    return () => BackHandler.removeEventListener("hardwareBackPress", handler);
  }, [handler]);

  const url = "https://mdubois.alwaysdata.net/apiReigns/v3/reigns/carte/deck/order";
  const { deck_id } = useLocalSearchParams<{ deck_id: string }>();
  const { titre_deck } = useLocalSearchParams<{ titre_deck: string }>();
  const { deck_size } = useLocalSearchParams<{ deck_size: string }>();
  const [OrdreSoumission, IncrementOrder] = useState<any>(0);
  const [dataPage, SetDataPage] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [FinanceCounter, IncrementFinCounter] = useState<any>(20);
  const [PopulationCounter, IncrementPopCounter] = useState<any>(20);

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
        if (response.ok) {
          const json= await response.json();
          SetDataPage([json]);
          setLoading(false);
        }

       
      } catch (error) {
        console.error(error);
      }
    }
  };

  function CounterChoices(choiceValue:string) {
    const [value1, value2] = choiceValue.split("/").map(Number); // Convert to numbers
    IncrementFinCounter((prev: number) => prev + value2);
    IncrementPopCounter((prev: number) => prev + value1);
    IncrementOrder((prev: number) => prev + 1);

  }

  const RenderPage = () =>{
    if(PopulationCounter === 0 || FinanceCounter === 0){
      return(
        <View>
          <Text>Vous avez perdu!</Text>
          <Pressable onPress={()=>router.push(
            {
              pathname: "/credits",
              params:{
                deck_id: deck_id,
              }
            })}>
            <Text>Voir les crédits</Text>
          </Pressable>
        </View>
      );
    }
    else if (OrdreSoumission > deck_size) {
      return(
        <View style={finish.view}>
          <Text style={[finish.text,{marginTop:"50%"}]}>La partie est terminé!</Text>
          <Pressable 
            style={finish.button}
            onPress={()=>router.push(
            {
              pathname: "/credits",
              params:{
                deck_id: deck_id,
              }
            })}>
            <Text style={finish.text}>Voir les crédits</Text>
          </Pressable>
        </View>
      );
    }
    else{
      return(
        <ImageBackground style={page.background} source={require("../assets/images/Page_Game_DeckOuvert.png")} resizeMode="cover">
          {isLoading ? (
              <ActivityIndicator />
              ) : (
                <FlatList
                style={{flex:1}}
                data={dataPage}
                keyExtractor={(item) => item["ordre_soumission"]}
                renderItem={({item}) => {
                  return(
                    <View style={page.view}>
                      <View style={page.counterBlock}>
                        <Text style={page.counterWrite}><FontAwesome6 name="people-roof" size={35} color="black" /> = {PopulationCounter}</Text>
                        <Text style={page.counterWrite}><MaterialCommunityIcons name="finance" size={35} color="black" /> = {FinanceCounter}</Text>
                      </View>
                        <Text style={page.text}>{item["texte_carte"]}</Text>
                        <View style={page.buttonBlock}>
                          <Pressable
                            onPress={()=> CounterChoices(item["valeurs_choix1"])}
                            style={page.button}
                          >
                            <Text style={{color:"white", fontSize:15}}>Choix 1</Text>
                          </Pressable>
                          <Pressable
                            onPress={()=> CounterChoices(item["valeurs_choix2"])}
                            style={page.button}
                          >
                            <Text style={{color:"white", fontSize:15}}>Choix 2</Text>
                          </Pressable>
                        </View>

                    </View>
                  )
                }}
              />
              ) 
          }
        </ImageBackground>
      )
    }

  }

  const RenderBookCover = () => {
      return(
          <ImageBackground style={cover.background} source={require("../assets/images/Couverture_de_jeu.png")} resizeMode="cover">
            <Pressable onPress={() => IncrementOrder((prev: number) => prev + 1)}  style={cover.pressable}>      
                <Text style={[cover.writing, cover.title]}>{titre_deck}</Text>
                <Text style={cover.writing}>Appuyer pour commencer</Text>      
            </Pressable>
          </ImageBackground>


      )
  }


  useEffect(() => {
    if (OrdreSoumission <= deck_size) {
      getCardsFromAPI();
    }
  }, [OrdreSoumission]);

 


  return (
    <View>
      { 
        OrdreSoumission === 0 ? RenderBookCover(): RenderPage()
      } 
    </View> 
  );
}

const cover = StyleSheet.create({
  background:{ 
    height:"100%",
  },
  pressable:{
    flex:1,
    justifyContent:"space-evenly",
  },
  writing:{
    color: "white",
    textAlign:"center",
    fontWeight:"bold",
    fontSize:15,
  },
  title:{
    fontSize:25,
  }

});

const page = StyleSheet.create({
  background:{ 
    height:"100%",

  },
  view:{  
    flex:1,
    alignItems:"center",
    gap: 30,
  },
  counterWrite:{
    fontSize:35,
  },
  counterBlock:{
    flexDirection:"row",
    gap: 35,
    marginBlock: "20%",
  },
  buttonBlock:{
    flex: 1,
    flexDirection: "row",
    gap: 15,
  },
  button:{
    flex:1,
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    width: 50,
    height: 75,
    backgroundColor:"#3644DB",
    margin: 15,
    color: "white",
    borderRadius: 15,
  },
  text:{
    height: 250,
    fontSize: 20,
    width: "75%",
  },

});


const finish = StyleSheet.create({
    view:{
      backgroundColor:"#07091A",
      height: "100%",
      alignItems:"center",
      gap: 50,
    },
    text:{
      textAlign: "center",
      color: "white",
      fontSize: 20,
    },
    button:{
      textAlign:"center",
      alignItems:"center",
      justifyContent:"center",
      width: 150,
      height: 75,
      backgroundColor:"#3644DB",

      color: "white",
      borderRadius: 15,
    },

});
