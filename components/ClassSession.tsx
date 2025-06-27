import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StatusButton } from './StatusButton';
import { Pressable } from 'react-native';

interface ClassSessionProps {
  courseCode: string;
  timeSlot: string;
  status: 'on-time' | 'late' | 'absent';
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
  checkOut
}: ClassSessionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLast = index === total - 1 && !isExpanded;
  return (
    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
      <View className="flex bg-white w-full self-center">
        <View className={`flex-row min-h-[60px] px-4 py-2.5 items-center gap-4  ${!isLast ? 'border-b border-light-active' : ''}`}>
          <Text className="text-base text-darker w-1/3">{courseCode}</Text>
          <Text className="text-base text-darker w-1/4">{timeSlot}</Text>
          <StatusButton status={status} onPress={onStatusPress}>
            {statusText}
          </StatusButton>
        </View>

        {isExpanded && (
          <View className="flex">
            {checkIn && (
            <View className={`self-stretch min-h-[60px] px-4 py-3 bg-light border-b border-light-active flex-row gap-4 justify-start items-center`}>
              <Text className="justify-start text-dark text-base font-normal ">{checkIn}</Text>
              <Text className="justify-start text-dark text-base font-medium ">Check-in</Text>
            </View>
            )}
            {checkOut && (
            <View className={`self-stretch min-h-[60px] px-4 py-3 bg-light border-b border-light-active flex-row gap-4 justify-start items-center`}>
              <Text className="justify-start text-dark text-base font-normal ">{checkOut}</Text>
              <Text className="justify-start text-dark text-base font-medium ">Check-out</Text>
            </View>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ClassSession;
