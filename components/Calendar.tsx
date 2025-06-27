import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';

const today = dayjs();
type CicoData = {
  id: number;
  student_id: number;
  room_id: number;
  subject_id: number;
  status: number;
  checkin_time: Dayjs[];
  checkout_time: Dayjs[];
};

const generateCalendarDays = (year: number, month: number, data: CicoData[] | null) => {
  const startOfMonth = dayjs(`${year}-${month + 1}-01`);
  const daysInMonth = startOfMonth.daysInMonth();
  const startDayOfWeek = startOfMonth.day();

  const days: {
    day: dayjs.Dayjs;
    isCurrentMonth: boolean;
    hasIndicators?: boolean;
    statuses?: ('check in' | 'check out' | 'absent')[];
  }[] = [];

  const getStatuses = (date: dayjs.Dayjs): ('check in' | 'check out' | 'absent')[] => {
    if (!data) return [];

    const statusMap = (status: number): 'check in' | 'check out' | 'absent' => {
      switch (status) {
        case 0:
          return 'check in';
        case 1:
          return 'check out';
        case 2:
          return 'absent';
        default:
          return 'absent';
      }
    };

    return data
      .filter(
        (s) =>
          s.checkin_time &&
          s.checkin_time.length > 0 &&
          dayjs(s.checkin_time[0]).isSame(date, 'day')
      )
      .map((s) => statusMap(s.status));
  };

  // Ngày cuối tháng trước
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = startOfMonth.subtract(i + 1, 'day');
    const statuses = getStatuses(date);
    days.push({
      day: date,
      isCurrentMonth: false,
      hasIndicators: statuses.length > 0,
      statuses,
    });
  }

  // Ngày trong tháng
  for (let i = 0; i < daysInMonth; i++) {
    const date = startOfMonth.add(i, 'day');
    const statuses = getStatuses(date);
    days.push({
      day: date,
      isCurrentMonth: true,
      hasIndicators: statuses.length > 0,
      statuses,
    });
  }

  // Ngày đầu tháng sau
  while (days.length % 7 !== 0) {
    const date = days[days.length - 1].day.add(1, 'day');
    const statuses = getStatuses(date);
    days.push({
      day: date,
      isCurrentMonth: false,
      hasIndicators: statuses.length > 0,
      statuses,
    });
  }

  return days;
};

const Calendar = ({
  onDateSelect,
  data,
}: {
  onDateSelect?: (date: dayjs.Dayjs) => void;
  data: CicoData[] | null;
}) => {
  const year = today.year();
  const month = today.month();
  const calendarDays = generateCalendarDays(year, month, data);
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(today);
  useEffect(() => {
    onDateSelect?.(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    statuses?: ('check in' | 'check out' | 'absent')[];
    isSelected?: boolean;
    onPress?: () => void;
  }) => {
    const containerBase = `min-h-[60px] min-w-[50px] items-center justify-start rounded-[8px] px-2.5 ${
      isSelected ? 'border border-normal' : ''
    }`;

    const getColor = (status: string) => {
      switch (status) {
        case 'check in':
          return '#a0ba46';
        case 'check out':
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
            className={`mb-1 text-center text-lg font-normal ${
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
      <Text className="text-normal justify-start self-stretch text-center text-2xl font-semibold ">
        {today.format('YYYY/MM/DD')}
      </Text>
      <View className="border-light-active mt-4 w-full self-center border-b border-t bg-white px-1 pb-1 pt-5">
        <View className="mb-5 flex-row justify-between">
          {dayHeaders.map((day, index) => (
            <Text key={index} className="text-dark flex-1 text-center text-lg font-normal">
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
        <Text className="text-darker justify-start text-base font-medium">
          {selectedDate?.format('MMMM D, YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default Calendar;
