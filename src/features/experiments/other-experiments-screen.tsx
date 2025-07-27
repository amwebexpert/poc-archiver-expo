import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { SafeContainer } from '~/components/layout/safe-container';
import ApiRoutesDemo from '~/features/experiments/api-routes';
import BottomSheetDemo from '~/features/experiments/bottom-sheet';
import { DropDownList } from '~/features/experiments/drop-down-list';
import ToasterDemoScreen from '~/features/experiments/sunner-native';
import { useAppTheme } from '~/theme/theme';
import { PdfTextExtractorDemo } from './pdfjs-wv-text-extract/pdf-text-extractor-demo';
import { WvSignaturePad } from './wv-signature-pad/wv-signature-pad';

const OtherExperimentsScreen: FunctionComponent = () => {
  const styles = useStyles();

  return (
    <SafeContainer style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Other POCs..' }} />

      <>
        <WvSignaturePad />
        <ApiRoutesDemo />
        <BottomSheetDemo />
        <ToasterDemoScreen />
        <DropDownList />
        <PdfTextExtractorDemo />
      </>
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

export default OtherExperimentsScreen;
