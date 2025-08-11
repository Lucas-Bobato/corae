import { ScrollView, SafeAreaView } from "react-native";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { Suggestion } from "../components/suggestion";
import { Footer } from "../components/footer";

export default function Index() {
  return (
  <SafeAreaView className="w-full px-4 flex-1 pt-4 mb-1">
      <ScrollView
      style={{ flex: 1 }}
      className="bg-white"
      showsVerticalScrollIndicator={false}>
        <Header />

        <Search />

        <Suggestion />

      </ScrollView>
      <Footer />
    </SafeAreaView>

  );
}
