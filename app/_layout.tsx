import { router, Stack } from "expo-router";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";

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
                  color: "white",
                  fontSize: 25,
                  width: 200,
                  textAlign: "center",
                  letterSpacing: 3,
                  fontWeight: "bold",
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
            <Pressable onPress={() => router.push("/info")}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/images/info.png")}
              />
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
                  color: "white",
                  fontSize: 25,
                  width: 200,
                  textAlign: "center",
                  letterSpacing: 3,
                  fontWeight: "bold",
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
                  color: "white",
                  fontSize: 25,
                  width: 200,
                  textAlign: "center",
                  letterSpacing: 3,
                  fontWeight: "bold",
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
          headerShown: false,
        }}
          
      />
    </Stack>
  );
}
