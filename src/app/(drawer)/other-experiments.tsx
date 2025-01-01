import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { FunctionComponent, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import WebView from 'react-native-webview';
import { DefaultBackdrop } from '~/components/bottom-sheet/default-backdrop';

import { SafeContainer } from '~/components/safe-container';
import { DropDownList } from '~/features/experiments/drop-down-list';
import { useAppTheme } from '~/theme/theme';

const SNAP_POINTS = ['75%', '90%'];

const DemoBottomSheet: FunctionComponent = () => {
  const styles = useStyles();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();
  const handleSheetChanges = (index: number) => console.info('handleSheetChanges', index);

  return (
    <SafeContainer style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Other POCs' }} />

      <Button mode="contained" onPress={handlePresentModalPress}>
        Show Modal
      </Button>

      <DropDownList />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        enablePanDownToClose={true}
        backdropComponent={DefaultBackdrop}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
        snapPoints={SNAP_POINTS}>
        <BottomSheetScrollView style={styles.contentContainer}>
          <WebView
            style={{ height: 600 }}
            source={{ uri: 'https://google.com' }}
            nestedScrollEnabled={true}
            javaScriptEnabled={true}
            javaScriptCanOpenWindowsAutomatically={true}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
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
    contentContainer: {
      flex: 1,
      width: '100%',
    },
  });
};

export default DemoBottomSheet;
