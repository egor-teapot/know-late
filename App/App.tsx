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
import { CardEditorHTML } from './src/components/CardEditorHTML';
import { CardList } from './src/components/CardList';
import { HomeScreen } from './src/components/HomeScreen';
import { initFS, createFile, STORAGE, readFile, removeFile } from './src/filesystem/filesystem';

// TODO Организовать глабальное хранилище состояния для карточек
export const editorState = {useCase: '', viewedPart: 'front', header: '', front: '', back: ''}


function App(): JSX.Element {

    initFS()
    removeFile('cards/card-1')
    createFile(STORAGE+"/cards", "/card-1", CardEditorHTML('test', 'какого цвета яблоки?', 'красного'))
    createFile(STORAGE+"/cards", "card-2", CardEditorHTML())

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
            console.log(editorState)
            // let data = CardEditorHTML(editorState.header, editorState.front, editorState.back)
            // createFile(STORAGE+"/cards/", "some", data)
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

