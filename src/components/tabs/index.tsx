import React, { useState, useRef, useEffect } from 'react';
import { View, Pressable, Text, Animated } from 'react-native';
import { FavoriteRestaurants } from '../favorite/restaurants';
import { FavoriteFoods } from '../favorite/foods';

interface TabMeasures {
  x: number;
  width: number;
}

export function TabsFavorite() {
  const [activeTab, setActiveTab] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const [tabMeasures, setTabMeasures] = useState<TabMeasures[]>([]);

  useEffect(() => {
    if (tabMeasures[activeTab]) {
      const targetMeasure = tabMeasures[activeTab];
      
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: targetMeasure.x,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthAnim, {
          toValue: targetMeasure.width,
          duration: 300,
          useNativeDriver: false,
        })
      ]).start();
    }
  }, [activeTab, tabMeasures]);

  const measureTab = (event: any, index: number) => {
    const { x, width } = event.nativeEvent.layout;
    setTabMeasures(prevMeasures => {
      const newMeasures = [...prevMeasures];
      newMeasures[index] = { x, width };
      return newMeasures;
    });

    if (index === 0 && !tabMeasures[0]) {
      widthAnim.setValue(width);
      slideAnim.setValue(x);
    }
  };

  return (
    <View>
      <View className="flex-row w-full justify-around border-b-2 border-black/10 relative">
        <Pressable
          onLayout={(event) => measureTab(event, 0)}
          onPress={() => setActiveTab(0)}
          className="p-4"
        >
          <Text className={`font-bold text-lg ${activeTab === 0 ? 'text-black' : 'text-black/50'}`}>
            Restaurantes Favoritos
          </Text>
        </Pressable>

        <Pressable
          onLayout={(event) => measureTab(event, 1)}
          onPress={() => setActiveTab(1)}
          className="p-4"
        >
          <Text className={`font-bold text-lg ${activeTab === 1 ? 'text-black' : 'text-black/50'}`}>
            Comidas Favoritas
          </Text>
        </Pressable>

        {tabMeasures.length > 0 && (
            <Animated.View
              style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                height: 2,
                backgroundColor: '#624e33',
                width: widthAnim,
                transform: [{ translateX: slideAnim }],
              }}
            />
        )}
      </View>

      <View className="p-4">
        {activeTab === 0 ? (
          <FavoriteRestaurants />
        ) : (
          <FavoriteFoods />
        )}
      </View>
    </View>
  );
}