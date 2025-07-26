import { FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Fragment, FunctionComponent, useState } from 'react';

import { Button } from 'react-native-paper';
import { PdfTextExtractor } from './pdf-text-extractor';
import { View } from 'react-native';

export const PdfTextExtractorDemo: FunctionComponent = () => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const onSelectPdf = async () => {
    const { canceled, assets } = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (!canceled && assets?.[0]?.uri) {
      setPdfUri(assets?.[0]?.uri);
    }
  };

  return (
    <View>
      <Button
        icon={({ size, color }) => <FontAwesome5 name="file-pdf" size={size} color={color} />}
        mode="contained"
        onPress={onSelectPdf}
      >
        PDF Text Extractor
      </Button>

      {pdfUri && <PdfTextExtractor pdfUri={pdfUri} />}
    </View>
  );
};
