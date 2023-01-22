import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
}

const IconButton = ({ iconName, size = 24, color = "#fff", onPress }: IconButtonProps) => {
  return (
    <Pressable style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
        <Ionicons 
        name={iconName}
        color={color} 
        size={size}
        onPress={onPress}
        />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75,

  }
});
