import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, router, Stack } from 'expo-router';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth';

const CUISINES = [
  'Italian',
  'Japanese',
  'Mexican',
  'Indian',
  'Chinese',
  'Thai',
  'American',
  'Mediterranean',
];

export default function PreferencesScreen() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const { user } = useAuthStore();

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleContinue = async () => {
    // Here you would typically save the preferences to your backend
    // For now, we'll just navigate to the main app
    router.replace('/(tabs)');
  };

  return (
    <>
      <Stack.Screen 
        options={{
          gestureEnabled: false,
          gestureDirection: "horizontal",
          fullScreenGestureEnabled: false,
          animation: 'none'
        }} 
      />
      <View style={styles.container}>
        <Text style={styles.title}>What's your taste?</Text>
        <Text style={styles.subtitle}>
          Select your favorite cuisines to get personalized recommendations
        </Text>

        <ScrollView style={styles.cuisineList}>
          {CUISINES.map((cuisine) => (
            <TouchableOpacity
              key={cuisine}
              style={[
                styles.cuisineButton,
                selectedCuisines.includes(cuisine) && styles.selectedCuisine,
              ]}
              onPress={() => toggleCuisine(cuisine)}
            >
              <Text
                style={[
                  styles.cuisineText,
                  selectedCuisines.includes(cuisine) && styles.selectedCuisineText,
                ]}
              >
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedCuisines.length === 0 && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={selectedCuisines.length === 0}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  cuisineList: {
    flex: 1,
  },
  cuisineButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  selectedCuisine: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  cuisineText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCuisineText: {
    color: '#fff',
  },
  footer: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 