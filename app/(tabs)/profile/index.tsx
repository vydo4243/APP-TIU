import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import User from '~/assets/icons/user.svg';
import Profile from '~/assets/icons/college.svg';
import StudentID from '~/assets/icons/studentid.svg';
import Bookmark from '~/assets/icons/bookmark.svg';
import Book from '~/assets/icons/book.svg';
import Logout from '~/assets/icons/signout.svg';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StudentInfo = {
  name: string;
  mssv: string;
  gender: string;
  major: string;
  class: string;
  type: string;
};

type GradeRow = {
  id: number;
  class: string;
  tc: number;
  qt: number;
  th: number | null;
  gk: number;
  ck: number;
  tb: number;
};

type SemesterData = {
  name: string;
  grades: GradeRow[];
};

// const semesters: SemesterData[] = [
//   {
//     name: 'Semester 1, 2023-2024',
//     grades: [
//       ['1', 'MATH101', '3', '8', '9', '8', '9', '9'],
//       ['2', 'ENG101', '2', '9', '8', '9', '9', '9'],
//     ],
//   },
//   {
//     name: 'Semester 2, 2023-2024',
//     grades: [
//       ['1', 'PHY101', '4', '7', '9', '8', '8', '8'],
//       ['2', 'CS102', '3', '9', '9', '9', '9', '9'],
//     ],
//   },
//   {
//     name: 'Semester 1, 2024-2025',
//     grades: [
//       ['1', 'SE101.P22', '2', '9', '9', '9', '9', '9'],
//       ['2', 'IT101.P22', '4', '9', '9', '9', '9', '9'],
//       ['3', 'AI303.O22', '2', '9', '9', '9', '9', '9'],
//       ['4', 'CA409.P11', '2', '9', '9', '9', '9', '9'],
//       ['5', 'MA105.P09', '4', '9', '9', '9', '9', '9'],
//     ],
//   },
// ];

