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
import { CardAnswering } from './src/components/CardAnswering';
// import { initFS, createFile, /*STORAGE,*/ removeFile } from './src/filesystem/filesystem'; // refactor

import { writeFile, readFile, DocumentDirectoryPath, mkdir, readDir } from 'react-native-fs'

// TODO Организовать глабальное хранилище состояния для карточек
export const editorState = {cardNew: "", viewedPart: 'front', header: '', front: '', back: ''}

import { getDBConnection, createCardsTable, insertNewCard, selectAllCards } from './src/db';

const initFs = async () => {
  try {
    mkdir(DocumentDirectoryPath + "/cards")
    const db = await getDBConnection()
    await createCardsTable(db)
    
    console.log("APP FILESYSTEM CREATED")
  } catch(err) {
    console.log("ERROR WHIE INITIALIZING APP FS")
  }
}




function App(): JSX.Element {
  console.log("APP STARTED")
  initFs()


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
        name="CardAnswering"
        component={CardAnswering}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CardEditor"
        component={CardEditor}
        options={{
          headerTitle: () => <Text></Text>,

          headerRight: () => {
          return <Pressable

          onPress={async () => {
            const createCard = async () => {
              const randomDigitByLength = (diginLength: Number) => {
                let emptyString = ""
                
                for (let i = 0; i < diginLength; i++) {
                  emptyString += Math.floor(Math.random() * 9)
                }

                return emptyString
              } // randomDigitByLength
              const id = randomDigitByLength(16)
              const db = await getDBConnection()
              let dateOfAnswer = new Date()
              let dateOfNextAnswer = new Date()

              dateOfNextAnswer.setDate(dateOfNextAnswer.getDate() + 10)

              insertNewCard(db, id, "none", dateOfAnswer.toString(), dateOfNextAnswer.toString(), 1, `${editorState.header}`)
              await writeFile(DocumentDirectoryPath + `/cards/${id}.html`, CardEditorHTML(editorState.header, editorState.front, editorState.back), "utf8")
            }; createCard()
          }} // onPress
          >
            <Text
              style={{
                fontSize: 20,
                color: "black"
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

