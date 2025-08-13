import React from 'react';
import { Text } from 'react-native';

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <Text className="text-2xl font-bold text-black px-4 mt-6 mb-2">
      {title}
    </Text>
  );
}