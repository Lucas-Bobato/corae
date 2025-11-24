import { View, Pressable, Text, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';

interface HeaderProps {
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
}

export function Header({ leftComponent, centerComponent, rightComponent }: HeaderProps) {
  return (
    <View className="bg-white pt-4 pb-2 px-4 shadow-sm">
      <View className="w-full h-12 flex-row justify-between items-center">

        {/* Parte da esquerda */}
        <View className="flex-1 items-start">
          {leftComponent}
        </View>

        {/* Titulo da página ( Centralizado ) */}
        <View className="flex-2 items-center">
          {centerComponent}
        </View>

        {/* Parte da direita */}
        <View className="flex-1 items-end">
          {rightComponent}
        </View>
        
      </View>
    </View>
  );
}