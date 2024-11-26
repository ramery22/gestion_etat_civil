import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Box } from 'native-base';
import * as Print from 'expo-print';

const BirthRecord = () => {
  const [childName, setChildName] = useState('');
  const [childForname, setChildForname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nameParents, setNameParents] = useState('');
  const [place, setPlace] = useState('');
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const printRecord = async (record) => {
    const html = `
      <h1>Acte de Naissance</h1>
      <p>Nom: ${record.childName}</p>
      <p>Prénom: ${record.childForname}</p>
      <p>Date de Naissance: ${record.birthDate}</p>
      <p>Parents: ${record.nameParents}</p>
      <p>Lieu: ${record.place}</p>
    `;
    
    await Print.printAsync({ html });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedRecords = records.map(record =>
        record.id === currentRecord.id ? { ...record, childName, childForname, birthDate, nameParents, place } : record
      );
      setRecords(updatedRecords);
    } else {
      const newRecord = { id: Date.now(), childName, childForname, birthDate, nameParents, place };
      setRecords([...records, newRecord]);
    }

    // Réinitialiser les champs
    setChildName('');
    setChildForname('');
    setBirthDate('');
    setNameParents('');
    setPlace('');
    setIsEditing(false);
  };

  return (
    <ScrollView className="container bg-secondary">
      <Box bg="coolGray.200" p="5" rounded="lg" w="90%" mx="auto" mt="5">
        <Text>Acte de Naissance</Text>
        <TextInput placeholder="Nom de l'Enfant" value={childName} onChangeText={setChildName} />
        <TextInput placeholder="Prénom de l'Enfant" value={childForname} onChangeText={setChildForname} />
        <TextInput placeholder="Date de Naissance " value={birthDate} onChangeText={setBirthDate} />
        <TextInput placeholder="Nom des Parents" value={nameParents} onChangeText={setNameParents} />
        <TextInput placeholder="Lieu de Naissance" value={place} onChangeText={setPlace} />
        <Box margin="5" width="50%" borderRadius="10" overflow="hidden">
          <Button title={isEditing ? "Modifier l'Acte" : "Ajouter l'Acte"} onPress={handleSubmit} color="#3CB371" />
        </Box>
      </Box>
      
      {records.map(record => (
        <View key={record.id} style={styles.recordContainer}>
          <Box style={styles.borderBox}>
            <Text>{record.childName} {record.childForname} - {record.birthDate}</Text>
          </Box>
          <View style={styles.buttonRow}>
            <Box style={styles.buttonWrapper}>
              <Button
                title="Modifier"
                color="#3CB371"
                onPress={() => {
                  setChildName(record.childName);
                  setChildForname(record.childForname);
                  setBirthDate(record.birthDate);
                  setNameParents(record.nameParents);
                  setPlace(record.place);
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

export default BirthRecord;
