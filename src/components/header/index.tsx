import { View, Pressable, Text, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Header() {
  return (
    <View className="bg-white pt-4 pb-4 px-4 shadow-sm">
      <View className="w-full flex-row justify-between items-center mb-4">
        <Image
          source={require('../../assets/images/logo-corae.png')}
          className="h-12 w-24"
        />

        <View>
          <Text className="text-center text-gray-500 text-xs">Entregar em</Text>
          <Pressable className="flex-row items-center gap-1">
            <Text className="font-bold text-sm">R. Lorem Ipsum, 123</Text>
            <Ionicons name="chevron-down" size={16} color="#FF5C00" />
          </Pressable>
        </View>

        <Pressable>
          <Ionicons name="person-outline" size={24} color="#4C4C4C" />
        </Pressable>
      </View>

      <View className="w-full flex-row items-center gap-2 bg-gray-100 p-3 rounded-lg border border-gray-200">
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          placeholder="Procure por pratos ou comércios"
          className="flex-1 text-base"
          placeholderTextColor="#999"
        />
        <Pressable>
          <Ionicons name="filter" size={20} color="#FF5C00" />
        </Pressable>
      </View>
    </View>
  );
}