import { BackHandler, Text, View } from "react-native";

export default function ChooseDecks() {
    BackHandler.addEventListener("hardwareBackPress", ()=>{
        return true;
    })

    return (
        <View><Text>Hello World!</Text></View>
    );
}