import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import { toast } from 'sonner-native';
import { useAppTheme } from '~/theme/theme';

interface ApiResponse {
  message: string;
  timestamp: string;
}

const ApiRoutesDemo: FunctionComponent = () => {
  const theme = useAppTheme();
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const handleTestApi = async () => {
    setIsLoading(true);
    try {
      const result = await fetch('/api/hello?name=John+Doe');

      if (!result.ok) {
        console.error('🚀 → error', result);
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      toast.success('API call successful', {
        description: JSON.stringify(data, null, 2),
        richColors: true,
      });
    } catch (error) {
      console.error('🚀 → error', error);
      toast.error('API call failed', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        richColors: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Animated.View style={styles.container} entering={FadeInLeft.duration(2000)}>
      <Button
        icon="api"
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={handleTestApi}
        disabled={isLoading}
        loading={isLoading}
      >
        Test /api/hello
      </Button>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
    </Animated.View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      gap: theme.spacing(1),
      paddingVertical: theme.spacing(1),
    },
    loadingContainer: {
      padding: theme.spacing(2),
      alignItems: 'center',
    },
    responseContainer: {
      padding: theme.spacing(2),
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.roundness,
      gap: theme.spacing(0.5),
    },
  });
};

export default ApiRoutesDemo;
