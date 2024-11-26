import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Box } from 'native-base';
import * as Print from 'expo-print';

const DeathRecord = () => {
  const [deathName, setDeathName] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [deathPlace, setDeathPlace] = useState('');
  const [deathParents, setDeathParents] = useState('');
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const printRecord = async (record) => {
    const html = `
      <h1>Acte de Décès</h1>
      <p>Nom du Défunt: ${record.deathName}</p>
      <p>Date de Décès: ${record.deathDate}</p>
      <p>Lieu de Décès: ${record.deathPlace}</p>
      <p>Parents du Défunt: ${record.deathParents}</p>
    `;
    
    await Print.printAsync({ html });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedRecords = records.map(record =>
        record.id === currentRecord.id ? { ...record, deathName, deathDate, deathPlace, deathParents } : record
      );
      setRecords(updatedRecords);
    } else {
      const newRecord = { id: Date.now(), deathName, deathDate, deathPlace, deathParents };
      setRecords([...records, newRecord]);
    }

    // Réinitialiser les champs
    setDeathName('');
    setDeathDate('');
    setDeathPlace('');
    setDeathParents('');
    setIsEditing(false);
  };

  return (
    <ScrollView className="container bg-secondary">
      <Box bg="coolGray.200" p="5" rounded="lg" w="90%" mx="auto" mt="5">
        <Text>Acte de Décès</Text>
        <TextInput placeholder="Nom du Défunt" value={deathName} onChangeText={setDeathName} />
        <TextInput placeholder="Date de Décès" value={deathDate} onChangeText={setDeathDate} />
        <TextInput placeholder="Lieu de Décès" value={deathPlace} onChangeText={setDeathPlace} />
        <TextInput placeholder="Parents du Défunt" value={deathParents} onChangeText={setDeathParents} />
        <Box margin="3" width="50%" borderRadius="10" overflow="hidden">
          <Button title={isEditing ? "Modifier l'Acte" : "Ajouter l'Acte"} onPress={handleSubmit} color="#3CB371" />
        </Box>
      </Box>
      
      {records.map(record => (
        <View key={record.id} style={styles.recordContainer}>
          <Box style={styles.borderBox}>
            <Text>{record.deathName} - {record.deathDate}</Text>
          </Box>
          <View style={styles.buttonRow}>
            <Box style={styles.buttonWrapper}>
              <Button
                title="Modifier"
                color="#3CB371"
                onPress={() => {
                  setDeathName(record.deathName);
                  setDeathDate(record.deathDate);
                  setDeathPlace(record.deathPlace);
                  setDeathParents(record.deathParents);
                  setIsEditing(true);
                  setCurrentRecord(record);
                }}
              />
            </Box>
            <Box style={styles.buttonWrapper}>
              <Button title="Imprimer" onPress={() => printRecord(record)} color="#3CB371" />
            </Box>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    marginVertical: 10,
  },
  borderBox: {
    borderWidth: 1,
    borderColor: 'gray', // Couleur de la bordure
    padding: 10,
    borderRadius: 5, // Arrondi des coins
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // Ajout d'un espacement entre la bordure et les boutons
  },
  buttonWrapper: {
    marginHorizontal: 5, // Espace entre les boutons
    width: '45%', // Largeur des boutons, ajustez selon vos besoins
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default DeathRecord;
