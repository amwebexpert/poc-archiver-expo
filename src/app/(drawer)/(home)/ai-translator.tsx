import React, { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { LanguageSelector } from '~/components/language-selector/language-selector';
import { SafeContainer } from '~/components/safe-container';
import { useAppTheme } from '~/theme/theme';

type FormData = {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
};

const DEFAULT_FORM_VALUES: FormData = {
  sourceLanguage: 'eng_Latn',
  targetLanguage: 'fra_Latn',
  sourceText: 'Translate directly in your app, without server!',
};

export const TranslatorScreen: FunctionComponent = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ mode: 'onChange', defaultValues: DEFAULT_FORM_VALUES });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <SafeContainer style={styles.root}>
      <Controller
        control={control}
        name="sourceLanguage"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <LanguageSelector
            label="Source:"
            value={value}
            onChange={onChange}
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
          <LanguageSelector
            label="Target:"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <TextInput
        label="Translation"
        mode="outlined"
        multiline={true}
        value="Translation will appear here"
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
