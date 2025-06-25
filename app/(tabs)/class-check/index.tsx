import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import BookIcon from '~/assets/icons/book.svg';
import Chart from '~/assets/icons/chart.svg';
import ArrowLeft from '~/assets/icons/ArrowLeft.svg';
import ArrowRight from '~/assets/icons/ArrowRight.svg';
import { ScrollView, View, Text, Pressable, TouchableOpacity } from 'react-native';

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

const classroomData: Classroom[] = [
  { name: 'A101', capacity: 30, status: 'used', total: 100, block: 'Block A', floor: 1 },
  { name: 'A102', capacity: 20, status: 'empty', total: 50, block: 'Block A', floor: 1 },
  { name: 'B201', capacity: 40, status: 'booked', total: 100, block: 'Block B', floor: 2 },
  { name: 'B202', capacity: 0, status: 'used', total: 100, block: 'Block B', floor: 2 },
  { name: 'C301', capacity: 50, status: 'empty', total: 100, block: 'Block C', floor: 3 },
  { name: 'E101', capacity: 25, status: 'booked', total: 50, block: 'Block E', floor: 1 },
];
const FLOORS = ['1st Floor', '2nd Floor', '3rd Floor'];

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
  const filteredClassrooms = classroomData.filter(
    (room) => room.block === activeBlock && room.floor === floorIndex + 1
  );


  const handlePrev = () => {
    if (floorIndex > 0) setFloorIndex(floorIndex - 1);
  };

  const handleNext = () => {
    if (floorIndex < FLOORS.length - 1) setFloorIndex(floorIndex + 1);
  };
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      {/* Tab navigation */}
      <View className="flex-row items-center justify-center space-x-3 px-4 pb-4">
        <Text className="text-normal text-2xl font-semibold">CLASS CHECK</Text>
      </View>
      <View className="flex-row mt-2 w-full text-lg">
        {TABS.map((tab) => {
          const isActive = activeBlock === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveBlock(tab)}
              className={`flex-1 items-center justify-center px-2 py-3 border-b-2 ${isActive ? 'bg-light border-dark' : 'border-light-active'
                }`}
            >
              <Text className="font-medium text-dark text-lg">
                {tab === 'Block B' ? (
                  <>
                    <Text className="font-medium text-dark text-lg">Block B</Text>
                  </>
                ) : (
                  tab
                )}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {/* Floor Selector */}
      <View className="flex-row items-center justify-center mt-6 space-x-4 ">
        <TouchableOpacity onPress={handlePrev}>
           <ArrowLeft width={22} height={22} />
        </TouchableOpacity>

        <View className="bg-light rounded-full items-center justify-center px-6 py-3 mx-[16px] w-[297px] ">
          <Text className="text-dark font-medium text-base ">
            {FLOORS[floorIndex]}
          </Text>
        </View>

        <TouchableOpacity onPress={handleNext}>
          <ArrowRight width={22} height={22} />
        </TouchableOpacity>
      </View>
      {/* Classroom cards */}
      <ScrollView className="mt-4 text-white">
        {filteredClassrooms.map((room) => {
          const statusConfig = getStatusConfig(room.status);
          return (
            <View
              key={room.name}
              className="flex-row gap-4 items-end p-4 mt-4 w-full rounded-[12px] border border-normal "
            >
              <View className="flex-1">
                {/* Room name */}
                <View className="flex-row gap-2 items-center">

                  <BookIcon width={20} height={20} />
                  <Text className="font-semibold text-lg text-darker">
                    Classroom {room.name}
                  </Text>
                </View>

                {/* Capacity */}
                <View className="flex-row gap-2 items-center mt-2">

                  <Chart width={20} height={20} />
                  <Text className="text-dark font-semibold text-lg">
                    {room.capacity}/{room.total}
                  </Text>
                </View>
              </View>

              {/* Status button */}
              <TouchableOpacity
                className={`px-4 py-2 rounded-[90px] ${statusConfig.bgColor}`}
              >
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