import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Calendar from '../../../components/Calendar';
import { ClassSessionList } from '../../../components/ClassSessionList';
import dayjs, { Dayjs } from 'dayjs';
import { CicoData } from '../../../type/Cico.type';

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

export default function CheckIn() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [data, setData] = useState<CicoData[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://192.168.0.100:8080/crm/student/cico`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Lấy data thất bại');
        }

        const text = await response.text();
        const raw = JSON.parse(text);

        // ✅ Dữ liệu đã là ISO 8601 → dùng dayjs trực tiếp
        const cleanedData: CicoData[] = raw.data.map((item: any) => ({
          ...item,
          checkin_time: item.checkin_time.map((t: string) => dayjs(t)),
          checkout_time: item.checkout_time.map((t: string) => dayjs(t)),
        }));

        setData(cleanedData);
        console.log('✅ Parsed and formatted data:', cleanedData);
      } catch (error) {
        if (error instanceof Error) {
          console.error('LỖI:', error.message);
        } else {
          console.error('Lỗi không xác định:', error);
        }
      }
    }

    fetchData();
  }, []);
  return (
    <View className="w-full flex-1 self-center bg-white pt-16">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-5">
          <Calendar data={data} onDateSelect={(date) => setSelectedDate(date)} />
          <ClassSessionList data={data} selectedDate={selectedDate} />
        </View>
      </ScrollView>
    </View>
  );
}
