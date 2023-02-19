/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

import { CardEditor } from './src/components/CardEditor';
import { CardList } from './src/components/CardList';
import { HomeScreen } from './src/components/HomeScreen';

function App(): JSX.Element {
  return (
    <NavigationContainer>
    {/*
      initialRouteName отвечает за то какой
      экран будет основным при запуске приложения
    
    */}
    <Stack.Navigator initialRouteName='Home'>

      <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name="CardList"
      component={CardList}
      />
      <Stack.Screen
      name="CardEditor"
      component={CardEditor}
      />
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