export default function ProfileScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState<number>(2); // Mặc định: kỳ mới nhất
  // const currentSemester = semesters[currentSemesterIndex];
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [semesters, setSemesters] = useState<SemesterData[]>([]);
  const columnWidths: number[] = [40, 90, 40, 40, 40, 40, 40, 40];
  const headers = ['ID', 'CLASS', 'TC', 'QT', 'TH', 'GK', 'CK', 'TB'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const storedId = await AsyncStorage.getItem('studentId');
        const numericId = Number(storedId);
        const studentRes = await fetch('https://api.jsonbin.io/v3/b/685d77b48561e97a502c5b82');
        const studentJson = await studentRes.json();

        const matchedStudent = studentJson.record.find((s: any) => s.id === numericId);
        if (matchedStudent) {
          setStudent(matchedStudent);
        }

        const gradeRes = await fetch('https://api.jsonbin.io/v3/b/685d86d18561e97a502c60d9');
        const gradeJson = await gradeRes.json();
        const matchedGrades = gradeJson.record.find(
          (student: any) => Number(student.studentId) === numericId
        );
        console.log('Matched Grades:', matchedGrades);

        if (matchedGrades) {
          setSemesters(matchedGrades.semesters);
          setCurrentSemesterIndex(matchedGrades.semesters.length - 1); // kỳ mới nhất
        } else {
          console.warn('Không tìm thấy điểm của sinh viên');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {/* Popup Modal */}
      <Modal
        visible={showLogoutModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowLogoutModal(false)}>
        <View className="flex-1 items-center justify-center bg-black/30">
          <ImageBackground
            source={require('~/assets/popup.png')}
            imageStyle={{ borderRadius: 16 }}
            className="relative w-[85%] px-6 py-16">
            {/* Text */}
            <Text className="text-normal-hover mb-4 text-center text-xl font-medium">
              Are you sure ?
            </Text>

            {/* Buttons */}
            <View className="flex-row justify-center gap-4 space-x-4">
              <TouchableOpacity
                className="border-normal bg-normal h-[54px] w-[120px] items-center justify-center rounded-full border"
                onPress={async () => {
                  await AsyncStorage.removeItem('studentId');
                  setShowLogoutModal(false);
                  router.push('/login');
                }}>
                <Text className="text-lg font-normal text-white">Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                className="border-normal h-[54px] w-[120px] items-center justify-center rounded-full border">
                <Text className="text-dark text-lg font-normal">Cancel</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>

      {isLoading ? (
        <View className="mt-32 flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#394A92" />
          <Text className="text-dark mt-4 text-lg">Loading...</Text>
        </View>
      ) : (
        <ScrollView className="flex-1 bg-white px-4 pt-16">
          {/* Header */}
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-1 items-center">
              <Text className="text-normal text-2xl font-semibold">PROFILE</Text>
            </View>
            <TouchableOpacity className="absolute right-0">
              <Logout
                height={34}
                width={24}
                color="#394A92"
                onPress={() => setShowLogoutModal(true)}
              />
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
          {student && (
            <View className="border-normal mb-6 rounded-xl border p-4">
              <View className="mb-2 flex-row items-center gap-2">
                <User width={22} height={22} className="mr-2" />
                <Text className="text-dark text-lg font-semibold">Full name:</Text>
                <Text className="text-darker text-lg font-normal">{student.name}</Text>
              </View>
              <View className="mb-2 flex-row items-center gap-2">
                <Profile width={22} height={22} className="mr-2" />
                <Text className="text-dark text-lg font-semibold">Class:</Text>
                <Text className="text-darker text-lg font-normal">{student.class}</Text>
              </View>
              <View className="mb-2 flex-row items-center gap-2">
                <StudentID width={22} height={22} color="#394A92" className="mr-2" />
                <Text className="text-dark text-lg font-semibold">Student ID:</Text>
                <Text className="text-darker text-lg font-normal">{student.mssv}</Text>
              </View>
              <View className="mb-2 flex-row items-center gap-2">
                <Bookmark width={22} height={22} color="#394A92" className="mr-2" />
                <Text className="text-dark text-lg font-semibold">Faculty:</Text>
                <Text className="text-darker text-lg font-normal">{student.major}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Book width={22} height={22} color="#394A92" className="mr-2" />
                <Text className="text-dark text-lg font-semibold">Program Type:</Text>
                <Text className="text-darker text-lg font-normal">{student.type}</Text>
              </View>
            </View>
          )}

          {/* Grade Header */}
          {semesters.length > 0 && (
            <>
              <Text className="text-normal mb-4 text-center text-2xl font-semibold">GRADE</Text>

              <View className="mb-2 flex-row items-center justify-between">
                <TouchableOpacity
                  disabled={currentSemesterIndex === 0}
                  onPress={() => setCurrentSemesterIndex((prev) => Math.max(prev - 1, 0))}>
                  <ChevronLeft color={currentSemesterIndex === 0 ? '#ccc' : '#4B63B7'} />
                </TouchableOpacity>

                <View className="bg-light rounded-full px-10 py-2">
                  <Text className="text-dark text-base font-medium">
                    {semesters[currentSemesterIndex].name}
                  </Text>
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
                {semesters.length > 0 &&
                  semesters[currentSemesterIndex]?.grades?.map((row, rowIndex) => (
                    <View key={rowIndex} className="border-light-active flex-row border-t">
                      {[row.id, row.class, row.tc, row.qt, row.th, row.gk, row.ck, row.tb].map(
                        (cell, i) => (
                          <Text
                            key={i}
                            numberOfLines={1}
                            className="border-light-active text-darker border-r p-2 text-center text-base last:border-r-0"
                            style={{ width: columnWidths[i] }}>
                            {cell}
                          </Text>
                        )
                      )}
                    </View>
                  ))}
              </View>
            </>
          )}

          <View className="h-8" />
        </ScrollView>
      )}
    </>
  );
}
