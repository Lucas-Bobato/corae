import { ScrollView, SafeAreaView } from "react-native";
import { Banner } from "../components/banner";
import { Header } from "../components/header/home";
import { Search } from "../components/search";
import { Suggestion } from "../components/suggestion";
import { Footer } from "../components/footer";
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
  <SafeAreaView className="w-full flex-1 pt-4 mb-1">
    <Header />
      <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}>

        <Search />

        <Banner />

        <Suggestion />

      </ScrollView>
      <Footer />
    </SafeAreaView>

  );
}
