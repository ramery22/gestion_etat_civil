import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Box } from 'native-base';
import * as Print from 'expo-print';

const AdoptionRecord = () => {
  const [biologicalParentName, setBiologicalParentName] = useState('');
  const [adoptedChildName, setAdoptedChildName] = useState('');
  const [adoptiveParentName, setAdoptiveParentName] = useState('');
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const printRecord = async (record) => {
    const html = `
      <h1>Acte d'Adoption</h1>
      <p>Nom du Parent Biologique: ${record.biologicalParentName}</p>
      <p>Nom de l'Enfant Adopté: ${record.adoptedChildName}</p>
      <p>Nom du Parent Adoptif: ${record.adoptiveParentName}</p>
    `;
    
    await Print.printAsync({ html });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedRecords = records.map(record =>
        record.id === currentRecord.id ? { ...record, biologicalParentName, adoptedChildName, adoptiveParentName } : record
      );
      setRecords(updatedRecords);
    } else {
      const newRecord = { id: Date.now(), biologicalParentName, adoptedChildName, adoptiveParentName };
      setRecords([...records, newRecord]);
    }

    // Réinitialiser les champs
    setBiologicalParentName('');
    setAdoptedChildName('');
    setAdoptiveParentName('');
    setIsEditing(false);
  };

  return (
    <ScrollView className="container bg-secondary">
      <Box bg="coolGray.200" p="5" rounded="lg" w="90%" mx="auto" mt="5">
        <Text>Acte d'Adoption</Text>
        <TextInput placeholder="Nom du Parent Biologique" value={biologicalParentName} onChangeText={setBiologicalParentName} />
        <TextInput placeholder="Nom de l'Enfant Adopté" value={adoptedChildName} onChangeText={setAdoptedChildName} />
        <TextInput placeholder="Nom du Parent Adoptif" value={adoptiveParentName} onChangeText={setAdoptiveParentName} />
        <Box margin="3" width="50%" borderRadius="10" overflow="hidden">
          <Button title={isEditing ? "Modifier l'Acte" : "Ajouter l'Acte"} onPress={handleSubmit} color="#3CB371" />
        </Box>
      </Box>
      
      {records.map(record => (
        <View key={record.id} style={styles.recordContainer}>
          <Box style={styles.borderBox}>
            <Text>{record.adoptedChildName} - {record.biologicalParentName}</Text>
          </Box>
          <View style={styles.buttonRow}>
            <Box style={styles.buttonWrapper}>
              <Button
                title="Modifier"
                color="#3CB371"
                onPress={() => {
                  setBiologicalParentName(record.biologicalParentName);
                  setAdoptedChildName(record.adoptedChildName);
                  setAdoptiveParentName(record.adoptiveParentName);
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

export default AdoptionRecord;
