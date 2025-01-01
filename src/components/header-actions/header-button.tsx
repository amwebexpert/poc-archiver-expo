import FontAwesome from '@expo/vector-icons/FontAwesome';
import { type FunctionComponent } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useAppTheme } from '~/theme/theme';

type Props = {
  iconName: keyof typeof FontAwesome.glyphMap;
  onPress?: () => void;
};

export const HeaderButton: FunctionComponent<Props> = ({ iconName, onPress }) => {
  const styles = useStyles();
  const theme = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <FontAwesome
          name={iconName}
          size={25}
          color={theme.colors.primary}
          style={[
            styles.iconStyle,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        />
      )}
    </Pressable>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    iconStyle: {
      marginHorizontal: theme.spacing(2),
    },
  });
};
