import { router, Stack } from "expo-router";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="deck/ChooseDecks"
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: 15,
                }}
              >
                Choississez votre livre
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#07091A",
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerRight: () => (
            <Pressable onPressIn={() => router.push("/info")}
            style={{ alignItems:"center", justifyContent:"center"}}>
              <AntDesign name="infocirlceo" size={40} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="deck/[deck_id]"
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#fff",
                  fontWeight: "bold",
                  marginBottom: 20
                }}
              >
                Informations sur le deck
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#07091A",
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="info"
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <View
              style={{
                height: 150,
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#fff",
                  fontWeight: "bold",
                  marginBottom: 20
                }}
              >
                Comment jouer à ce jeu ?
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#07091A",
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen 
        name="game" 
        options={{
          headerBackVisible: false,
          headerShown: false,
        }}
          
      />
      <Stack.Screen 
        name="credits" 
        options={{
          headerBackVisible: false,
          headerTitle: () => (
              <View>
                <Text style={{      
                  fontSize: 25,
                  color: "#fff",
                  fontWeight: "bold",
                  marginBottom: 20,
                  marginTop: 20,
                }}>CRÉDITS POUR CE DECK</Text>
              </View>
            
            ),
          headerStyle: {
            backgroundColor: "#07091A",
          },
          headerTitleAlign: "center",
        }}
          
      />
    </Stack>
  );
}
