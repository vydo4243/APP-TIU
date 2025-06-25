import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Calendar  from '../../../components/Calendar';
import { ClassSessionList } from '../../../components/ClassSessionList';
import dayjs from 'dayjs';

const sessions = [
  {
    courseCode: 'SE113.P21.CNCL',
    timeSlot: '07:30 - 09:30',
    status: 'on-time' as const,
    statusText: 'On time',
    date: '2025-06-11',
  },
  {
    courseCode: 'SE113.P21.CNCL',
    timeSlot: '09:30 - 11:30',
    status: 'on-time' as const,
    statusText: 'On time',
    date: '2025-06-11',
  },
  {
    courseCode: 'SE113.P21.CNCL',
    timeSlot: '09:30 - 11:30',
    status: 'late' as const,
    statusText: 'Late',
    date: '2025-06-11',
  },
  {
    courseCode: 'SE113.P21.CNCL',
    timeSlot: '09:30 - 11:30',
    status: 'absent' as const,
    statusText: 'Absent',
    date: '2025-06-11',
  },
  {
    courseCode: 'SE113.P21.CNCL',
    timeSlot: '09:30 - 11:30',
    status: 'late' as const,
    statusText: 'Late',
    date: '2025-06-12',
  },
  {
    courseCode: 'SE113.P21.CNCL',
    timeSlot: '09:30 - 11:30',
    status: 'absent' as const,
    statusText: 'Absent',
    date: '2025-06-13',
  },
];

export default function CheckIn() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  return (
    <SafeAreaView className='flex-1 bg-white w-full self-center'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <View className='pt-4'>
          <Calendar sessions={sessions} onDateSelect={(date) => setSelectedDate(date)} />
          <ClassSessionList sessions={sessions} selectedDate={selectedDate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}