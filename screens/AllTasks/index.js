import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import API_BASE_URL from './../apiConfig';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [characterData, setCharacterData] = useState({
    name: 'Karina Costa',
    level: 1,
    exp: 0,
    needed: 100,
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/mission/getAll`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar tarefas:', error);
      });
  }, []);

  const handleDeleteTask = (id) => {
    axios.post(`${API_BASE_URL}/mission/${id}/delete`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao excluir tarefa:', error);
      });
  };

  const handleCompleteTask = (id, exp) => {
    axios.post(`${API_BASE_URL}/mission/${id}/done`)
      .then(() => {
        setCharacterData((prevData) => ({
          ...prevData,
          exp: prevData.exp + exp,
        }));

        setTasks((prevTasks) => {
          return prevTasks.map((task) => {
            if (task.id === id) {
              return { ...task, completed: true };
            }
            return task;
          });
        });
      })
      .catch((error) => {
        console.error('Erro ao marcar tarefa como concluída:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Tarefas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskName}>Nome: {item.name}</Text>
            <Text style={styles.taskInfo}>Recorrência: {item.period}</Text>
            <Text style={styles.taskInfo}>Experiência: {item.exp}</Text>
            {item.completed ? (
              <Text style={styles.taskStatus}>Tarefa Concluída</Text>
            ) : (
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                  <Text style={styles.actionText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCompleteTask(item.id, item.exp)}>
                  <Text style={styles.actionText}>✔️</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
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
  taskContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderColor: 'green',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 4,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  taskInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 16,
    color: 'red',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionText: {
    fontSize: 24,
    marginLeft: 8,
    color: 'red',
  },
});

export default AllTasks;
