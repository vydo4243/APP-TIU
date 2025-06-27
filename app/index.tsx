import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import LogoIcon from '../assets/icons/LOGO.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import BlobBackground from '../components/BlobBG';
import { MotiView, MotiText, MotiImage } from 'moti';

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <View className="flex-1 bg-white pt-16">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row justify-end gap-4 pr-5 pt-3">
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
        <BlobBackground />
        {/* Content */}
        <View className="mt-9 px-9">
          {/* Placeholder for logo */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 300, duration: 800 }}>
            <LogoIcon className="mt-8 h-48 w-full" />
            {/* <E4Icon className="absolute w-24 h-24 top-10 -left-10 opacity-60" /> */}
            <Text className="text-normal mt-4 font-['Inter'] text-3xl font-semibold">
              Welcome to
            </Text>
            <Text className="text-normal-hover mt-0.5 font-['Inter'] text-lg font-bold">
              University of Information Technology
            </Text>
            <Text className="text-dark mt-3 font-['Inter'] text-base font-normal">
              Is a leading center for scientific research and technology transfer in information and
              communication technology, classified as a key national university and a member of the
              Vietnam National University, Ho Chi Minh City.
            </Text>
          </MotiView>

          <MotiView
            from={{ translateY: 0 }}
            animate={{ translateY: -10 }}
            transition={{
              type: 'timing',
              duration: 500,
              loop: true,
              repeatReverse: true,
            }}>
            <TouchableOpacity
              onPress={() => router.push('/map')}
              activeOpacity={0.8}
              className="bg-normal mt-6 flex items-center gap-2 self-start rounded-[90px] px-4 py-2 shadow-[10px_10px_20px_0px_rgba(75,99,183,0.20)]">
              <MotiText
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 300 }}
                className="text-light text-lg font-normal">
                Explore now →
              </MotiText>
            </TouchableOpacity>
          </MotiView>
        </View>

        <MotiImage
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 300,
          }}
          className="shadow-inner w-full scale-y-110"
          resizeMode="contain"
          source={require('../assets/img/UITbg.png')}
        />
      </View>
    </View>
  );
}
