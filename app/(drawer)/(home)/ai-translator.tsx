import { useToggle } from '@uidotdev/usehooks';
import React, { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Share, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DropDownSelector } from '~/components/drop-down-selector/drop-down-selector';
import { SafeContainer } from '~/components/layout/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { useModelLoading } from '~/features/ai-commons/use-model-loading';
import { LANGUAGE_OPTIONS } from '~/features/ai-translation/languages.types';
import { translate } from '~/features/ai-translation/text-translation';
import { useAppTheme } from '~/theme/theme';
import { getErrorMessage } from '~/utils/errors.utils';

const EN_TXT_EXAMPLES = [
  'Translate from your app, without server, even in offline mode',
  'This is a great example of offline usage',
];

type FormData = {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
};

const DEFAULT_FORM_VALUES: FormData = {
  sourceLanguage: 'en',
  targetLanguage: 'fr',
  sourceText: EN_TXT_EXAMPLES[0],
};

const TranslatorScreen: FunctionComponent = () => {
  const [translation, setTranslation] = useState('');
  const { isLoading, setIsLoading, modelLoadingLogs, progressHandler } = useModelLoading();
  const [isWorking, toggleWorking] = useToggle(false);

  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({ mode: 'onChange', defaultValues: DEFAULT_FORM_VALUES });

  const onSubmit = async (data: FormData) => {
    toggleWorking();
    setTranslation(' ');

    const { sourceText: text, sourceLanguage, targetLanguage } = data;

    try {
      const result = await translate({ text, sourceLanguage, targetLanguage, progressHandler });
      setTranslation(result);
    } catch (error: unknown) {
      setTranslation(`Error while translating text: ${getErrorMessage(error)}`);
    } finally {
      setIsLoading(false);
      toggleWorking();
    }
  };

  return (
    <SafeContainer style={styles.root}>
      <Controller
        control={control}
        name="sourceLanguage"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <DropDownSelector
            label="Source:"
            value={value}
            onChange={onChange}
            options={LANGUAGE_OPTIONS}
          />
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
          <DropDownSelector
            label="Target:"
            value={value}
            onChange={onChange}
            options={LANGUAGE_OPTIONS}
          />
        )}
      />

      <TextInput
        label={!!translation ? 'Translation (press to share)' : ''}
        mode="outlined"
        multiline={true}
        value={translation}
        readOnly={true}
        style={{ flex: 1 }}
        onPress={() => Share.share({ message: translation })}
      />

      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          onPress={() => setTranslation('')}
          disabled={isLoading || isWorking}
        >
          Reset
        </Button>

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading || isWorking}
          loading={isWorking && !isLoading}
        >
          Submit
        </Button>
      </View>

      {isLoading && (
        <ModalSpinner
          isVisible={isLoading}
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
