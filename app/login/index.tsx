import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Back_light from '~/assets/icons/Back_light.svg';
import Ellipse3 from '~/assets/icons/Ellipse3.svg';
import Ellipse4 from '~/assets/icons/Ellipse4.svg';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Back Button */}
      <View style={StyleSheet.absoluteFill}>
        <Ellipse3 width="499" height="456" />
      </View>

      <View style={styles.IntroButtons}>

        <TouchableOpacity style={styles.backButton}>
          <Back_light width={30} height={30} />
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.aboutButton} onPress={() => console.log('About Us')}>
            <Text style={styles.aboutButtonText}>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logButton} onPress={handleLogin}>
            <Text style={styles.logButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]}>
        <Ellipse4 width={499} height={456} />
      </View>


      <ScrollView contentContainerStyle={styles.container}>

        {/* Login Box */}
        <View style={[styles.loginBox, { justifyContent: 'center' }]} >

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
                value={id}
                onChangeText={setId}
                placeholder="Your ID"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={pw}
                onChangeText={setPw}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>

    </SafeAreaView>
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
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  IntroButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
   
    marginTop: 50,
    marginLeft: 17,
    alignItems: 'center',
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
});
