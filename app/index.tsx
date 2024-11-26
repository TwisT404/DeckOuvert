import { router } from "expo-router";
import { Pressable, Text, View, Image, StyleSheet } from "react-native";


export default function Index() {
  return (
    <Pressable style={styles.FPview} onPress={()=> router.push("/deck/ChooseDecks")}>
        <View>
          <Image style={styles.logo} source={require("../assets/images/logo.png")}/>
        </View>
        <View style={styles.containerTitle}>
          <Image source={require("../assets/images/Chevrons-up.png")}/>
          <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Toucher l'écran pour jouer!</Text>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
      FPview:{
        backgroundColor: "#07091A",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      },
      logo:{
        width: 250,
        height: 250,
      },
      containerTitle:{
        justifyContent: "center",
        alignItems: "center",
      }
});
