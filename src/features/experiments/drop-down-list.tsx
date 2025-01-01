import { FontAwesome } from '@expo/vector-icons';
import React, { FunctionComponent, useState } from 'react';
import { Text } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { useAppTheme } from '~/theme/theme';

const options = [
  { key: '1', value: 'Appliances' },
  { key: '2', value: 'Cameras' },
  { key: '3', value: 'Vegetables' },
  { key: '4', value: 'Diary Products' },
  { key: '5', value: 'Drinks' },
];

export const DropDownList: FunctionComponent = () => {
  const theme = useAppTheme();
  const [selected, setSelected] = useState('');

  return (
    <>
      <Text>Your choice: {selected}</Text>
      <SelectList
        dropdownTextStyles={{ color: theme.colors.primary }}
        inputStyles={{ color: theme.colors.primary, marginLeft: 10 }}
        searchicon={<FontAwesome name="search" size={12} color={theme.colors.primary} />}
        closeicon={<FontAwesome name="close" size={12} color={theme.colors.primary} />}
        searchPlaceholder="Search..."
        setSelected={setSelected}
        data={options}
        save="key"
      />
    </>
  );
};
