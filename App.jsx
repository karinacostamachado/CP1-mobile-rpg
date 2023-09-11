import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import MainNavigator from './screens/MainNavigator';

function App() {
  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
  );
}

export default App;

