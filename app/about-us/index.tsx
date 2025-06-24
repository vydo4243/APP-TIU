import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import Anh2 from '../../assets/icons/anh2.svg';
import LogoIcon from '../../assets/icons/logo_white.svg';
import NameIcon from '../../assets/icons/name.svg'; 
export default function AboutUsScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="px-4">
        {/* Header */}
        <View className="flex-row justify-end gap-6 pr-5 pt-3">
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

        {/* UIT Image */}
        <View className="flex flex-col items-center justify-start gap-[17px] self-stretch">
          <Image
            source={require('../../assets/img/anh1.png')} // Replace with your actual image path
            resizeMode="cover"
            className="mt-6 h-56 w-full rounded-lg"
          />
          <View className="mt-2 flex-row items-center justify-center gap-2">
            <View className="h-1.5 w-8 rounded-full bg-light-active" />
            <View className="h-1.5 w-8 rounded-full bg-normal" />
            <View className="h-1.5 w-8 rounded-full bg-light-active" />
          </View>
        </View>

        {/* Section: MISSION */}
        <View className="mt-6">
          <Text className="text-3xl font-bold text-normal">MISSION</Text>
          <Text className="mt-3 justify-start font-['Inter'] text-base font-normal text-dark">
            We aim to develop a smart mapping system that assists schools in managing attendance and
            monitoring student density effectively. By applying modern technology, we help digitize
            administrative processes and improve operational efficiency.
          </Text>
        </View>

        {/* Section: VISION */}
        <View className="mt-4">
          <Text className="text-3xl font-bold text-normal">VISION</Text>
          <Text className="mt-3 justify-start font-['Inter'] text-base font-normal text-dark">
            Our vision is to build an intelligent, real-time platform that visualizes all student
            activities on campus. We strive to become a reliable tool for data-driven
            decision-making in smart educational environments.
          </Text>
        </View>

        {/* Section: CORE VALUES */}
        <View className="mt-4">
          <Text className="text-3xl font-bold text-normal">CORE VALUES</Text>
          <Text className="mt-3 justify-start font-['Inter'] text-base font-normal text-dark">
            Accuracy, usability, and scalability are at the heart of our system. We design with a
            human-centered mindset, ensuring the platform enhances the daily experience of both
            educators and learners.
          </Text>
        </View>

        {/* Section: CAMPUS ARCHITECTURES */}
        <View className="mt-6 flex justify-center border-t-4 border-light-active pt-6">
          <Text className="text-3xl font-bold text-normal">CAMPUS ARCHITECTURES</Text>
          <View className="mt-6 flex items-center justify-center">
            <Anh2 className="mt-3 flex h-full w-full items-center justify-center rounded-md" />
          </View>
          {/* COURT A */}
          <View className="mt-6">
            <View className="">
              <Text className="font-['Inter'] text-lg font-semibold text-normal-hover">
                COURT A
              </Text>
              <Text className="mt-3 justify-start font-['Inter'] text-base font-normal text-dark">
                Our vision is to build an intelligent, real-time platform that visualizes all
                student activities on campus. We strive to become a reliable tool for data-driven
                decision-making in smart educational environments.
              </Text>
            </View>

            {/* COURT B */}
            <View className="mt-4">
              <Text className="font-['Inter'] text-lg font-semibold text-normal-hover">
                COURT B
              </Text>
              <Text className="mt-3 justify-start font-['Inter'] text-base font-normal text-dark">
                Our vision is to build an intelligent, real-time platform that visualizes all
                student activities on campus. We strive to become a reliable tool for data-driven
                decision-making in smart educational environments.
              </Text>
            </View>

            {/* COURT C */}
            <View className="mt-4">
              <Text className="font-['Inter'] text-lg font-semibold text-normal-hover">
                COURT C
              </Text>
              <Text className="mt-3 justify-start font-['Inter'] text-base font-normal text-dark">
                Our vision is to build an intelligent, real-time platform that visualizes all
                student activities on campus. We strive to become a reliable tool for data-driven
                decision-making in smart educational environments.
              </Text>
            </View>

            {/* COURT E */}
            <View className="mt-4">
              <Text className="font-['Inter'] text-lg font-semibold text-normal-hover">
                COURT E
              </Text>
              <Text className="mt-3 justify-start font-['Inter'] text-base font-normal text-dark">
                Our vision is to build an intelligent, real-time platform that visualizes all
                student activities on campus. We strive to become a reliable tool for data-driven
                decision-making in smart educational environments.
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6 flex justify-center border-t-4 border-light-active" />
        </View>

        {/* Footer */}
        <View className="mt-6 flex flex-col items-start justify-start gap-2 bg-dark px-8 pb-6 pt-4">
          <View className="flex flex-col items-start justify-center gap-2">
            <LogoIcon/>
            <View className="flex flex-col items-start justify-start gap-1.5">
              <View className="flex flex-col items-start justify-start gap-0.5 self-stretch">
                <Text className="justify-start font-['Inter'] text-xs font-semibold uppercase text-light">
                  Vietnam National University, Ho Chi Minh City
                </Text>
                <Text className="justify-start font-['Inter'] text-base font-bold uppercase text-light">
                  University of Information Technology
                </Text>
              </View>
              <NameIcon />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
