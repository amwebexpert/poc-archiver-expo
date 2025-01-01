import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';

import { SafeContainer } from '~/components/safe-container';
import BottomSheetDemo from '~/features/experiments/bottom-sheet';
import { DropDownList } from '~/features/experiments/drop-down-list';
import { useAppTheme } from '~/theme/theme';

const DemoBottomSheet: FunctionComponent = () => {
  const styles = useStyles();

  return (
    <SafeContainer style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Other POCs' }} />

      <BottomSheetDemo />
      <DropDownList />
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      margin: theme.spacing(3),
      gap: theme.spacing(3),
    },
  });
};

export default DemoBottomSheet;
