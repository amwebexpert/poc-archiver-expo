import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { FunctionComponent } from 'react';
import { HeaderButton } from '~/components/header-button';

const DrawerLayout: FunctionComponent = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="(home)"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} />,
          headerRight: () => <HeaderButton onPress={() => router.push('/settings')} />,
        }}
      />

      <Drawer.Screen
        name="other-experiments"
        options={{
          headerTitle: 'other experiments',
          drawerLabel: 'Other POCs',
          drawerIcon: ({ size, color }) => <Fontisto name="laboratory" size={size} color={color} />,
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
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          headerTitle: 'About',
          drawerLabel: 'About',
          drawerIcon: ({ size, color }) => <MaterialIcons name="info" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
