import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
  if (id && pw) {
    setTimeout(() => {
      router.replace('/(tabs)/schedule' as const);
    }, 0);
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="ID" value={id} onChangeText={setId} style={styles.input} />
      <TextInput placeholder="Password" value={pw} onChangeText={setPw} style={styles.input} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
  },
  title: {
    fontSize: 24, marginBottom: 20
  },
  input: {
    width: '100%', borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 6
  }
});
