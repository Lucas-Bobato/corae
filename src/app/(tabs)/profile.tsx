import { ScrollView, TouchableOpacity, SafeAreaView, Text, StatusBar } from 'react-native';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Ionicons } from '@expo/vector-icons';
import { ProfileInfo } from '../../components/profile/info';
import { SettingsItem } from '../../components/profile/settingsItem';
import { SectionTitle } from '../../components/profile/settingsTitle';
import { useRouter } from 'expo-router';

export default function Perfil() {
  const router = useRouter();

  return (
  <SafeAreaView className="w-full flex-1 pt-4 mb-auto">
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back("/")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
            <Text className="font-bold text-xl text-black">Perfil</Text>
        }
        rightComponent={
            <Ionicons name="heart" size={24} color="transparent" />
        }
      />

      <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}>

        <ProfileInfo />

        <SectionTitle title="Conta" />
        <SettingsItem icon="heart-outline" label="Favoritos" onPress={() => router.push('/favorite')} />
        <SettingsItem icon="receipt-outline" label="Histórico de Pedidos" onPress={() => router.push('/pedidos')} />
        <SettingsItem icon="card-outline" label="Métodos de pagamento" onPress={() => router.push('/paymentMethods')} />
        <SettingsItem icon="location-outline" label="Endereços" onPress={() => router.push('/addresses')} />

        <SectionTitle title="Configurações" />
        <SettingsItem icon="notifications-outline" label="Notificações" onPress={() => router.push('/notifications')} />
        <SettingsItem icon="help-circle-outline" label="Ajuda" onPress={() => router.push('/help')} />

      </ScrollView>

      <Footer />
      
    </SafeAreaView>
  );
}