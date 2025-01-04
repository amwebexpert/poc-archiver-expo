import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { Fragment, FunctionComponent, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import WebView from 'react-native-webview';
import { DefaultBackdrop } from '~/components/bottom-sheet/default-backdrop';

const SNAP_POINTS = ['75%', '90%'];

const BottomSheetDemo: FunctionComponent = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();

  const handleSheetChanges = (index: number) => console.info('handleSheetChanges', index);

  return (
    <Fragment>
      <Button mode="contained" onPress={handlePresentModalPress}>
        @gorhom/bottom-sheet
      </Button>

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
    </Fragment>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
  },
});

export default BottomSheetDemo;
