import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { ClassSession } from './ClassSession';
import dayjs from 'dayjs';
import { CicoData } from '../type/Cico.type';

type Session = {
  courseCode: string;
  timeSlot: string;
  status: 'check in' | 'check out' | 'absent';
  statusText: string;
  date: string;
};

const statusMap = (status: number): 'check in' | 'check out' | 'absent' => {
  switch (status) {
    case 0:
      return 'check in';
    case 1:
      return 'check out';
    case 2:
    default:
      return 'absent';
  }
};

const statusTextMap = (status: number): string => {
  switch (status) {
    case 0:
      return 'Check In';
    case 1:
      return 'Check Out';
    case 2:
    default:
      return 'Absent';
  }
};

// Chuyển 1 Cico thành Session để hiển thị
const convertToSession = (item: CicoData): Session | null => {
  if (!item.checkin_time || item.checkin_time.length === 0) return null;
  const checkin = item.checkin_time[0];
  const time = dayjs(checkin);
  return {
    courseCode: item.subject_name || `SUB-${item.subject_id}`,
    timeSlot: time.format('HH:mm') + ' - ' + time.add(2, 'hour').format('HH:mm'), // hoặc lấy từ DB
    status: statusMap(item.status),
    statusText: statusTextMap(item.status),
    date: time.format('YYYY-MM-DD'),
  };
};

export const ClassSessionList = ({
  selectedDate,
  data,
}: {
  selectedDate: dayjs.Dayjs | null;
  data: CicoData[] | null;
}) => {
  if (!selectedDate || !data) return null;
  console.log(data, selectedDate);
  const filteredSessions = data
    .filter(
      (item) =>
        item.checkin_time.length > 0 && dayjs(item.checkin_time[0]).isSame(selectedDate, 'day')
    )
    .map(convertToSession)
    .filter((s): s is Session => s !== null);

  return (
    <View className="mt-4 w-full self-center bg-white">
      {filteredSessions.length === 0 ? (
        <Text className="text-darker py-6 text-center text-base font-normal">
          Hôm nay không có lịch học.
        </Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredSessions.map((session, index) => (
            <ClassSession
              key={index}
              courseCode={session.courseCode}
              timeSlot={session.timeSlot}
              status={session.status}
              statusText={session.statusText}
              index={index}
              total={filteredSessions.length}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ClassSessionList;
