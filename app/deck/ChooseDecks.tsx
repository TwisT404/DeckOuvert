import { ActivityIndicator, BackHandler, FlatList, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function ChooseDecks() {
    //Block the return to the first page
    BackHandler.addEventListener("hardwareBackPress", ()=>{
        return true;
    });

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    //Fetch on URL API in method GET
    const url = "https://mdubois.alwaysdata.net/apiReigns/v1/reigns/deck";
    let nbMax = 1;
    let nbMin = 10;

    const getAllDecksFromAPI = async () => {
    try {
        const response = await  fetch(url , {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //     nbMax: nbMax,
        //     nbMin: nbMin,
        // }),
        });
        const json = await response.json();
        setData(json);
        setLoading(false);

    } catch (error) {
        console.error(error);
    }
    };

    useEffect(() => {
        getAllDecksFromAPI();
    }, []);

    return (
        <View>
            <View>
                <Text></Text>
            </View>
            <View>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item["id_deck"]}
                        renderItem={({item}) => (
                            <Pressable>
                                <Text>{item["titre_deck"]}</Text>
                            </Pressable>
                        )}
                        
                    /> 
                )}
            </View>
        </View>

    );
}