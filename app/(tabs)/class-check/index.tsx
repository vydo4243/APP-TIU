import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import BookIcon from '~/assets/icons/book.svg';
import Chart from '~/assets/icons/chart.svg';
import ArrowLeft from '~/assets/icons/ArrowLeft.svg';
import ArrowRight from '~/assets/icons/ArrowRight.svg';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

type Status = 'used' | 'empty' | 'booked';

interface Classroom {
  name: string;
  capacity: number;
  status: Status;
  total: number;
  block: string;
  floor: number;
}

const TABS = ['Block A', 'Block B', 'Block C', 'Block E'];

// const classroomData: Classroom[] = [
//   { name: 'A101', capacity: 30, status: 'used', total: 100, block: 'Block A', floor: 1 },
//   { name: 'A102', capacity: 20, status: 'empty', total: 50, block: 'Block A', floor: 1 },
//   { name: 'B201', capacity: 40, status: 'booked', total: 100, block: 'Block B', floor: 2 },
//   { name: 'B202', capacity: 0, status: 'used', total: 100, block: 'Block B', floor: 2 },
//   { name: 'C301', capacity: 50, status: 'empty', total: 100, block: 'Block C', floor: 3 },
//   { name: 'E101', capacity: 25, status: 'booked', total: 50, block: 'Block E', floor: 1 },
// ];

const FLOOR_MAP: Record<string, string[]> = {
  'Block A': ['1st Floor', '2nd Floor', '3rd Floor'],
  'Block B': [
    '1st Floor',
    '2nd Floor',
    '3rd Floor',
    '4th Floor',
    '5th Floor',
    '6th Floor',
    '7th Floor',
    '8th Floor',
    '9th Floor',
  ],
  'Block C': ['1st Floor', '2nd Floor', '3rd Floor'],
  'Block E': [
    '1st Floor',
    '2nd Floor',
    '3rd Floor',
    '4th Floor',
    '5th Floor',
    '6th Floor',
    '7th Floor',
    '8th Floor',
    '9th Floor',
    '10th Floor',
    '11th Floor',
    '12th Floor',
  ],
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
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const floors = FLOOR_MAP[activeBlock];
  const fetchClassrooms = async () => {
    try {
      const res = await fetch('https://api.jsonbin.io/v3/b/685e72538960c979a5b24f8b');
      const json = await res.json();
      const fixedData = json.record.map((room: any) => {
        const numericCapacity = Number(room.capacity);

        let fixedStatus: Status;
        if (numericCapacity === 0) {
          fixedStatus = 'empty';
        } else if (room.status === 'used' || room.status === 'booked') {
          fixedStatus = room.status; // giữ nguyên
        } else {
          fixedStatus = 'booked'; // mặc định
        }

        return {
          ...room,
          capacity: numericCapacity,
          status: fixedStatus,
        };
      });
      setClassrooms(fixedData);
      console.log('Fixed classrooms:', fixedData);
    } catch (error) {
      console.error('Fetch classroom error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  useEffect(() => {
    setFloorIndex(0);
  }, [activeBlock]);

  const filteredClassrooms = classrooms.filter(
    (room) => room.block === activeBlock && room.floor === floorIndex + 1
  );

  const handlePrev = () => {
    if (floorIndex > 0) setFloorIndex(floorIndex - 1);
  };

  const handleNext = () => {
    if (floorIndex < floors.length - 1) setFloorIndex(floorIndex + 1);
  };
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      {/* Tab navigation */}
      <View className="flex-row items-center justify-center space-x-3 px-4 pb-4">
        <Text className="font-semibold text-2xl text-normal">CLASS CHECK</Text>
      </View>
      <View className="mt-2 w-full flex-row text-lg">
        {TABS.map((tab) => {
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveBlock(tab)}
              className={`flex-1 items-center justify-center border-b-2 px-2 py-3 ${
                activeBlock === tab ? 'border-dark bg-light' : 'border-light-active'
              }`}>
              <Text className="font-medium text-lg text-dark">{tab}</Text>
            </Pressable>
          );
        })}
      </View>
      {/* Floor Selector */}
      <View className="mt-6 flex-row items-center justify-center space-x-4 ">
        <TouchableOpacity
          onPress={handlePrev}
          disabled={floorIndex === 0}
          className={`p-2 ${floorIndex === 0 ? 'opacity-50' : 'opacity-100'}`}>
          <ArrowLeft width={22} height={22} />
        </TouchableOpacity>

        <View className="mx-[16px] w-[297px] items-center justify-center rounded-full bg-light px-6 py-3 ">
          <Text className="font-medium text-base text-dark ">{floors[floorIndex]}</Text>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          disabled={floorIndex === floors.length - 1}
          className={`p-2 ${floorIndex === floors.length - 1 ? 'opacity-50' : 'opacity-100'}`}>
          <ArrowRight width={22} height={22} />
        </TouchableOpacity>
      </View>
      {/* Classroom cards */}
      <ScrollView className="mt-4 text-white">
        {isLoading ? (
          <View className="mt-32 flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#394A92" />
            <Text className="mt-4 text-lg text-dark">Loading...</Text>
          </View>
        ) : filteredClassrooms.length === 0 ? (
          <Text className="mt-10 text-center text-gray-500">No classrooms found</Text>
        ) : (
          filteredClassrooms.map((room) => {
            const statusConfig = getStatusConfig(room.status);
            return (
              <View
                key={room.name}
                className="mt-4 w-full flex-row items-end gap-4 rounded-[12px] border border-normal p-4 ">
                <View className="flex-1">
                  {/* Room name */}
                  <View className="flex-row items-center gap-2">
                    <BookIcon width={20} height={20} />
                    <Text className="font-semibold text-lg text-darker">Classroom {room.name}</Text>
                  </View>

                  {/* Capacity */}
                  <View className="mt-2 flex-row items-center gap-2">
                    <Chart width={20} height={20} />
                    <Text className="font-semibold text-lg text-dark">
                      {room.capacity}/{room.total}
                    </Text>
                  </View>
                </View>

                {/* Status button */}
                <TouchableOpacity className={`rounded-[90px] px-4 py-2 ${statusConfig.bgColor}`}>
                  <Text className={`font-semibold text-lg ${statusConfig.textColor}`}>
                    {statusConfig.text}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
