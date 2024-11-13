import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/header-button';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="(home)"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),
        headerRight: () => <HeaderButton />,
      }}
    />

    <Drawer.Screen
      name="demo-bottom-sheet"
      options={{
        headerTitle: '@gorhom/bottom-sheet',
        drawerLabel: 'Bottom sheet',
        drawerIcon: ({ size, color }) => <Ionicons name="information-circle" size={size} color={color} />,
      }}
    />
  </Drawer>
);

export default DrawerLayout;
