import { useState } from 'react';
import { WebViewMessageEvent } from 'react-native-webview';
import { logIncomingHtmlDocMessage } from './webview.utils';

export const useOnHtmlDocMessage = () => {
  const [isDocumentReady, setIsDocumentReady] = useState<boolean>(false);

  const onMessage = (payload: WebViewMessageEvent) => {
    const payloadData = payload?.nativeEvent?.data ?? '';

    try {
      const { type, data } = JSON.parse(payloadData);

      if (type === 'documentReady') {
        setIsDocumentReady(true);
      } else if (type === 'console') {
        logIncomingHtmlDocMessage(data);
      } else if (type === 'extractedTexts') {
        console.log('[useOnHtmlDocMessage] extractedTexts', data);
      } else {
        console.warn(`[useOnHtmlDocMessage] onMessage: <${type}> not handled`);
      }
    } catch (e: unknown) {
      console.error('[useOnHtmlDocMessage] unexpected error', e, payloadData);
    }
  };

  return {
    isDocumentReady,
    onMessage,
  };
};
