import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useRef } from 'react';
import { Button, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { DefaultBackdrop } from '~/components/bottom-sheet/default-backdrop';

import { DEMO_TAKE_PICTURE_HTML } from '~/components/bottom-sheet/bottom-sheet.utils';
import { Container } from '~/components/container';

const SNAP_POINTS = ['75%', '100%'];

export default function DemoBottomSheet() {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();

  const handleDismissModalPress = () => bottomSheetModalRef.current?.dismiss();

  const handleSheetChanges = (index: number) => console.log('handleSheetChanges', index);

  // renders
  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Demo @gorhom/bottom-sheet' }} />

      <Container>
        <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
        <Button onPress={handleDismissModalPress} title="Dismiss Modal" color="black" />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          enablePanDownToClose={true}
          backdropComponent={DefaultBackdrop}
          enableDynamicSizing={false}
          onChange={handleSheetChanges}
          snapPoints={SNAP_POINTS}>
          <BottomSheetView style={styles.contentContainer}>
            <WebView
              // source={{ uri: 'https://anssiko.github.io/html-media-capture/' }}
              source={{ html: DEMO_TAKE_PICTURE_HTML }}
              nestedScrollEnabled={true}
              javaScriptEnabled={true}
              javaScriptCanOpenWindowsAutomatically={true}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </Container>
    </>
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
