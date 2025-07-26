import React, { FunctionComponent, useEffect, useRef } from 'react';

import { StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';
import { loadBase64Content } from '~/utils/file.utils';
import { useOnHtmlDocMessage } from './use-on-html-message';
import { usePdfReaderAssets } from './use-pdf-reader-assets';
import { htmlDocumentMessage } from './webview.utils';

interface PdfTextExtractorProps {
  pdfUri: string;
}

export const PdfTextExtractor: FunctionComponent<PdfTextExtractorProps> = ({ pdfUri }) => {
  const webViewRef = useRef<WebView>(null);

  const { isLoading, html, injectedJavaScript } = usePdfReaderAssets();
  const { isDocumentReady, onMessage } = useOnHtmlDocMessage();

  useEffect(() => {
    if (!isDocumentReady) return;

    loadBase64Content(pdfUri).then(({ content }) => {
      if (!content) return;
      const jsCode = htmlDocumentMessage({ type: 'extractText', data: content });
      webViewRef.current?.injectJavaScript(jsCode);
    });
  }, [isDocumentReady, pdfUri]);

  const handleLoadEnd = () => {
    webViewRef.current?.injectJavaScript(`${injectedJavaScript}\ntrue;`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <WebView
      ref={webViewRef}
      source={{ html }}
      originWhitelist={['*']}
      onMessage={onMessage}
      onError={(e) => console.error(`Error loading page: ${e.nativeEvent.description}`, e)}
      onLoad={() => console.log('📱 WebView loaded')}
      onLoadEnd={handleLoadEnd}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      style={styles.webView}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    maxHeight: 1,
    maxWidth: 1,
  },
});
