// Em: src/components/header/index.tsx

import { View, Pressable, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Header() {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Image
        source={require('../../assets/images/logo-corae.png')}
        className="h-10 w-10"
      />

      <View>
        <Text>Corae</Text>
      </View>
      <Pressable className="w-10 h-10 flex justify-center items-center">
        <Ionicons name="menu" size={24} color="#121212" />
      </Pressable>
    </View>
  );
}