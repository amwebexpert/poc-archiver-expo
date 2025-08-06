import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';

import { SafeContainer } from '~/components/layout/safe-container';
import { useAppTheme } from '~/theme/theme';
import { WvSignaturePad } from './wv-signature-pad';

const WvSignatureScreen: FunctionComponent = () => {
  const styles = useStyles();

  return (
    <SafeContainer style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'WebView Signature Pad' }} />

      <WvSignaturePad />
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      margin: theme.spacing(3),
    },
  });
};

export default WvSignatureScreen;
