import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="deck/ChooseDecks" options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="info" options={{
        // headerShown: false,
      }}/>
  </Stack>
  )
}
