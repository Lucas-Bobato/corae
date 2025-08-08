import { View, ScrollView } from "react-native";
import { Header } from "../components/header";
import Constants from "expo-constants";
import { Search } from "../components/search";
import { Suggestion } from "../components/suggestion";


const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView
    style={{ flex: 1 }}
    className="bg-white"
    showsVerticalScrollIndicator={false}>
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8}}>
        <Header />

        <Search />

        <Suggestion />

        </View>


    </ScrollView>
  );
}
