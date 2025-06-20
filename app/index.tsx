import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-end pt-14 pr-5 space-x-2">
        <TouchableOpacity className="bg-gray-200 rounded-full px-4 py-1">
          <Text className="text-sm text-gray-800">About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/login')}
          className="bg-blue-600 rounded-full px-4 py-1"
        >
          <Text className="text-sm text-white">Login</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="px-5 mt-10">
        <Text className="text-xl text-gray-700">Welcome to</Text>
        <Text className="text-lg font-bold text-blue-800 mt-1">
          University of Information Technology
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          Is a leading center for scientific research and technology transfer in information and communication
          technology, classified as a key national university and a member of the Vietnam National University, Ho Chi Minh City.
        </Text>

        <TouchableOpacity className="bg-blue-600 rounded-full mt-5 px-6 py-2 self-start">
          <Text className="text-white text-base">Explore now →</Text>
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image
        className="w-full h-48 mt-8 rounded-t-3xl"
        resizeMode="cover"
        source={require('../assets/UITbg.png')} // Đổi sang ảnh thật
      />
    </View>
  );
}
