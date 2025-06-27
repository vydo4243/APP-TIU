import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type StatusButtonProps = {
  status: 'check in' | 'check out' | 'absent';
  children: React.ReactNode;
  onPress?: () => void;
};

export const StatusButton = ({ status, children, onPress }: StatusButtonProps) => {
  const getStatusBgClass = () => {
    switch (status) {
      case 'check in':
        return 'bg-[#a0ba46]';
      case 'check out':
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
      className={`max-w-[150px] flex-1 items-center justify-center rounded-[90px] px-4 py-2 ${getStatusBgClass()}`}>
      <Text className="text-light text-lg font-normal">{children}</Text>
    </TouchableOpacity>
  );
};
