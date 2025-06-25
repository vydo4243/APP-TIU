import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import dayjs from 'dayjs';

const today = dayjs();

const generateCalendarDays = (
  year: number,
  month: number,
  sessions: {
    courseCode: string;
    timeSlot: string;
    status: 'on-time' | 'late' | 'absent';
    statusText: string;
    date: string;
  }[]
) => {
  const startOfMonth = dayjs(`${year}-${month + 1}-01`);
  const daysInMonth = startOfMonth.daysInMonth();
  const startDayOfWeek = startOfMonth.day();

  const days: {
    day: dayjs.Dayjs;
    isCurrentMonth: boolean;
    hasIndicators?: boolean;
    statuses?: ('on-time' | 'late' | 'absent')[];
  }[] = [];

  const getStatuses = (date: dayjs.Dayjs) => {
    return sessions.filter((s) => dayjs(s.date).isSame(date, 'day')).map((s) => s.status);
  };

  // Ngày cuối tháng trước
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = startOfMonth.subtract(i + 1, 'day');
    days.push({
      day: date,
      isCurrentMonth: false,
      hasIndicators: getStatuses(date).length > 0,
      statuses: getStatuses(date),
    });
  }

  // Ngày trong tháng
  for (let i = 0; i < daysInMonth; i++) {
    const date = startOfMonth.add(i, 'day');
    days.push({
      day: date,
      isCurrentMonth: true,
      hasIndicators: getStatuses(date).length > 0,
      statuses: getStatuses(date),
    });
  }

  // Ngày đầu tháng sau
  while (days.length % 7 !== 0) {
    const date = days[days.length - 1].day.add(1, 'day');
    days.push({
      day: date,
      isCurrentMonth: false,
      hasIndicators: getStatuses(date).length > 0,
      statuses: getStatuses(date),
    });
  }

  return days;
};

const Calendar = ({
  onDateSelect,
  sessions,
}: {
  onDateSelect?: (date: dayjs.Dayjs) => void;
  sessions: {
    courseCode: string;
    timeSlot: string;
    status: 'on-time' | 'late' | 'absent';
    statusText: string;
    date: string;
  }[];
}) => {
  const year = today.year();
  const month = today.month();
  const calendarDays = generateCalendarDays(year, month, sessions);
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(today);
  useEffect(() => {
    onDateSelect?.(today);
  }, []);
  const handleSelect = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };
  const CalendarDay = ({
    day,
    isCurrentMonth,
    statuses = [],
    isSelected,
    onPress,
  }: {
    day: dayjs.Dayjs;
    isCurrentMonth: boolean;
    statuses?: ('on-time' | 'late' | 'absent')[];
    isSelected?: boolean;
    onPress?: () => void;
  }) => {
    const containerBase = `h-[61px] w-[61px] items-center justify-start rounded-[8px] px-2.5 ${
      isSelected ? 'border border-normal' : ''
    }`;

    const getColor = (status: string) => {
      switch (status) {
        case 'on-time':
          return '#a0ba46';
        case 'late':
          return '#f1a805';
        case 'absent':
          return '#888888';
        default:
          return '#a0ba46'; // gray
      }
    };

    return (
      <Pressable onPress={onPress}>
        <View className={containerBase}>
          <Text
            className={`mb-1 text-center font-normal text-lg ${
              isCurrentMonth ? 'text-darker' : 'text-light-active'
            }`}>
            {day.date()}
          </Text>
          {statuses.map((status, idx) => (
            <View
              key={idx}
              className="mb-1 h-1 w-[41px] rounded-[20px]"
              style={{ backgroundColor: getColor(status) }}
            />
          ))}
        </View>
      </Pressable>
    );
  };

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <View className="w-full flex-1 items-center justify-center self-center bg-white">
      <Text className="justify-start self-stretch text-center font-semibold text-2xl text-normal ">
        {today.format('YYYY/MM/DD')}
      </Text>
      <View className="mt-4 w-full self-center border-b border-t border-light-active bg-white px-1 pt-5">
        <View className="mb-5 flex-row justify-between">
          {dayHeaders.map((day, index) => (
            <Text key={index} className="flex-1 text-center font-normal text-lg text-dark">
              {day}
            </Text>
          ))}
        </View>

        {weeks.map((week, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between">
            {week.map(({ day, isCurrentMonth, statuses }, colIndex) => {
              const isSelected = selectedDate?.isSame(day, 'day');

              return (
                <CalendarDay
                  key={colIndex}
                  day={day}
                  isCurrentMonth={isCurrentMonth}
                  statuses={statuses}
                  isSelected={isSelected}
                  onPress={() => handleSelect(day)}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View className="mt-4 w-full self-center bg-white px-4">
        <Text className="justify-start font-medium text-base text-darker">
          {selectedDate?.format('MMMM D, YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default Calendar;
