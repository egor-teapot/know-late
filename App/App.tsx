/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import React from 'react';
import {
  Pressable, Text, Button
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

import { CardEditor } from './src/components/CardEditor';
import { CardList } from './src/components/CardList';
import { HomeScreen } from './src/components/HomeScreen';
import { initFS } from './src/filesystem/filesystem';


function App(): JSX.Element {

    initFS()

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
        options={{
          headerTitle: () => <Text
            style={{fontSize: 20, color: "black"}}
          >Список карт</Text>
        }}

      />
      <Stack.Screen
        name="CardEditor"
        component={CardEditor}
        options={{
          headerTitle: () => <Text></Text>,

          headerRight: () => {
          return <Pressable
          onPress={() => {
            
          }}
          >
            <Text
              style={{
                fontSize: 20
              }}
            >Сохранить</Text>
          </Pressable>
        }

        }}
      />
      
    </Stack.Navigator>
  </NavigationContainer>
  );

}

export default App;

