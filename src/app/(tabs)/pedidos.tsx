import { View, SafeAreaView, StatusBar } from 'react-native';
import { Footer } from '../../components/footer';

export default function Pedidos() {
 return (
   <SafeAreaView className="w-full flex-1 pt-4 mb-auto">
     <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

     <Footer />
   </SafeAreaView>
  );
}