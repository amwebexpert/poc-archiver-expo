import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useRef } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { DefaultBackdrop } from '~/components/bottom-sheet/default-backdrop';

import { Container } from '~/components/container';
import { FullCentered } from '~/components/full-centered';

const SNAP_POINTS = ['25%', '50%', '75%', '100%'];

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
        <FullCentered>
          <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
          <Button onPress={handleDismissModalPress} title="Dismiss Modal" color="black" />
        </FullCentered>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          enablePanDownToClose={true}
          backdropComponent={DefaultBackdrop}
          enableDynamicSizing={false}
          onChange={handleSheetChanges}
          snapPoints={SNAP_POINTS}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
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
    alignItems: 'center',
  },
});
