import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Ajout de l'image */}
      <Image 
        source={require('../assets/logo.png')} // Chemin de l'image
        style={styles.logo} 
      />

      <Text style={styles.title}>Bienvenue dans l'application Gestion Etat Civil ANKADINONDRY SAKAY</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Gestion Naissance"
            onPress={() => navigation.navigate('Acte de Naissance')}
            color="#3CB371" 
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Gestion Mariage"
            onPress={() => navigation.navigate('Acte de Mariage')}
            color="#3CB371" 
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Gestion Décès"
            onPress={() => navigation.navigate('Acte de Décès')}
            color="#3CB371" 
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Gestion Adoption"
            onPress={() => navigation.navigate('Acte d\'Adoption')}
            color="#3CB371" 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300, // Ajustez la largeur selon vos besoins
    height: 300, // Ajustez la hauteur selon vos besoins
    marginBottom: 5, // Espace entre le logo et le titre
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  buttonWrapper: {
    margin: 10,
    width: '40%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default HomeScreen;
