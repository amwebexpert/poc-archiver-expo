import React, { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { LanguageSelector } from '~/components/language-selector/language-selector';
import { SafeContainer } from '~/components/safe-container';
import { useAppTheme } from '~/theme/theme';

type FormData = {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  targetText: string;
};

const DEFAULT_FORM_VALUES: FormData = {
  sourceLanguage: 'eng_Latn',
  targetLanguage: 'fra_Latn',
  sourceText: 'Translate directly in your app, without server!',
  targetText: '',
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
            label="Source Language:"
            value={value}
            onChange={onChange}
            error={!!errors.sourceLanguage}
          />
        )}
      />

      <Controller
        control={control}
        name="sourceText"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Source Text"
            multiline={true}
            numberOfLines={4}
            value={value}
            onChangeText={onChange}
            error={!!errors.sourceText}
          />
        )}
      />

      <Controller
        control={control}
        name="targetLanguage"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <LanguageSelector
            label="Target Language:"
            value={value}
            onChange={onChange}
            error={!!errors.targetLanguage}
          />
        )}
      />

      <View style={styles.buttonRow}>
        <Button mode="contained" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
          Submit
        </Button>
        <Button mode="outlined" onPress={() => reset()}>
          Reset
        </Button>
      </View>

      <TextInput label="Translation" value={''} editable={false} />
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      margin: theme.spacing(2),
      gap: theme.spacing(4),
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: theme.spacing(2),
    },
  });
};

export default TranslatorScreen;
