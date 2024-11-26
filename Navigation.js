import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import BirthList from './BirthList';
import MarriageList from './MarriageList';
import DeathList from './DeathList';
import AdoptionList from './AdoptionList';
import BirthRecord from './BirthRecord';
import MarriageRecord from './MarriageRecord';
import DeathRecord from './DeathRecord';
import AdoptionRecord from './AdoptionRecord';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Stack.Screen name="Naissance" component={BirthRecord} options={{ title: 'Actes de Naissance' }} />
        <Stack.Screen name="Mariage" component={MarriageRecord} options={{ title: 'Actes de Mariage' }} />
        <Stack.Screen name="Décès" component={DeathRecord} options={{ title: 'Actes de Décès' }} />
        <Stack.Screen name="Adoption" component={AdoptionRecord} options={{ title: 'Actes d\'Adoption' }} />
        
        {/* Ajout des listes */}
        <Stack.Screen name="Liste Naissance" component={BirthList} options={{ title: 'Liste des Actes de Naissance' }} />
        <Stack.Screen name="Liste Mariage" component={MarriageList} options={{ title: 'Liste des Actes de Mariage' }} />
        <Stack.Screen name="Liste Décès" component={DeathList} options={{ title: 'Liste des Actes de Décès' }} />
        <Stack.Screen name="Liste Adoption" component={AdoptionList} options={{ title: 'Liste des Actes d\'Adoption' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
