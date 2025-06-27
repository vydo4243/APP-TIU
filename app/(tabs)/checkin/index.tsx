import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Calendar from '../../../components/Calendar';
import { ClassSessionList } from '../../../components/ClassSessionList';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const sessions = [
//   {
//     courseCode: 'SE113.P21.CNCL',
//     timeSlot: '07:30 - 09:30',
//     status: 'on-time' as const,
//     statusText: 'On time',
//     date: '2025-06-11',
//   },
//   {
//     courseCode: 'SE113.P21.CNCL',
//     timeSlot: '09:30 - 11:30',
//     status: 'on-time' as const,
//     statusText: 'On time',
//     date: '2025-06-11',
//   },
//   {
//     courseCode: 'SE113.P21.CNCL',
//     timeSlot: '09:30 - 11:30',
//     status: 'late' as const,
//     statusText: 'Late',
//     date: '2025-06-11',
//   },
//   {
//     courseCode: 'SE113.P21.CNCL',
//     timeSlot: '09:30 - 11:30',
//     status: 'absent' as const,
//     statusText: 'Absent',
//     date: '2025-06-11',
//   },
//   {
//     courseCode: 'SE113.P21.CNCL',
//     timeSlot: '09:30 - 11:30',
//     status: 'late' as const,
//     statusText: 'Late',
//     date: '2025-06-12',
//   },
//   {
//     courseCode: 'SE113.P21.CNCL',
//     timeSlot: '09:30 - 11:30',
//     status: 'absent' as const,
//     statusText: 'Absent',
//     date: '2025-06-13',
//   },
// ];

type Session = {
  courseCode: string;
  timeSlot: string;
  status: 'on-time' | 'late' | 'absent';
  statusText: string;
  date: string;
  checkIn?: string | null;
  checkOut?: string | null;
};

export default function CheckIn() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('studentId');
        const numericId = Number(storedId);

        const res = await fetch('https://api.jsonbin.io/v3/b/685e85f38960c979a5b25764');
        const json = await res.json();

        const matchedStudent = json.record.find(
          (student: any) => Number(student.studentId) === numericId
        );

        if (matchedStudent && matchedStudent.attendances) {
          const mappedSessions: Session[] = matchedStudent.attendances.map((item: any) => ({
            courseCode: item.courseCode,
            timeSlot: item.timeSlot,
            date: item.date,
            status: item.status,
            statusText:
              item.status === 'on-time' ? 'On time' : item.status === 'late' ? 'Late' : 'Absent',
            checkIn: item.checkIn,
            checkOut: item.checkOut,
          }));
          setSessions(mappedSessions);
        } else {
          console.warn('Không tìm thấy dữ liệu điểm danh');
        }
      } catch (err) {
        console.error('Fetch attendance error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <View className="w-full flex-1 self-center bg-white pt-16">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-5">
          {isLoading ? (
            <View className="mt-32 flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#394A92" />
              <Text className="mt-4 text-lg text-dark">Loading...</Text>
            </View>
          ) : (
            <>
              <Calendar sessions={sessions} onDateSelect={(date) => setSelectedDate(date)} />
              <ClassSessionList sessions={sessions} selectedDate={selectedDate} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
