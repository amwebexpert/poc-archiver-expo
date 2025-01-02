import { FontAwesome } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { useAppTheme } from '~/theme/theme';
import { LANGUAGE_OPTIONS } from './language-selector.types';

type LanguageSelectorProps = {
  label: string;
  value?: string;
  onChange: (code: string) => void;
  error?: boolean;
};

export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  const style = useStyles();
  const theme = useAppTheme();
  const color = theme.colors.primary;
  const defaultOption = LANGUAGE_OPTIONS.find(({ key }) => key === value);

  return (
    <View style={style.row}>
      <Text>{label}</Text>
      <SelectList
        boxStyles={{ width: 260 }}
        dropdownTextStyles={{ color }}
        inputStyles={{
          color,
          marginLeft: theme.spacing(2),
          borderColor: error ? 'red' : undefined,
        }}
        searchicon={<FontAwesome name="search" size={12} color={color} />}
        closeicon={<FontAwesome name="close" size={12} color={color} />}
        searchPlaceholder={label}
        setSelected={onChange}
        data={LANGUAGE_OPTIONS}
        save="key"
        defaultOption={defaultOption}
      />
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(2),
    },
  });
};
