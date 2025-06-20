import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="schedule" options={{ title: 'Schedule' }} />
      <Tabs.Screen name="checkin" options={{ title: 'Check-in' }} />
        <Tabs.Screen name="class-check" options={{ title: 'ClassCheck' }} />
        <Tabs.Screen name="deadline" options={{ title: 'Deadline' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}