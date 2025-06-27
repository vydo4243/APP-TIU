import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import BookIcon from '~/assets/icons/book.svg';
import Timer from '~/assets/icons/timer.svg';
import UnTimer from '~/assets/icons/timerfill.svg';
import ScheduleIcon from '~/assets/icons/schedule.svg';
import UnSubmit from '~/assets/icons/submit.svg';
import Submit from '~/assets/icons/submitfill.svg';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DeadlineItem = {
  id: number;
  course: string;
  link_id: string;
  title: string;
  dueDate: string;
  status: 'deadline-passed' | 'still-open';
  submitted: boolean;
};

export default function DeadlineScreen() {
  // const deadlines = [
  //   {
  //     subject: 'SE113.P21.CNCL',
  //     title: 'Submit course project',
  //     date: '17/06/2025 00:00:00',
  //     status: false,
  //     isSubmitted: false,
  //     url: 'https://courses.uit.edu.vn',
  //   },
  //   {
  //     subject: 'SE113.P21.CNCL',
  //     title: 'Submit course project',
  //     date: '17/06/2025 00:00:00',
  //     status: false,
  //     isSubmitted: true,
  //     url: 'https://courses.uit.edu.vn',
  //   },
  //   {
  //     subject: 'SE113.P21.CNCL',
  //     title: 'Submit course project',
  //     date: '17/06/2025 00:00:00',
  //     status: true,
  //     isSubmitted: false,
  //     url: 'https://courses.uit.edu.vn',
  //   },
  //   {
  //     subject: 'SE113.P21.CNCL',
  //     title: 'Submit course project',
  //     date: '17/06/2025 00:00:00',
  //     status: false,
  //     isSubmitted: true,
  //     url: 'https://courses.uit.edu.vn',
  //   },
  // ];
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        const storedId = await AsyncStorage.getItem('studentId');
        const numericId = Number(storedId);

        const res = await fetch('https://api.jsonbin.io/v3/b/685d8d398960c979a5b1fd5f');
        const json = await res.json();

        const matchedStudent = json.record.find(
          (student: any) => Number(student.studentId) === numericId
        );

        if (matchedStudent) {
          setDeadlines(matchedStudent.deadlines);
        } else {
          console.warn('Không tìm thấy deadline của sinh viên');
        }
      } catch (err) {
        console.error('Fetch deadline error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeadlines();
  }, []);

  const renderStatus = (status: string, submitted: boolean) => {
    return (
      <>
        <View className="mt-2 flex-row items-center gap-2 space-x-2">
          {status === 'deadline-passed' ? <UnTimer width={22} height={22} /> : <Timer width={22} height={22} />}
          <Text className="text-darker text-lg font-normal">
            {status === 'deadline-passed' ? 'Deadline Passed' : 'Still Open'}
          </Text>
        </View>
        <View className="mt-2 flex-row items-center gap-2 space-x-2">
          {submitted ? <Submit width={22} height={22} /> : <UnSubmit width={22} height={22} />}
          <Text className="text-darker text-lg font-normal">
            {submitted ? 'Submitted' : 'Not Submitted'}
          </Text>
        </View>
      </>
    );
  };

  const handleOpenURL = (link: string) => {
    const url = `https://courses.uit.edu.vn/course/view.php?id=${link}`;
    Linking.openURL(url);
  };

  return (
    <>
          {isLoading ? (
        <View className="mt-32 flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#394A92" />
          <Text className="mt-4 text-lg text-dark">Loading...</Text>
        </View>
      ) : (
    <ScrollView className="flex-1 bg-white px-4 pt-16">
      <View className="flex-row items-center justify-center space-x-3 px-4 pb-4">
        <Text className="text-normal text-2xl font-semibold">DEADLINE</Text>
      </View>
      <View>
        {deadlines.map((item, index) => (
          <View key={index} className="border-light-active mb-4 rounded-xl border p-4">
            <View className="flex-row items-center gap-2 space-x-2">
              <BookIcon width={22} height={22} />
              <Text className="text-darker text-lg font-semibold">{item.course}</Text>
            </View>

            <Text className="text-darker mt-1 text-xl font-medium">{item.title}</Text>

            <View className="mt-2 flex-row items-center gap-2 space-x-2">
              <ScheduleIcon width={22} height={22} />
              <Text className="text-dark text-lg font-semibold">{new Date(item.dueDate).toLocaleString()}</Text>
            </View>

            {renderStatus(item.status, item.submitted)}

            <View className="absolute bottom-4 right-4 mt-4 items-end">
              <TouchableOpacity
                className="bg-primary bg-normal flex-row items-center justify-center gap-2 space-x-2 rounded-full px-6 py-2"
                onPress={() => handleOpenURL(item.link_id)}>
                <Text className="font-semibold text-white">View</Text>
                <ArrowRight size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )}
  </>
  );
}
