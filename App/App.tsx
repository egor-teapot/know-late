/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import React from 'react';
import {
  Pressable, Text
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

import { CardEditor } from './src/components/CardEditor';
import { CardList } from './src/components/CardList';
import { HomeScreen } from './src/components/HomeScreen';
import { CardAnswering } from './src/components/CardAnswering';
import {
  getDBConnection,
  createCardsTable,
} from './src/db';

import { DocumentDirectoryPath, mkdir, } from 'react-native-fs'

import { checkAwaitingCards, createNewCard, editCard } from './src/utils';

export const editorState = {case: "create",  viewedPart: 'front', hash: "", header: '', front: '', back: ''}
export let cardsAwaitingState = []

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

const checkCards = async () => {
  try {
    const db = await getDBConnection()
    const data = await checkAwaitingCards(db)
    
    cardsAwaitingState = [...data]
    console.log(cardsAwaitingState)
  } catch(err) {
    console.log("нед доступных карт для повторения")
  }

}

function App(): JSX.Element {
  console.log("APP STARTED")
  initFs()
  checkCards()

  return (
    <NavigationContainer>
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
            const db = await getDBConnection()
            if (editorState.case == "create") await createNewCard(db);
            if (editorState.case == "edit") await editCard(db)

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

