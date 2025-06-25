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
}

export const ClassSession = ({
  courseCode,
  timeSlot,
  status,
  statusText,
  index,
  total,
  onStatusPress,
}: ClassSessionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLast = index === total - 1 && !isExpanded;
  return (
    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
      <View className="flex bg-white w-full self-center">
        <View className={`flex-row min-h-[60px] px-4 py-2.5 items-center justify-between ${!isLast ? 'border-b border-light-active' : ''}`}>
          <Text className="text-base text-darker w-fit">{courseCode}</Text>
          <Text className="text-base text-darker w-fit">{timeSlot}</Text>
          <StatusButton status={status} onPress={onStatusPress}>
            {statusText}
          </StatusButton>
        </View>

        {isExpanded && (
          <View className="flex">
            <View className={`self-stretch min-h-[60px] px-4 py-3 bg-light border-b border-light-active flex-row gap-4 justify-start items-center`}>
              <Text className="justify-start text-dark text-base font-normal ">07:30</Text>
              <Text className="justify-start text-dark text-base font-medium ">Check-in</Text>
            </View>
            <View className={`self-stretch min-h-[60px] px-4 py-3 bg-light border-b border-light-active flex-row gap-4 justify-start items-center`}>
              <Text className="justify-start text-dark text-base font-normal ">09:35</Text>
              <Text className="justify-start text-dark text-base font-medium ">Check-out</Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ClassSession;
