import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginHeader } from '../components/header/login';
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <LoginHeader />
      <View>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
}