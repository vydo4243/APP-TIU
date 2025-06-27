import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import BookIcon from '~/assets/icons/book.svg';
import Timer from '~/assets/icons/timer.svg';
import ScheduleIcon from '~/assets/icons/schedule.svg';
import UnSubmit from '~/assets/icons/submit.svg';
import Submit from '~/assets/icons/submitfill.svg';
import { useEffect, useState } from 'react';

export default function DeadlineScreen() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      let responseData = null;
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hello`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Đăng nhập thất bại');
        }
        console.log(response);

        responseData = await response.json();

        return responseData; // Trả về kết quả nếu thành công
      } catch (error) {
        // throw error.message; // Quăng lỗi để controller xử lý
      }
      if (responseData) {
        setData(responseData.description); // Lưu dữ liệu nếu hợp lệ
        console.log(data);
      }
    }

    fetchData();
  }, []);
  const deadlines = [
    {
      subject: 'SE113.P21.CNCL',
      title: 'Submit course project',
      date: '17/06/2025 00:00:00',
      isLate: false,
      isSubmitted: false,
      url: 'https://courses.uit.edu.vn',
    },
    {
      subject: 'SE113.P21.CNCL',
      title: 'Submit course project',
      date: '17/06/2025 00:00:00',
      isLate: false,
      isSubmitted: true,
      url: 'https://courses.uit.edu.vn',
    },
    {
      subject: 'SE113.P21.CNCL',
      title: 'Submit course project',
      date: '17/06/2025 00:00:00',
      isLate: true,
      isSubmitted: false,
      url: 'https://courses.uit.edu.vn',
    },
    {
      subject: 'SE113.P21.CNCL',
      title: 'Submit course project',
      date: '17/06/2025 00:00:00',
      isLate: false,
      isSubmitted: true,
      url: 'https://courses.uit.edu.vn',
    },
  ];

  const renderStatus = (isLate: boolean, isSubmitted: boolean) => {
    return (
      <>
        <View className="mt-2 flex-row items-center gap-2 space-x-2">
          <Timer width={22} height={22} />
          <Text className="text-darker text-lg font-normal">
            {isLate ? 'Deadline Passed' : 'Still Open'}
          </Text>
        </View>
        <View className="mt-2 flex-row items-center gap-2 space-x-2">
          {isSubmitted ? <Submit width={22} height={22} /> : <UnSubmit width={22} height={22} />}
          <Text className="text-darker text-lg font-normal">
            {isSubmitted ? 'Submitted' : 'Not Submitted'}
          </Text>
        </View>
      </>
    );
  };
  const handleOpenURL = (url: string) => {
    Linking.openURL(url);
  };
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-16">
      <View className="flex-row items-center justify-center space-x-3 px-4 pb-4">
        <Text className="text-normal text-2xl font-semibold">DEADLINE</Text>
      </View>
      <View>
        {deadlines.map((item, index) => (
          <View key={index} className="border-light-active mb-4 rounded-xl border p-4">
            <View className="flex-row items-center gap-2 space-x-2">
              <BookIcon width={22} height={22} />
              <Text className="text-darker text-lg font-semibold">{item.subject}</Text>
            </View>

            <Text className="text-darker mt-1 text-xl font-medium">{item.title}</Text>

            <View className="mt-2 flex-row items-center gap-2 space-x-2">
              <ScheduleIcon width={22} height={22} />
              <Text className="text-dark text-lg font-semibold">{item.date}</Text>
            </View>

            {renderStatus(item.isLate, item.isSubmitted)}

            <View className="absolute bottom-4 right-4 mt-4 items-end">
              <TouchableOpacity
                className="bg-primary bg-normal flex-row items-center justify-center gap-2 space-x-2 rounded-full px-6 py-2"
                onPress={() => handleOpenURL(item.url)}>
                <Text className="font-semibold text-white">View</Text>
                <ArrowRight size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
