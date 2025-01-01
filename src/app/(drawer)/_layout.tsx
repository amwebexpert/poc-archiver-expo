import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { FunctionComponent } from 'react';
import { HeaderBackButton } from '~/components/header-actions/header-back-button';
import { HeaderButton } from '~/components/header-actions/header-button';

const DrawerLayout: FunctionComponent = () => {
  return (
    <Drawer initialRouteName="(home)">
      <Drawer.Screen
        name="(home)"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} />,
          headerRight: () => (
            <HeaderButton iconName="gear" onPress={() => router.push('/settings')} />
          ),
        }}
      />

      <Drawer.Screen
        name="other-experiments"
        options={{
          headerTitle: 'other experiments',
          drawerLabel: 'Other POCs',
          drawerIcon: ({ size, color }) => <Fontisto name="laboratory" size={size} color={color} />,
          headerLeft: () => <HeaderBackButton />,
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          headerTitle: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
          headerLeft: () => <HeaderBackButton />,
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          headerTitle: 'About',
          drawerLabel: 'About',
          drawerIcon: ({ size, color }) => <MaterialIcons name="info" size={size} color={color} />,
          headerLeft: () => <HeaderBackButton />,
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
