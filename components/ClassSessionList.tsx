import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ClassSession } from './ClassSession';
import dayjs from 'dayjs';

type Session = {
  courseCode: string;
  timeSlot: string;
  status: 'on-time' | 'late' | 'absent';
  statusText: string;
  date: string;
};

export const ClassSessionList = ({ selectedDate, sessions }: { selectedDate: dayjs.Dayjs | null; sessions: Session[]; }) => {
  if (!selectedDate) return null; // chưa chọn ngày thì không hiển thị
const filteredSessions = sessions.filter((session) =>
    dayjs(session.date).isSame(selectedDate, 'day')
  );

  return (
    <View className="mt-4 w-full self-center bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredSessions.map((session, index) => (
            <ClassSession
              key={index}
              courseCode={session.courseCode}
              timeSlot={session.timeSlot}
              status={session.status}
              statusText={session.statusText}
              isLast={index === filteredSessions.length - 1}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default ClassSessionList;
