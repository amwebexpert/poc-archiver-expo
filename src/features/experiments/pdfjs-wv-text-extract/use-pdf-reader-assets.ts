import { useAssets } from 'expo-asset';
import { useEffect, useState } from 'react';
import { loadTextContent } from '~/utils/file.utils';

export const usePdfReaderAssets = () => {
  const [assets, error] = useAssets([
    require('@assets/pdf-reader/index.html'),
    require('@assets/pdf-reader/pdf.js_'),
    require('@assets/pdf-reader/pdf.worker.js_'),
    require('@assets/pdf-reader/index.js_'),
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [html, setHtml] = useState('');
  const [injectedJavaScript, setInjectedJavaScript] = useState('');

  useEffect(() => {
    if (error) {
      console.error('[usePdfReaderAssets] error', error);
    }
  }, [error]);

  useEffect(() => {
    const loadFullHtmlDocument = async () => {
      const [assetHtml, ...jsFiles] = assets ?? [];

      const { content: html } = await loadTextContent(assetHtml?.localUri ?? '');

      const jsContent = [];
      for (const jsFile of jsFiles) {
        jsContent.push((await loadTextContent(jsFile.localUri ?? '')).content);
      }

      setHtml(html ?? '');
      setInjectedJavaScript(jsContent.join('\n'));

      setIsLoading(false);
    };

    const hasAssets = !!assets?.length;
    if (hasAssets) {
      loadFullHtmlDocument();
    }
  }, [assets]);

  return {
    isLoading,
    html,
    injectedJavaScript,
  };
};
