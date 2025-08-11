import { View, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Search() {
  return (
    <View className="mx-4 flex-row px-4 items-center gap-2 bg-gray-100 p-3 rounded-lg border border-gray-200">
      <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          placeholder="Procure por restaurantes"
          className="flex-1 text-base"
          placeholderTextColor="#999"
        />
        <Pressable>
          <Ionicons name="filter" size={20} color="#624e33" />
        </Pressable>
      </View>
  );
}