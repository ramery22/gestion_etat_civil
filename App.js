import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BirthRecord from './components/BirthRecord';
import MarriageRecord from './components/MarriageRecord';
import DeathRecord from './components/DeathRecord';
import AdoptionRecord from './components/AdoptionRecord';
import HomeScreen from './components/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="Acceuil" component={HomeScreen} />
        <Stack.Screen name="Acte de Naissance" component={BirthRecord} />
        <Stack.Screen name="Acte de Mariage" component={MarriageRecord} />
        <Stack.Screen name="Acte de Décès" component={DeathRecord} />
        <Stack.Screen name="Acte d'Adoption" component={AdoptionRecord} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
