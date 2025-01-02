import { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/theme/theme';
import { LANGUAGE_OPTIONS } from './language-selector.types';

type LanguageSelectorProps = {
  label: string;
  value?: string;
  onChange: (code: string) => void;
  isError?: boolean;
};

export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({
  label,
  value,
  onChange,
  isError,
}) => {
  const theme = useAppTheme();
  const { primary, error } = theme.colors;
  const [isFocus, setIsFocus] = useState(false);
  const styles = useStyles(isFocus);

  return (
    <View style={styles.label}>
      <Text style={[isFocus && { color: primary }, isError && { color: error }]}>{label}</Text>

      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: primary },
          isError && { borderColor: error },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={LANGUAGE_OPTIONS}
        search={true}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={isFocus ? '' : 'Select item'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={({ value }) => {
          onChange(value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const useStyles = (isFocus = false) => {
  const theme = useAppTheme();

  return StyleSheet.create({
    label: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    dropdown: {
      flex: 1,
      height: 50,
      borderColor: isFocus ? theme.colors.primary : theme.colors.outline,
      borderWidth: isFocus ? 2 : 1,
      paddingHorizontal: theme.spacing(1),
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: isFocus ? theme.colors.primary : theme.colors.secondary,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: isFocus ? theme.colors.primary : theme.colors.secondary,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
};
