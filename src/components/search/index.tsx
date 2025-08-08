import { View, TextInput, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export function Search() {
 return (
   <View className='w-full flex-row h-14 rounded-md items-center gap-2 px-4 bg-white shadow-md'>
     <Ionicons name="search" size={20} color="gray" />
     <TextInput
       placeholder="Procure por tipo de comida ou restrição"
       className="flex-1 h-full bg-white text-gray-500"
       placeholderTextColor="gray"
     />
     <View className="w-px h-6 bg-gray-300" />
     <Ionicons name="filter" size={20} color="red" />
   </View>
 );
}