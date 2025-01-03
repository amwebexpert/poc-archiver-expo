import React, { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { LanguageSelector } from '~/components/language-selector/language-selector';
import { SafeContainer } from '~/components/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { isProgressStatusReady } from '~/features/ai-commons/transformer.types';
import { aiTranslation } from '~/features/ai-translation/ai-translation.utils';
import { useAppTheme } from '~/theme/theme';

type FormData = {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
};

const DEFAULT_FORM_VALUES: FormData = {
  sourceLanguage: 'eng_Latn',
  targetLanguage: 'fra_Latn',
  sourceText: 'Translate in your app, without server, even in offline mode!',
};

export const TranslatorScreen: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [translation, setTranslation] = useState<string>('Translation will appear here');

  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ mode: 'onChange', defaultValues: DEFAULT_FORM_VALUES });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);

    setTimeout(() => {
      aiTranslation({
        text: data.sourceText,
        sourceLanguage: data.sourceLanguage,
        targetLanguage: data.targetLanguage,
        progressHandler: (progress) => {
          console.info('===> progress', progress);
          setIsLoading(!isProgressStatusReady(progress));
        },
      }).then(setTranslation);
    }, 1000);
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
        <Button mode="outlined" onPress={() => reset()}>
          Reset
        </Button>
        <Button mode="contained" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
          Submit
        </Button>
      </View>

      {isLoading && (
        <ModalSpinner
          isVisible={isLoading}
          title="Loading model"
          description="Please wait while translation models are loading... Only run once: next time will be faster!"
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
