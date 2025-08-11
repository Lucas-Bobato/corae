import { ScrollView, SafeAreaView } from "react-native";
import { Banner } from "../components/banner";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { Suggestion } from "../components/suggestion";
import { Footer } from "../components/footer";

export default function Home() {
  return (
  <SafeAreaView className="w-full flex-1 pt-4 mb-1">
    <Header />
      <ScrollView
      style={{ flex: 1 }}
      className="bg-white"
      showsVerticalScrollIndicator={false}>

        <Search />

        <Banner />

        <Suggestion />

      </ScrollView>
      <Footer />
    </SafeAreaView>

  );
}
