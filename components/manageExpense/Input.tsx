import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants';

interface InfoConfigProps {
  KeyboardType?: string;
  multiline?: boolean;
  placeholder?: string;
  maxLength?: number;
  numberOfLines?: number;
  autoCorrect?: boolean;
  onChangeText?: (data: string) => void;
  value?: any;
}
interface InputProps {
  inValid?: boolean;
  label: string;
  style?: object;
  textInfoConfig: InfoConfigProps;
}
export const Input = ({ label, textInfoConfig, style, inValid }: InputProps) => {
  const inputStyles: any = [styles.textInput];
  if (textInfoConfig && textInfoConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (inValid) {
    inputStyles.push(styles.inValidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, inValid && styles.inValidLabel]}>{label}</Text>
      <TextInput {...textInfoConfig} style={inputStyles} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    fontWeight: "700",
    color: GlobalStyles.colors.primary700
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top"
  },
  inValidLabel: {
    color: GlobalStyles.colors.error500
  },
  inValidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
})