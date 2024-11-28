import { BackHandler } from "react-native";

export default function Index() {
    BackHandler.addEventListener("hardwareBackPress", ()=>{
        return false;
    });
}