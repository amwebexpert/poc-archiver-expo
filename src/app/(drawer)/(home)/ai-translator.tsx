import React, { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { LanguageSelector } from '~/components/language-selector/language-selector';
import { SafeContainer } from '~/components/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { extractProgressLog, isProgressStatusReady } from '~/features/ai-commons/transformer.types';
import { TextTranslator } from '~/features/ai-translation/text-translation';
import { useAppTheme } from '~/theme/theme';
import { getErrorMessage } from '~/utils/errors.utils';

type FormData = {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
};

const DEFAULT_FORM_VALUES: FormData = {
  sourceLanguage: 'en',
  targetLanguage: 'fr',
  sourceText: 'Translate in your app, without server, even in offline mode',
};

const TranslatorScreen: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [translation, setTranslation] = useState('');
  const [modelLoadingLogs, setModelLoadingLogs] = useState<string[]>([]);

  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormData>({ mode: 'onChange', defaultValues: DEFAULT_FORM_VALUES });

  const onSubmit = async (data: FormData) => {
    setTranslation('');

    const { sourceText: text, sourceLanguage, targetLanguage } = data;

    try {
      const analyser = await TextTranslator.getInstance({
        sourceLanguage,
        targetLanguage,
        progressHandler: (progress) => {
          setModelLoadingLogs((logs) => [extractProgressLog(progress), ...logs]);
          setIsLoading(!isProgressStatusReady(progress));
        },
      });

      const result = await analyser.translate({ text, sourceLanguage, targetLanguage });
      setTranslation(result);
    } catch (error: unknown) {
      setTranslation(`Error while translating text: ${getErrorMessage(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeContainer style={styles.root}>
      <Controller
        control={control}
        name="sourceLanguage"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <LanguageSelector label="Source:" value={value} onChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="sourceText"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Text to translate"
            mode="outlined"
            multiline={true}
            value={value}
            onChangeText={onChange}
            style={{ flex: 1 }}
          />
        )}
      />

      <Controller
        control={control}
        name="targetLanguage"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <LanguageSelector label="Target:" value={value} onChange={onChange} />
        )}
      />

      <TextInput
        label="Translation"
        mode="outlined"
        multiline={true}
        value={translation}
        readOnly={true}
        style={{ flex: 1 }}
      />

      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={() => reset()} disabled={isLoading}>
          Reset
        </Button>
        <Button mode="contained" onPress={handleSubmit(onSubmit)} disabled={!isValid || isLoading}>
          Submit
        </Button>
      </View>

      {isLoading && (
        <ModalSpinner
          isVisible={isLoading}
          title="Loading model"
          description="Please wait while translation models are loading... Only run once: next time will be faster!"
          modelLoadingLogs={modelLoadingLogs}
          onDismiss={() => setIsLoading(false)}
        />
      )}
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      margin: theme.spacing(2),
      gap: theme.spacing(2),
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: theme.spacing(2),
    },
  });
};

export default TranslatorScreen;
