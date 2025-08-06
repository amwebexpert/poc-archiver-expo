import { Stack, useRouter } from 'expo-router';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';

import { SafeContainer } from '~/components/layout/safe-container';
import ApiRoutesDemo from '~/features/experiments/api-routes';
import BottomSheetDemo from '~/features/experiments/bottom-sheet';
import { DropDownList } from '~/features/experiments/drop-down-list';
import ToasterDemoScreen from '~/features/experiments/sunner-native';
import { useAppTheme } from '~/theme/theme';
import { PdfTextExtractorDemo } from './pdfjs-wv-text-extract/pdf-text-extractor-demo';
import { Button } from 'react-native-paper';

const OtherExperimentsScreen: FunctionComponent = () => {
  const styles = useStyles();
  const router = useRouter();

  return (
    <SafeContainer style={styles.container}>
      <Button 
        mode="contained" 
        icon="pencil" 
        onPress={() => router.push('/(drawer)/(experiments)/webview-signature-pad')}
      >
        Webview Signature Pad
      </Button>
      <Button 
        mode="contained" 
        icon="draw-pen" 
        onPress={() => router.push('/(drawer)/(experiments)/native-signature-pad')}
      >
        Native Signature Pad
      </Button>
      <ApiRoutesDemo />
      <BottomSheetDemo />
      <ToasterDemoScreen />
      <DropDownList />
      <PdfTextExtractorDemo />
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      margin: theme.spacing(3),
      gap: theme.spacing(1),
    },
  });
};

export default OtherExperimentsScreen;
