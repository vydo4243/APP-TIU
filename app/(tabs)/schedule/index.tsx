import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import BookIcon from '~/assets/icons/book.svg';
import UserIcon from '~/assets/icons/user.svg';
import LocationIcon from '~/assets/icons/location.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type ScheduleItem = {
  course: string;
  period: string;
  start: number;
  end: number;
  room: string;
  teacher: string;
  teacher_onl: string;
  day: string;
};

// const SCHEDULE_DATA: Record<string, ScheduleItem[]> = {
//   Mon: [
//     { period: 'Period 1 - 3', room: 'P.B3.14', start: 1, end: 3 },
//     { period: 'Period 4 - 5', room: 'P.B3.14', start: 4, end: 5 },
//     { period: 'Period 6 - 8', room: 'P.B3.14', start: 6, end: 8 },
//     { period: 'Period 9 - 10', room: 'P.B3.14', start: 9, end: 10 },
//   ],
//   Tue: [
//     { period: 'Period 2 - 4', room: 'P.A1.01', start: 2, end: 4 },
//     { period: 'Period 6 - 7', room: 'P.A1.03', start: 6, end: 7 },
//   ],
//   // Add more days as needed
// };

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<string>('Mon');
  const [allSchedule, setAllSchedule] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const schedule = allSchedule.filter((item) => item.day === selectedDay);
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const storedId = await AsyncStorage.getItem('studentId');
        const numericId = Number(storedId);

        const res = await fetch('https://api.jsonbin.io/v3/b/685e35fa8561e97a502c9d5f');
        const json = await res.json();

        const matchedStudent = json.record.find(
          (student: any) => Number(student.studentId) === numericId
        );

        if (matchedStudent) {
          setAllSchedule(matchedStudent.schedule);
        } else {
          console.warn('Không tìm thấy thời khóa biểu của sinh viên');
        }
      } catch (err) {
        console.error('Fetch schedule error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const periodMap: { [key: number]: ScheduleItem | undefined } = {};
  schedule.forEach((item) => {
    periodMap[item.start] = item;
  });

  return (
    <>
      {isLoading ? (
        <View className="mt-32 flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#394A92" />
          <Text className="mt-4 text-lg text-dark">Loading...</Text>
        </View>
      ) : (
        <View className="flex-1 bg-white pt-16 text-dark">
          {/* Header */}
          <View className="flex-row items-center justify-center space-x-3 px-4">
            <Text className="font-semibold text-2xl text-normal">
              {dayjs().format('YYYY/MM/DD')}
            </Text>
          </View>

          <View className="flex-row justify-around border-b border-gray-300">
            {DAYS.map((day) => (
              <TouchableOpacity
                key={day}
                onPress={() => setSelectedDay(day)}
                className={`px-4 py-2 ${selectedDay === day ? 'border-b-2 border-dark bg-light' : 'bg-white'}`}>
                <Text
                  className={`text-lg text-dark ${
                    selectedDay === day ? 'font-semibold' : 'font-medium'
                  }`}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Timeline + Schedule */}
          <ScrollView className="flex-1 px-4 py-4">
            {(() => {
              const shownPeriods = new Set<number>(); // Để tránh render lại những tiết đã bao phủ

              return Array.from({ length: 10 }, (_, i) => i + 1).map((period) => {
                // Nếu tiết này đã được bao phủ bởi block trước đó → bỏ qua
                if (shownPeriods.has(period)) {
                  return null;
                }

                // Tìm xem có lịch nào bắt đầu tại tiết hiện tại không
                const item = schedule.find((s) => s.start === period);

                if (item) {
                  // Đánh dấu các tiết đã bao phủ để skip lần sau
                  for (let p = item.start + 1; p <= item.end; p++) {
                    shownPeriods.add(p);
                  }

                  return (
                    <React.Fragment key={period}>
                      {/* Đường kẻ mờ sau tiết 5 */}
                      {period === 6 && (
                        <View className="mb-3">
                          <View className="h-0.5 w-full bg-gray-300 opacity-50" />
                        </View>
                      )}
                      {/* Block hiện tại */}
                      {item ? (
                        <View
                          className="mb-4 flex-row items-start"
                          style={{ height: 45 * (item.end - item.start + 1) }}>
                          <View className="mr-2 rounded-full bg-[#394A92] ">
                            {Array.from({ length: item.end - item.start + 1 }, (_, i) => {
                              const p = item.start + i;
                              return (
                                <Text
                                  key={p}
                                  className="pt-3 text-center text-base text-white"
                                  style={{ height: 45, width: 30 }}>
                                  {p}
                                </Text>
                              );
                            })}
                          </View>

                          <View className="ml-2 min-h-full flex-1 justify-start rounded-xl border border-normal px-4 py-2">
                            <View className="flex-row items-center gap-2">
                              <BookIcon width={20} height={20} />
                              <Text className="font-medium text-lg">{item.course}</Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                              <UserIcon width={20} height={20} />
                              <Text className="mt-1 font-medium text-lg">
                                {item.period},{' '}
                                <Text className="font-semibold text-normal-active">
                                  {item.room}
                                </Text>
                              </Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                              <LocationIcon width={20} height={20} />
                              <Text className="mt-1 font-medium text-lg">
                                {item.teacher_onl ? `${item.teacher_onl}, ` : ''}
                                <Text className="font-semibold text-normal-active">
                                  {item.teacher}
                                </Text>
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View className="mb-2 ml-0.5 flex-row items-start">
                          <Text className="w-6 text-center text-gray-400">{period}</Text>
                          <View className="ml-5 h-10 flex-1 rounded-xl border border-dashed border-gray-200" />
                        </View>
                      )}
                    </React.Fragment>
                  );
                }

                // Nếu không có lịch → hiển thị ô trống
                return (
                  <View key={period} className="mb-2 ml-0.5 flex-row items-start">
                    <Text className="w-6 text-center text-gray-400">{period}</Text>
                    <View className="ml-5 h-10 flex-1 rounded-xl border border-dashed border-gray-200" />
                  </View>
                );
              });
            })()}
          </ScrollView>
        </View>
      )}
    </>
  );
}
