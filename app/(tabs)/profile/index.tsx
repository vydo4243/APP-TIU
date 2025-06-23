import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import User from '~/assets/icons/user.svg';
import Profile from '~/assets/icons/college.svg';
import StudentID from '~/assets/icons/studentid.svg';
import Bookmark from '~/assets/icons/bookmark.svg';
import Book from '~/assets/icons/book.svg';
import Logout from '~/assets/icons/signout.svg';
import { useState } from 'react';

type GradeRow = [string, string, string, string, string, string, string, string];

type SemesterData = {
  name: string;
  grades: GradeRow[];
};

const semesters: SemesterData[] = [
  {
    name: 'Semester 1, 2023-2024',
    grades: [
      ['1', 'MATH101', '3', '8', '9', '8', '9', '9'],
      ['2', 'ENG101', '2', '9', '8', '9', '9', '9'],
    ],
  },
  {
    name: 'Semester 2, 2023-2024',
    grades: [
      ['1', 'PHY101', '4', '7', '9', '8', '8', '8'],
      ['2', 'CS102', '3', '9', '9', '9', '9', '9'],
    ],
  },
  {
    name: 'Semester 1, 2024-2025',
    grades: [
      ['1', 'SE101.P22', '2', '9', '9', '9', '9', '9'],
      ['2', 'IT101.P22', '4', '9', '9', '9', '9', '9'],
      ['3', 'AI303.O22', '2', '9', '9', '9', '9', '9'],
      ['4', 'CA409.P11', '2', '9', '9', '9', '9', '9'],
      ['5', 'MA105.P09', '4', '9', '9', '9', '9', '9'],
    ],
  },
];

export default function ProfileScreen() {
  const columnWidths: number[] = [40, 90, 40, 40, 40, 40, 40, 40];
  const headers = ['ID', 'CLASS', 'TC', 'QT', 'TH', 'GK', 'CK', 'TB'];

  const [currentSemesterIndex, setCurrentSemesterIndex] = useState<number>(2); // Mặc định: kỳ mới nhất
  const currentSemester = semesters[currentSemesterIndex];

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-16">
      {/* Header */}
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-1 items-center">
          <Text className="text-normal text-2xl font-semibold">PROFILE</Text>
        </View>
        <TouchableOpacity className="absolute right-0">
          <Logout height={34} width={24} color="#394A92" />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View className="mb-4 items-center">
        <Image
          source={require('~/assets/avatar.png')}
          className="h-20 w-20 rounded-full"
          resizeMode="contain"
        />
        <View className="mt-3 rounded-full bg-[#F1A805] px-4 py-2">
          <Text className="text-lg font-normal text-white">Currently studying</Text>
        </View>
      </View>

      {/* Info Box */}
      <View className="border-normal mb-6 rounded-xl border p-4">
        <View className="mb-2 flex-row items-center gap-2">
          <User width={22} height={22} className="mr-2" />
          <Text className="text-dark text-lg font-semibold">Full name:</Text>
          <Text className="text-darker text-lg font-normal">Fish Can Fly</Text>
        </View>
        <View className="mb-2 flex-row items-center gap-2">
          <Profile width={22} height={22} className="mr-2" />
          <Text className="text-dark text-lg font-semibold">Class:</Text>
          <Text className="text-darker text-lg font-normal">CNNB2022.2</Text>
        </View>
        <View className="mb-2 flex-row items-center gap-2">
          <StudentID width={22} height={22} color="#394A92" className="mr-2" />
          <Text className="text-dark text-lg font-semibold">Student ID:</Text>
          <Text className="text-darker text-lg font-normal">22529999</Text>
        </View>
        <View className="mb-2 flex-row items-center gap-2">
          <Bookmark width={22} height={22} color="#394A92" className="mr-2" />
          <Text className="text-dark text-lg font-semibold">Faculty:</Text>
          <Text className="text-darker text-lg font-normal">KTTT</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Book width={22} height={22} color="#394A92" className="mr-2" />
          <Text className="text-dark text-lg font-semibold">Program Type:</Text>
          <Text className="text-darker text-lg font-normal">CQUI</Text>
        </View>
      </View>

      {/* Grade Header */}
      <Text className="text-normal mb-4 text-center text-2xl font-semibold">GRADE</Text>

      <View className="mb-2 flex-row items-center justify-between">
        <TouchableOpacity
          disabled={currentSemesterIndex === 0}
          onPress={() => setCurrentSemesterIndex((prev) => Math.max(prev - 1, 0))}>
          <ChevronLeft color={currentSemesterIndex === 0 ? '#ccc' : '#4B63B7'} />
        </TouchableOpacity>

        <View className="bg-light rounded-full px-10 py-2">
          <Text className="text-dark text-base font-medium">{currentSemester.name}</Text>
        </View>

        <TouchableOpacity
          disabled={currentSemesterIndex === semesters.length - 1}
          onPress={() =>
            setCurrentSemesterIndex((prev) => Math.min(prev + 1, semesters.length - 1))
          }>
          <ChevronRight
            color={currentSemesterIndex === semesters.length - 1 ? '#ccc' : '#4B63B7'}
          />
        </TouchableOpacity>
      </View>

      {/* Grade Table */}
      <View className="border-light-active overflow-hidden rounded-xl border">
        {/* Header row */}
        <View className="flex-row bg-[#F2F4FF]">
          {headers.map((header, i) => (
            <Text
              key={i}
              numberOfLines={1}
              className="border-light-active text-dark border-r p-2 text-center text-lg font-bold last:border-r-0"
              style={{ width: columnWidths[i] }}>
              {header}
            </Text>
          ))}
        </View>

        {/* Data rows */}
        {currentSemester.grades.map((row, rowIndex) => (
          <View key={rowIndex} className="border-light-active flex-row border-t">
            {row.map((cell, i) => (
              <Text
                key={i}
                numberOfLines={1}
                className="border-light-active text-darker border-r p-2 text-center text-base last:border-r-0"
                style={{ width: columnWidths[i] }}>
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View className="h-8" />
    </ScrollView>
  );
}
