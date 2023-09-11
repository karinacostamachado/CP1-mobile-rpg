import React, { useEffect, useState } from 'react';
import characterImage from './../../img/boneco.jpg';
import { View, Text, Image, StyleSheet, ProgressBarAndroid } from 'react-native';
import axios from 'axios';
import API_BASE_URL from './../apiConfig';
import CustomButton from './../CustomButton/index'; 

const Home = ({ navigation }) => {
  const [characterData, setCharacterData] = useState({
    name: 'Karina Costa',
    level: 1,
    exp: 0,
    needed: 100,
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/character`)
      .then((response) => {
        setCharacterData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const calculateProgress = () => {
    return characterData.exp / characterData.needed;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Personagem: {characterData.name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nível: {characterData.level}</Text>
        <Text style={styles.infoText}>
          Experiência: {characterData.exp} / {characterData.needed}
        </Text>
      </View>

      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={calculateProgress()}
        style={styles.progressBar}
        color="#00FF00"
      />

      <Image source={characterImage} style={styles.characterImage} />

      <View style={styles.bottomButtons}>
        <CustomButton
          title="Minhas Tarefas"
          backgroundColor="green"
          onPress={() => navigation.navigate('AllTasks')}
        />
        <CustomButton
          title="Adicionar Tarefa"
          backgroundColor="green"
          onPress={() => navigation.navigate('AddTask')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  containerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 16,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 18,
    color: 'green',
  },
  characterImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 16,
  },
  progressBar: {
    width: '80%',
    height: 40,
    marginTop: 16,
  },
  bottomButtons: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  }
});

export default Home;
