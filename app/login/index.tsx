import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import Back_light from '~/assets/icons/Back_light.svg';
import Ellipse3 from '~/assets/icons/Ellipse3.svg';
import Ellipse4 from '~/assets/icons/Ellipse4.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '@env';

export default function LoginScreen() {
  const router = useRouter();
  const [mssv, setMssv] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const handleLogin = async () => {
    const form = new URLSearchParams();
    form.append('mssv', mssv);
    form.append('password', password);

    if (mssv && password) {
      let responseData = null;
      try {
        const response = await fetch(`http://192.168.0.100:8080/crm/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: form.toString(),
          credentials: 'include',
        });

        const text = await response.text(); // đọc thô để debug trước
        console.log('Response status:', response.status);
        console.log('Raw response:', text);

        if (!response.ok) {
          throw new Error(`Đăng nhập thất bại - status: ${response.status}`);
        }

        responseData = JSON.parse(text); // chuyển lại thành JSON sau khi log
        console.log('Parsed JSON:', responseData);

        if (responseData.isSuccess) {
          await AsyncStorage.setItem('studentId', String(responseData.data.id));
          setTimeout(() => {
            router.replace('/(tabs)/schedule' as const);
          }, 0);
        } else {
          setError(responseData?.message || 'Đăng nhập thất bại');
        }
      } catch (error) {
        console.log('Error caught:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Lỗi không xác định');
        }
      }
    }
  };

  return (
    <View className="flex-1 pt-16">
      {/* Back Button */}
      <View style={StyleSheet.absoluteFill}>
        <Ellipse3 width="499" height="456" />
      </View>

      <View style={styles.IntroButtons}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <Back_light width={30} height={30} />
        </TouchableOpacity>

        <View className="flex-row justify-end gap-6 pr-9">
          <TouchableOpacity
            onPress={() => router.push('/about-us')}
            className={`inline-flex items-center justify-center gap-2 rounded-[90px] px-4 py-2 ${
              isActive('/about-us') ? 'bg-normal' : 'bg-light'
            }`}>
            <Text
              className={`text-center text-lg font-normal ${
                isActive('/about-us') ? 'text-white' : 'text-normal'
              }`}>
              About Us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/login')}
            className={`inline-flex items-center justify-center gap-2 rounded-[90px] px-4 py-2 ${
              isActive('/login') ? 'bg-normal' : 'bg-light'
            }`}>
            <Text
              className={`text-center text-lg font-normal ${
                isActive('/login') ? 'text-white' : 'text-normal'
              }`}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]}>
        <Ellipse4 width={499} height={456} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Login Box */}
        <View style={[styles.loginBox, { justifyContent: 'center' }]}>
          {/* Logo */}
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/dd221f3f8be0822f768e3c815a54d3c2e393345f?placeholderIfAbsent=true&apiKey=e677dfd035d54dfb9bce1976069f6b0e',
            }}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Welcome Text */}
          <View style={styles.welcome}>
            <Text style={styles.welcomeTitle}>Welcome to</Text>
            <Text style={styles.welcomeSubtitle}>University of Information Technology</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>ID</Text>
              <TextInput
                style={styles.input}
                value={mssv}
                onChangeText={setMssv}
                placeholder="Your ID"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#999"
              />
            </View>
          </View>
          {error && <Text style={styles.loginErrorText}>{error}</Text>}
          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 32,
  },
  backButton: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: '#EDEFF8',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  IntroButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginLeft: 17,
    alignItems: 'center',
    alignSelf: 'center',
  },

  rightButtons: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: 250,
    marginRight: 30,
  },

  aboutButton: {
    flex: 1,
    backgroundColor: '#EDEFF8',
    paddingVertical: 14,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  aboutButtonText: {
    color: '#4B63B7',
    fontSize: 16,
    fontWeight: '500',
  },

  logButton: {
    flex: 1,
    backgroundColor: '#4B63B7',
    paddingVertical: 14,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  logButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  loginBox: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 20,
    shadowColor: '#4B63B7',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 6, height: 6 },
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 60,
    marginBottom: 16,
  },
  welcome: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4459A5',
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4459A5',
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginBottom: -10,
    fontSize: 14,
    fontWeight: 500,
    color: '#4B63B7',
    backgroundColor: '#fff',
    zIndex: 10,
    paddingHorizontal: 8,
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#4B63B7',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#4B63B7',
  },
  loginButton: {
    backgroundColor: '#4B63B7',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#edeff8',
    fontSize: 18,
    fontWeight: '400',
  },
  loginErrorText: {
    color: '#F1A805',
    fontSize: 18,
    fontWeight: '400',
    paddingBottom: 10,
    marginTop: -25,
  },
});
