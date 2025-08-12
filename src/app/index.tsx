import { ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Footer } from '../components/footer';
import { HeaderFavorite } from '../components/header/favorite';
import { Tabs } from 'expo-router';
import { TabsFavorite } from '../components/tabs';

export default function Favorite() {
  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderFavorite />
        <TabsFavorite />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}