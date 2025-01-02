import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/tab-bar-icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="ai-sentiment-analysis"
        options={{
          title: 'Sentiments',
          tabBarIcon: ({ color }) => <TabBarIcon name="smile-o" color={color} />,
        }}
      />

      <Tabs.Screen
        name="ai-translator"
        options={{
          title: 'Translator',
          tabBarIcon: ({ color }) => <TabBarIcon name="language" color={color} />,
        }}
      />
    </Tabs>
  );
}
