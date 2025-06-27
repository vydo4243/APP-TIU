import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import BookIcon from '~/assets/icons/book.svg';
import Chart from '~/assets/icons/chart.svg';
import ArrowLeft from '~/assets/icons/ArrowLeft.svg';
import ArrowRight from '~/assets/icons/ArrowRight.svg';
import { ScrollView, View, Text, Pressable, TouchableOpacity } from 'react-native';
import { RoomData } from '~/type/Room.type';
import { useRouter } from 'expo-router';

type Status = 'used' | 'empty' | 'booked';

const TABS = ['Block A', 'Block B', 'Block C', 'Block E'];
const FLOORS = ['1st Floor', '2nd Floor', '3rd Floor'];

const getStatus = (current: number, max: number): Status => {
  if (max === 0) return 'empty';
  const ratio = current / max;
  if (ratio >= 0.8) return 'used';
  if (ratio >= 0.3) return 'booked';
  return 'empty';
};

const getStatusConfig = (status: Status) => {
  switch (status) {
    case 'used':
      return { bgColor: 'bg-normal', text: 'Used', textColor: 'text-white' };
    case 'empty':
      return { bgColor: 'bg-[#A0BA46]', text: 'Empty', textColor: 'text-white' };
    case 'booked':
      return { bgColor: 'bg-[#F1A805]', text: 'Booked', textColor: 'text-white' };
    default:
      return { bgColor: 'bg-gray-400', text: 'Unknown', textColor: 'text-white' };
  }
};

export default function ClassCheckScreen() {
  const [activeBlock, setActiveBlock] = useState('Block B');
  const [floorIndex, setFloorIndex] = useState(0);
  const [data, setData] = useState<RoomData[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://192.168.1.4:8080/crm/density`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Lấy data thất bại');
        }
        const text = await response.text();
        const responseData = JSON.parse(text);
        if (responseData.isSuccess) {
          setData(responseData.data);
        } else {
          console.error('Không thành công khi lấy dữ liệu');
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('LỖI:', error.message);
        } else {
          console.error('Lỗi không xác định:', error);
        }
      }
    }

    fetchData();
  }, []);

  const filteredData =
    data?.filter(
      (room) =>
        room.buidingName === activeBlock.replace('Block ', 'Tòa ') && room.floor === floorIndex + 1
    ) ?? [];

  const handlePrev = () => {
    if (floorIndex > 0) setFloorIndex(floorIndex - 1);
  };

  const handleNext = () => {
    if (floorIndex < FLOORS.length - 1) setFloorIndex(floorIndex + 1);
  };

  return (
    <View className="flex-1 bg-white px-4 pt-16">
      {/* Title */}
      <View className="flex-row items-center justify-center space-x-3 px-4 pb-4">
        <Text className="text-normal text-2xl font-semibold">CLASS CHECK</Text>
      </View>

      {/* Tabs */}
      <View className="mt-2 w-full flex-row text-lg">
        {TABS.map((tab) => {
          const isActive = activeBlock === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveBlock(tab)}
              className={`flex-1 items-center justify-center border-b-2 px-2 py-3 ${
                isActive ? 'bg-light border-dark' : 'border-light-active'
              }`}>
              <Text className="text-dark text-lg font-medium">{tab}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Floor Selector */}
      <View className="mt-6 flex-row items-center justify-center space-x-4 ">
        <TouchableOpacity onPress={handlePrev}>
          <ArrowLeft width={22} height={22} />
        </TouchableOpacity>

        <View className="bg-light mx-[16px] w-[297px] items-center justify-center rounded-full px-6 py-3 ">
          <Text className="text-dark text-base font-medium ">{FLOORS[floorIndex]}</Text>
        </View>

        <TouchableOpacity onPress={handleNext}>
          <ArrowRight width={22} height={22} />
        </TouchableOpacity>
      </View>

      {/* Classroom cards */}
      <ScrollView className="mt-4 text-white">
        {filteredData.map((room) => {
          const status = getStatus(room.currentStudents, room.amount);
          const statusConfig = getStatusConfig(status);
          return (
            <View
              key={room.roomName}
              className="border-normal mt-4 w-full flex-row items-end gap-4 rounded-[12px] border p-4 ">
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <BookIcon width={20} height={20} />
                  <TouchableOpacity onPress={() => router.push('/map')}>
                    <Text className="text-darker text-lg font-semibold">
                      Classroom {room.roomName}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="mt-2 flex-row items-center gap-2">
                  <Chart width={20} height={20} />
                  <Text className="text-dark text-lg font-semibold">
                    {room.currentStudents}/{room.amount}
                  </Text>
                </View>
              </View>

              <TouchableOpacity className={`rounded-[90px] px-4 py-2 ${statusConfig.bgColor}`}>
                <Text className={`text-lg font-semibold ${statusConfig.textColor}`}>
                  {statusConfig.text}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
