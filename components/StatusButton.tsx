import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type StatusButtonProps = {
  status: 'on-time' | 'late' | 'absent';
  children: React.ReactNode;
  onPress?: () => void;
};

export const StatusButton = ({ status, children, onPress }: StatusButtonProps) => {
  const getStatusBgClass = () => {
    switch (status) {
      case 'on-time':
        return 'bg-[#a0ba46]';
      case 'late':
        return 'bg-[#f1a805]';
      case 'absent':
        return 'bg-[#888888]';
      default:
        return 'bg-[#a0ba46]';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 rounded-[90px] items-center justify-center ml-2 px-4 py-2 ${getStatusBgClass()}`}
    >
      <Text className="text-light text-lg font-normal">
        {children}
      </Text>
    </TouchableOpacity>
  );
};
