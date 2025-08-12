import { ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Footer } from '../components/footer';
import { HeaderFavorite } from '../components/header/favorite';
import { TabsFavorite } from '../components/favorite';
import { Tabs } from 'expo-router';

export default function Favorite() {
  return (
    <SafeAreaView className="w-full flex-1 pt-4 mb-1">

      <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}>

        <HeaderFavorite />

        <TabsFavorite />

      </ScrollView>

      <Footer />
      
    </SafeAreaView>
  );
}