import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import ScheduleIcon from '~/assets/icons/schedule.svg';
import ScheduleIconActive from '~/assets/icons/schedulefill.svg';
import CheckinIcon from '~/assets/icons/award.svg';
import CheckinIconActive from '~/assets/icons/awardfill.svg';
import ClassCheckIcon from '~/assets/icons/classcheck.svg';
import ClassCheckIconActive from '~/assets/icons/classcheckfill.svg';
import DeadlineIcon from '~/assets/icons/deadline.svg';
import DeadlineIconActive from '~/assets/icons/deadlinefill.svg';
import ProfileIcon from '~/assets/icons/college.svg';
import ProfileIconActive from '~/assets/icons/collegefill.svg';

type TabRouteName = 'schedule' | 'checkin' | 'class-check' | 'deadline' | 'profile';

const TAB_CONFIG: Record<
  TabRouteName,
  {
    label: string;
    IconUnactive: React.ComponentType<{ width: number; height: number }>;
    IconActive: React.ComponentType<{ width: number; height: number }>;
  }
> = {
  schedule: { label: 'Schedule', IconUnactive: ScheduleIcon, IconActive: ScheduleIconActive },
  checkin: { label: 'Check-in', IconUnactive: CheckinIcon, IconActive: CheckinIconActive },
  'class-check': {
    label: 'ClassCheck',
    IconUnactive: ClassCheckIcon,
    IconActive: ClassCheckIconActive,
  },
  deadline: { label: 'Deadline', IconUnactive: DeadlineIcon, IconActive: DeadlineIconActive },
  profile: { label: 'Profile', IconUnactive: ProfileIcon, IconActive: ProfileIconActive },
} as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90, // tăng chiều cao ở đây
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          paddingBottom: 10, // giúp label không bị cấn cạnh dưới
        },
        tabBarIcon: ({ focused }) => {
          const routeName = route.name as TabRouteName;
          const { label, IconActive, IconUnactive } = TAB_CONFIG[routeName];
          const Icon = focused ? IconActive : IconUnactive;

          return (
            <View className="w-[70px] items-center justify-center pt-8">
              <Icon width={30} height={30} />
              <Text
                className={`text-dark mt-1 text-center text-xs`}
                numberOfLines={1}
                ellipsizeMode="tail">
                {label}
              </Text>
            </View>
          );
        },
      })}>
      <Tabs.Screen name="schedule" options={{ title: 'Schedule' }} />
      <Tabs.Screen name="checkin" options={{ title: 'Check-in' }} />
      <Tabs.Screen name="class-check" options={{ title: 'ClassCheck' }} />
      <Tabs.Screen name="deadline" options={{ title: 'Deadline' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
