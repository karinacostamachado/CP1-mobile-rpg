import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import API_BASE_URL from './../apiConfig';

const AddTask = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [taskExperience, setTaskExperience] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const handleAddTask = () => {
    const expValue = Number(taskExperience) || 0;

    const taskData = {
      period: selectedPeriod,
      name: taskName,
      exp: expValue,
    };

    axios
      .post(`${API_BASE_URL}/mission/create`, taskData)
      .then((response) => {
        console.log('Tarefa adicionada com sucesso:', response.data);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Erro ao adicionar tarefa:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Tarefa"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Experiência"
        value={taskExperience}
        onChangeText={(text) => setTaskExperience(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Recorrência:</Text>
      <RadioButton.Group
        onValueChange={(value) => setSelectedPeriod(value)}
        value={selectedPeriod}
      >
        <View style={styles.radioItem}>
          <Text>Diária</Text>
          <RadioButton value="daily" color="green" />
        </View>
        <View style={styles.radioItem}>
          <Text>Semanal</Text>
          <RadioButton value="weekly" color="green" />
        </View>
      </RadioButton.Group>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: 'green' }}
        onPress={handleAddTask}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'green',
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 4,
    color: 'green',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'green',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    color: 'green',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddTask;
