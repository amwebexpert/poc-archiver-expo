import * as FileSystem from 'expo-file-system';

export const convertImageToBase64 = async (uri: string) => {
  try {
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64String;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};
