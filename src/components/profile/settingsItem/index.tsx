import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

export function SettingsItem({ icon, label, onPress }: SettingsItemProps) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center w-full px-4 py-2">
      <View className="bg-[#adc47278] p-2 rounded-lg mr-4">
        <Ionicons name={icon} size={24} color="black" />
      </View>

      <Text className="text-lg text-black">{label}</Text>
    </TouchableOpacity>
  );
}