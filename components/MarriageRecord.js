import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Box } from 'native-base';
import * as Print from 'expo-print';

const MarriageRecord = () => {
  const [nameMan, setNameMan] = useState('');
  const [fornameMan, setFornameMan] = useState('');
  const [numOfCinM, setNumOfCinM] = useState('');
  const [nameBride, setNameBride] = useState('');
  const [fornameBride, setFornameBride] = useState('');
  const [numOfCinB, setNumOfCinB] = useState('');
  const [dateOfMariage, setDateOfMariage] = useState('');
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const printRecord = async (record) => {
    const html = `
      <h1>Acte de Mariage</h1>
      <p>Nom du Mari: ${record.nameMan}</p>
      <p>Prénom du Mari: ${record.fornameMan}</p>
      <p>Numéro CIN du Mari: ${record.numOfCinM}</p>
      <p>Nom de la Mariée: ${record.nameBride}</p>
      <p>Prénom de la Mariée: ${record.fornameBride}</p>
      <p>Numéro CIN de la Mariée: ${record.numOfCinB}</p>
      <p>Date de Mariage: ${record.dateOfMariage}</p>
    `;

    await Print.printAsync({ html });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedRecords = records.map(record =>
        record.id === currentRecord.id ? { ...record, nameMan, fornameMan, numOfCinM, nameBride, fornameBride, numOfCinB, dateOfMariage } : record
      );
      setRecords(updatedRecords);
    } else {
      const newRecord = { id: Date.now(), nameMan, fornameMan, numOfCinM, nameBride, fornameBride, numOfCinB, dateOfMariage };
      setRecords([...records, newRecord]);
    }

    // Réinitialiser les champs
    setNameMan('');
    setFornameMan('');
    setNumOfCinM('');
    setNameBride('');
    setFornameBride('');
    setNumOfCinB('');
    setDateOfMariage('');
    setIsEditing(false);
  };

  return (
    <ScrollView className="container bg-secondary">
      <Box bg="coolGray.200" p="5" rounded="lg" w="90%" mx="auto" mt="5">
        <Text>Acte de Mariage</Text>
        <TextInput placeholder="Nom du Mari" value={nameMan} onChangeText={setNameMan} />
        <TextInput placeholder="Prénom du Mari" value={fornameMan} onChangeText={setFornameMan} />
        <TextInput placeholder="Numéro CIN du Mari" value={numOfCinM} onChangeText={setNumOfCinM} />
        <TextInput placeholder="Nom de la Mariée" value={nameBride} onChangeText={setNameBride} />
        <TextInput placeholder="Prénom de la Mariée" value={fornameBride} onChangeText={setFornameBride} />
        <TextInput placeholder="Numéro CIN de la Mariée" value={numOfCinB} onChangeText={setNumOfCinB} />
        <TextInput placeholder="Date de Mariage" value={dateOfMariage} onChangeText={setDateOfMariage} />
        <Box margin="3" width="50%" borderRadius="10" overflow="hidden">
          <Button title={isEditing ? "Modifier l'Acte" : "Ajouter l'Acte"} onPress={handleSubmit} color="#3CB371" />
        </Box>
      </Box>
      
      {records.map(record => (
        <View key={record.id} style={styles.recordContainer}>
          <Box style={styles.borderBox}>
            <Text>{record.nameMan} {record.fornameMan} - {record.dateOfMariage}</Text>
          </Box>
          <View style={styles.buttonRow}>
            <Box style={styles.buttonWrapper}>
              <Button title="Modifier" color="#3CB371" onPress={() => {
                setNameMan(record.nameMan);
                setFornameMan(record.fornameMan);
                setNumOfCinM(record.numOfCinM);
                setNameBride(record.nameBride);
                setFornameBride(record.fornameBride);
                setNumOfCinB(record.numOfCinB);
                setDateOfMariage(record.dateOfMariage);
                setIsEditing(true);
                setCurrentRecord(record);
              }} />
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
    marginHorizontal: 5,
    width: '45%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default MarriageRecord;
