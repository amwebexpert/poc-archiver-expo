import FontAwesome from '@expo/vector-icons/FontAwesome';
import { type FunctionComponent } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  onPress?: () => void;
};

export const HeaderButton: FunctionComponent<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <FontAwesome
          name="gear"
          size={25}
          color="gray"
          style={[
            styles.headerRight,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        />
      )}
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});
