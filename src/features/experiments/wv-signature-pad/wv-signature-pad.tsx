import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';

export const WvSignaturePad = () => {
  const [signature, setSignature] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<SignatureViewRef | null>(null);

  const handleSignature = (signature: string) => {
    console.log('Signature captured:', signature);
    setSignature(signature);
    setIsLoading(false);
  };

  const handleEmpty = () => {
    console.log('Signature is empty');
    setIsLoading(false);
  };

  const handleClear = () => {
    console.log('Signature cleared');
    setSignature(undefined);
  };

  const handleError = (error: unknown) => {
    console.error('Signature pad error:', error);
    setIsLoading(false);
  };

  const handleEnd = () => {
    setIsLoading(true);
    ref.current?.readSignature();
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {signature && (
          <Image
            resizeMode="contain"
            style={{ height: 100 }}
            source={{ uri: signature }}
          />
        )}
      </View>
      <SignatureCanvas
        ref={ref}
        onOK={handleSignature}
        onEnd={handleEnd}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onError={handleError}
        autoClear={true}
        descriptionText="Sign here"
        clearText="Clear"
        confirmText={isLoading ? 'Processing...' : 'Save'}
        penColor="blue"
        backgroundColor="white"
        webviewProps={{
          // Custom WebView optimization
          cacheEnabled: true,
          androidLayerType: 'hardware',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: '100%',
    borderWidth: 1,
    borderColor: 'blue',
  },
  preview: {
    width: '100%',
    height: 100,
    backgroundColor: '#F8F8F8',
  },
});
