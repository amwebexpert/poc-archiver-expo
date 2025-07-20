import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, View } from 'react-native';
import { Button, Paragraph, Text } from 'react-native-paper';

import { SafeContainer } from '~/components/layout/safe-container';
import { APP_VERSION_INFO } from '~/constants';
import { useAppTheme } from '~/theme/theme';
import { PdfTextExtractor } from '~/components/pdfreader/pdf-text-extractor';

const { REPOSITORY } = APP_VERSION_INFO;

const HomeScreen = () => {
  const styles = useStyles();

  const onPdfReaddingPress = async () => {
    const { canceled, assets } = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    // const extractedText = await extractFromLocalFile(assets?.[0]?.uri ?? '');
    // console.info('🚀 → info', extractedText);
  };

  return (
    <SafeContainer>
      <View style={styles.root}>
        <PdfTextExtractor />

        <View>
          <Paragraph style={styles.centeredText}>
            Like it? Do not forget to star the repo!
          </Paragraph>

          <View style={styles.actions}>
            <Button mode="outlined" onPress={onPdfReaddingPress} icon="book-information-variant">
              PDF test
            </Button>
            <Button
              mode="outlined"
              onPress={() => WebBrowser.openBrowserAsync(REPOSITORY)}
              icon="star"
            >
              Star it!
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push('/(drawer)/(about)/about')}
              icon="book-information-variant"
            >
              Licences…
            </Button>
          </View>
        </View>
      </View>
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      marginHorizontal: theme.spacing(4),
      gap: theme.spacing(6),
    },
    paragraph: {
      width: '100%',
    },
    centeredText: {
      textAlign: 'center',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: theme.spacing(1),
    },
    category: {
      justifyContent: 'center',
      marginVertical: theme.spacing(1),
    },
  });
};

export default HomeScreen;
