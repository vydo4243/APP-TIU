import React from 'react';
import { View, Text } from 'react-native';
import { StatusButton } from './StatusButton';

interface ClassSessionProps {
  courseCode: string;
  timeSlot: string;
  status: 'on-time' | 'late' | 'absent';
  statusText: string;
  isLast?: boolean;
  onStatusPress?: () => void;
}

export const ClassSession = ({
  courseCode,
  timeSlot,
  status,
  statusText,
  isLast = false,
  onStatusPress
}: ClassSessionProps) => {
  return (
    <View
      className={`flex-row items-center px-4 py-2.5 min-h-[63px] gap-4 ${
        !isLast ? 'border-b border-light-active' : ''
      }`}
    >
      <Text className="text-darker text-base">{courseCode}</Text>
      <Text className="text-darker text-base">{timeSlot}</Text>
      <StatusButton status={status} onPress={onStatusPress}>
        {statusText}
      </StatusButton>
    </View>
  );
};


export default ClassSession;