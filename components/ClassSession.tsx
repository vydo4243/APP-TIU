import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StatusButton } from './StatusButton';

interface ClassSessionProps {
  courseCode: string;
  timeSlot: string;
  status: 'check in' | 'check out' | 'absent';
  statusText: string;
  index: number;
  total: number;
  onStatusPress?: () => void;
  checkIn: string | null;
  checkOut: string | null;
}

export const ClassSession = ({
  courseCode,
  timeSlot,
  status,
  statusText,
  index,
  total,
  onStatusPress,
  checkIn,
  checkOut,
}: ClassSessionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLast = index === total - 1 && !isExpanded;
  console.log('timeSlot', timeSlot);
  return (
    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
      <View className="flex w-full self-center bg-white">
        <View
          className={`min-h-[60px] flex-col px-4 py-2.5 ${!isLast ? 'border-light-active border-b' : ''}`}>
          {/* Hàng đầu: canh trái */}
          <View className="self-start">
            <Text className="text-dark text-xl font-semibold">{courseCode}</Text>
          </View>

          {/* Hàng thứ hai: canh phải */}
          <View className="mt-2 w-full flex-row items-center justify-between">
            <Text className="text-darker text-lg">{timeSlot}</Text>
            <StatusButton status={status} onPress={onStatusPress}>
              {statusText}
            </StatusButton>
          </View>
        </View>

        {isExpanded && (
          <View className="flex">
            {/* <View
              className={`bg-light border-light-active min-h-[60px] flex-row items-center justify-start gap-4 self-stretch border-b px-4 py-3`}>
              <Text className="text-dark justify-start text-base font-normal ">07:30</Text>
              <Text className="text-dark justify-start text-base font-medium ">Check-in</Text>
            </View>
            <View
              className={`bg-light border-light-active min-h-[60px] flex-row items-center justify-start gap-4 self-stretch border-b px-4 py-3`}>
              <Text className="text-dark justify-start text-base font-normal ">09:35</Text>
              <Text className="text-dark justify-start text-base font-medium ">Check-out</Text>
            </View> */}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ClassSession;
