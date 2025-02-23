import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';

import { SafeContainer } from '~/components/layout/safe-container';
import BottomSheetDemo from '~/features/experiments/bottom-sheet';
import { DropDownList } from '~/features/experiments/drop-down-list';
import ToasterDemoScreen from '~/features/experiments/sunner-native';
import { useAppTheme } from '~/theme/theme';

const DemoBottomSheet: FunctionComponent = () => {
  const styles = useStyles();

  return (
    <SafeContainer style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Other POCs' }} />

      <BottomSheetDemo />
      <ToasterDemoScreen />
      <DropDownList />
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      margin: theme.spacing(3),
      gap: theme.spacing(2),
    },
  });
};

export default DemoBottomSheet;
