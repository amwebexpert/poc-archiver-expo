import { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/theme/theme';

export interface SelectOption {
  label: string;
  value: string;
}

export type DropDownSelectorProps = {
  label?: string;
  value?: string;
  onChange: (code: string) => void;
  isError?: boolean;
  options: SelectOption[];
};

export const DropDownSelector: FunctionComponent<DropDownSelectorProps> = ({
  label,
  value,
  onChange,
  isError,
  options,
}) => {
  const theme = useAppTheme();
  const { primary, error } = theme.colors;
  const [isFocus, setIsFocus] = useState(false);
  const hasLabel = !!label;
  const styles = useStyles({ isFocus, hasLabel });

  return (
    <View style={styles.label}>
      {hasLabel && (
        <Text style={[isFocus && { color: primary }, isError && { color: error }]}>{label}</Text>
      )}

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
        data={options}
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

type UseStypesProps = {
  isFocus: boolean;
  hasLabel: boolean;
};

const useStyles = ({ isFocus, hasLabel }: UseStypesProps) => {
  const theme = useAppTheme();

  return StyleSheet.create({
    label: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: hasLabel ? theme.spacing(0.5) : 0,
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
