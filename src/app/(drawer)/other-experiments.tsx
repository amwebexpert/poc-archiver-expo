import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { Fragment, useRef } from 'react';
import { Button, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { DefaultBackdrop } from '~/components/bottom-sheet/default-backdrop';

import { Container } from '~/components/safe-container';

const SNAP_POINTS = ['75%', '90%'];

const webViewScript = `
  setTimeout(function() { 
    window.postMessage(document.documentElement.scrollHeight); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;

export default function DemoBottomSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();
  const handleSheetChanges = (index: number) => console.info('handleSheetChanges', index);

  // renders
  return (
    <Fragment>
      <Stack.Screen options={{ headerTitle: 'Other POCs' }} />

      <Container>
        <Button onPress={handlePresentModalPress} title="Show Modal" color="black" />

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
      </Container>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
});
