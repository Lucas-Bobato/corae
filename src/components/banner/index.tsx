import { Image, Pressable, View } from 'react-native';
import PagerView from 'react-native-pager-view';

export function Banner() {
  return (
    <PagerView style={{ height: 130, marginBottom: 16 }} initialPage={0}>
      <View key="1">
        <Pressable className="w-full h-32 pt-4 px-4 overflow-hidden">
          <Image
            source={require('../../assets/images/banner1.jpg')}
            className="w-full h-full rounded-2xl"
          />
        </Pressable>
      </View>
      <View key="2">
        <Pressable className="w-full h-32 pt-4 px-4 overflow-hidden">
          <Image
            source={require('../../assets/images/banner2.jpg')}
            className="w-full h-full rounded-2xl"
          />
        </Pressable>
      </View>
      <View key="3">
        <Pressable className="w-full h-32 pt-4 px-4 overflow-hidden">
          <Image
            source={require('../../assets/images/banner3.jpg')}
            className="w-full h-full rounded-2xl"
          />
        </Pressable>
      </View>
    </PagerView>
  );
}