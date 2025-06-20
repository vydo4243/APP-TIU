import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text>Profile Tab</Text>
    </SafeAreaView>
  );
}
