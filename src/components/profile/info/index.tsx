import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ProfileInfo() {
  return (
  <View className='items-center justify-center flex-1'>
    <Ionicons name="person-circle-outline" size={150} color="black" />
    <Text className="text-2xl font-bold">Bruno Deud</Text>
    <Text className="text-lg text-[#7D9C4A]">Membro do Clube</Text>
  </View>
  );
}