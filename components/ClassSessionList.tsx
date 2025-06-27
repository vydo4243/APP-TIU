import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ClassSession } from './ClassSession';
import dayjs from 'dayjs';

type Session = {
  courseCode: string;
  timeSlot: string;
  status: 'on-time' | 'late' | 'absent';
  statusText: string;
  date: string;
  checkIn?: string | null;
  checkOut?: string | null;
};

export const ClassSessionList = ({ selectedDate, sessions }: { selectedDate: dayjs.Dayjs | null; sessions: Session[]; }) => {
  if (!selectedDate) return null; // chưa chọn ngày thì không hiển thị
const filteredSessions = sessions.filter((session) =>
    dayjs(session.date).isSame(selectedDate, 'day')
  );

  return (
    <View className="mt-4 w-full self-center bg-white">
       {filteredSessions.length === 0 ? (
        <Text className="text-base font-normal text-darker text-center py-6">
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
              checkIn={session.checkIn ?? null}
              checkOut={session.checkOut ?? null}
            />
          ))}
      </ScrollView>
      )}
    </View>
  );
};

export default ClassSessionList;
