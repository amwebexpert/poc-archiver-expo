import React, { FunctionComponent, useEffect, useRef } from 'react';

import { StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';
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
    if (isDocumentReady) {
      console.log('✅ Document is ready, calling html document script');
      const jsCode = htmlDocumentMessage({ type: 'extractText', data: pdfUri });
      webViewRef.current?.injectJavaScript(jsCode);
    }
  }, [isDocumentReady]);

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
    flex: 0.25,
    width: '100%',
  },
});
