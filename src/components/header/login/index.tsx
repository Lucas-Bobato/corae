import { Image, View } from 'react-native';

export function LoginHeader() {
  return (
    <View className="items-center">
      <Image
        source={require('../../../assets/images/logo-corae.png')}
        className="h-24 my-2"
        style={{ resizeMode: 'contain' }}
      />
    </View>
  );
}