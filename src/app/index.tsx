import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GetStarted() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('../assets/images/logo-corae.png')}
          className="h-40 w-40"
          resizeMode="contain"
        />
      </View>
      <View className="w-full p-4">
        <TouchableOpacity
          className="bg-[#7D9C4A] h-12 rounded-lg items-center justify-center"
          onPress={() => router.push('/login')}
        >
          <Text className="text-white text-lg font-bold">Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4 h-12 rounded-lg items-center justify-center border border-primary"
          onPress={() => router.push('/register')}
        >
          <Text className="text-primary text-lg font-bold">Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
