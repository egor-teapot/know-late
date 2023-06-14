
// import { readFolderElements, /*STORAGE,*/ readFile } from '../filesystem/filesystem'; // refactor
import { readDir, DocumentDirectoryPath, readFile } from "react-native-fs"
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { CardEditorHTML } from './CardEditorHTML';

import { selectAllCards, getDBConnection, deleteFromCards } from "../db";
import { editorState } from "../../App";
let clickedCardHash = ""


type ItemProps = {title: string};


const Item = ({ navigation, title, hash, setState, state }):JSX.Element => (
  <Pressable
    onPress={() => {
      editorState.hash = hash
      editorState.header = title
      editorState.case = "edit"
      navigation.navigate("CardEditor")
    }}
  >
      <View style={{
      backgroundColor: "white",
      marginVertical: 5,
      marginHorizontal:15,
      // padding: 10,
      borderRadius: 7,
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      overflow: "hidden",
      paddingLeft: 20,
      height: 60,
      }}>
      <Text style={{
        fontSize: 17,
        color: "black",
        borderColor: "white",
        borderWidth: 2,
        width: "80%",
        }}
        numberOfLines={2}

        >{title}</Text>
      <Pressable
        style={{
          width: 30,
          height: "100%",
          // padding: 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          backgroundColor: "lightgray",
        }}
        onPress={() => {
          setState(!state)
          clickedCardHash = hash
        }}
      >
          <Text
          style={{
            color: 'black',
            textAlign: "center",

          }}
          >...</Text>

      </Pressable>
    </View>
  </Pressable>
  
  
);


export function CardList({ navigation }):JSX.Element {

  // добавить тип данных к массиву чтоб он не ругался
  const [data, setData] = useState([])
  const [cardsList, setCardsList] = useState({})
  const [cardModalState, setCardModalState] = useState(false)

  useEffect(() => { // refactor
    console.log("CardList screen updated")

    const handleAsync = async () => {
      console.log("UPDATET CARDLIST FRAME")
      const db = await getDBConnection()
      const cardsArray = await selectAllCards(db)
      
      const newData = (await readDir(DocumentDirectoryPath + "/cards")).map(item => item.name)
      setData(newData)
      setCardsList(cardsArray)
      console.log(Object.keys(cardsArray).forEach(i => `${cardsArray[i].title} >> ${cardsArray[i].hash} \n `))
    }
    
    handleAsync()
    
  }, [])


  return(
    <View>
      <ScrollView>
          <View>
          <View>
            {data.map((item, index) => <Item key={index} title={ cardsList[item.slice(0, -5)]?.title } setState={setCardModalState} state={cardModalState} hash={item.slice(0, -5)} navigation={navigation} />)}
            </View>
          </View>

          <View>
            <Pressable
                style={{
                  padding: 20,
                  borderColor: "lightgray",
                  borderWidth: 3,
                  borderStyle: "dashed",
                  margin: 15,
                  borderRadius: 5,
                }}
                
                onPress={()=>{
                  editorState.header = ""
                  editorState.front = ""
                  editorState.back = ""
                  editorState.hash = ""
                  editorState.case = "create"
                  navigation.navigate("CardEditor")
                }}
              >
                <Text style={{textAlign: "center", color: "gray"}}>Добавить карточку</Text>
              </Pressable>
          </View>

        {/* </ScrollView> */}
      </ScrollView>
      {cardModalState?
        <View
        style={{
          position: "absolute",
          zIndex: 10,
          width: "70%",
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: "gray",
          gap: 40,
          paddingVertical: 40,
          borderRadius: 12,
        }}
        >
        <Pressable
        style={{
          width: "100%",
          alignItems: "center",
        }}
          onPress={() => {

            const handleAsync = async () => {
              try {
                const db = await getDBConnection()
                deleteFromCards(db, clickedCardHash)
    
              } catch(err) {
                console.log("ошибка при удалении карточки")
              }
              
            }; handleAsync()

            setCardModalState(false)
          }}
        >
          <Text
            style={{fontSize: 25}}
          >Удалить карточку</Text>
        </Pressable>
        <Pressable
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
        >
          <Text
            style={{fontSize: 25}}
          >Изменить категорию</Text>
        </Pressable>
        </View>

      :
      
      null
      }
    </View>

  )
}
