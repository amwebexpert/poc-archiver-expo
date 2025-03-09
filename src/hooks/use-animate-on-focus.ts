import { useFocusEffect, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export const useAnimateOnFocus = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useFocusEffect(useCallback(() => setIsVisible(true), []));

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => setIsVisible(false));
    return unsubscribe;
  }, [navigation]);

  return isVisible;
};
