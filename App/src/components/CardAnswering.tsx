// https://stackoverflow.com/questions/67755775/how-do-i-create-a-proper-text-editor-in-react-native
// https://meliorence.github.io/react-native-render-html/docs/reinvent-the-wheel

import React, {useEffect, useState} from "react"
import {
    View,
    Text,
    Pressable,
} from 'react-native'

import { CardEditorHTML } from "./CardEditorHTML"
import { WebView, WebViewMessageEvent} from 'react-native-webview'
import { editorState, cardsAwaitingState } from "../../App"
import { selectAllCardsArray, getDBConnection, selectByColumnFromTable, updateCardTimestamp } from "../db"
import { readFile, DocumentDirectoryPath } from "react-native-fs"
import { increaseLevelOfCard, decreaseLevelOfCard, calculateDateOfNextAnswer } from "../utils"

// Ссылка на webview позволяющая работать с ним в не элемента
let WebViewRef:null

export const CardAnswering = () => {
    
    // Хранилище состояния компонента
    const [viewState, setViewState] = useState('front')
    const [CardHash, setCardHash] = useState("")
    const [cardData, setCardData] = useState("")
    const [noCardsLeftState, SetNoCardsLeftState] = useState(false)

    // Побочный эффект
    useEffect(() => {
      if(cardsAwaitingState.length < 1) {
        SetNoCardsLeftState(true)
        WebViewRef.injectJavaScript(`
          document.getElementById('header').style.position = "absolute"
          document.getElementById('header').style.visibility = "hidden"
          document.getElementById('header').style.zIndex = -1

          document.getElementById('back').style.position = "absolute"
          document.getElementById('back').style.visibility = "hidden"
          document.getElementById('back').style.zIndex = -1
        `)
      }

      if(cardsAwaitingState.length > 0) {
        SetNoCardsLeftState(false)
        WebViewRef.injectJavaScript(`
        document.getElementById('header').style.position = "static"
        document.getElementById('header').style.visibility = "visible"
        document.getElementById('header').style.zIndex = 1

        document.getElementById('back').style.position = "static"
        document.getElementById('back').style.visibility = "visible"
        document.getElementById('back').style.zIndex = 1
      `)
      }

      const handleAsync = async () => {
        try {
          const data = await readFile(DocumentDirectoryPath + `/cards/${cardsAwaitingState[cardsAwaitingState.length-1]}.html`) 
          setCardHash(cardsAwaitingState[cardsAwaitingState.length-1])
          setCardData(data)
        } catch(err) {
          console.log("no cards left")
        }
      }; handleAsync()
    })
    

    return(
      <View style={{flex: 1, width: "100%", height:"100%"}}>
          <Pressable style={{position: "absolute", zIndex: 2, width: "100%", height: "100%"}}
            onLongPress={() => {
              setViewState('back')
              WebViewRef.injectJavaScript(`
              document.getElementById('front').style.visibility='hidden';
              document.getElementById('front').style.position = "absolute";
              document.getElementById('front').style.zIndex = -1

              document.getElementById('back').style.position = "static"
              document.getElementById('back').style.visibility = "visible"
              document.getElementById('back').style.zIndex = "1"

              document.getElementById('back').innerHTML = "${editorState.back}"
              `)
            }}
            delayLongPress={1000}
          />
      <View style={{flex: 1, width: "100%", height:"100%"}}>
        <WebView
          ref={(ref) => {WebViewRef = ref}}
          setBuiltInZoomControls={false}
          source={{html: cardData}}
          onLoad={() => {
              WebViewRef.injectJavaScript(`
              getCardData()
            `)
            } // arrow fun
          } // onLoad
          onLoadStart={() => {
            WebViewRef.injectJavaScript(`

            document.getElementById('back').style.position = "absolute"
            document.getElementById('back').style.visibility = "hidden"
            document.getElementById('back').style.zIndex = -1
            `)
          }}
          onMessage={(event) => {
            const data = event.nativeEvent.data
            const parsed = JSON.parse(data)
            
            editorState.front = parsed.front
            editorState.back = parsed.back
            editorState.header = parsed.header

            console.log(data)
          }}
        />
      </View>
      
      {viewState == "back"?
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            overflow: "hidden",
            zIndex: 3,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "green",
              // minHeight: 70,
            }}
            onPress={() => {              
              
              const handleAsync = async () => {
                const db = await getDBConnection()
                const data = await selectByColumnFromTable(db, "card_timestamp", "cards_hash", CardHash)
                
                const card = data[0]
                const newLevel = increaseLevelOfCard(card.level)
                const newDateOfNextAnswer = calculateDateOfNextAnswer(Date.now(), newLevel)

                console.log(card)
                await updateCardTimestamp(db, card.cards_hash, Date.now(), newDateOfNextAnswer, newLevel)

              }; handleAsync()
              
              cardsAwaitingState.pop()
              
              setViewState("front")

          }} // onPress Pressable
          >
            <Text>Ответ верный</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "red",
              // minHeight: 70,
            }}
            onPress={() => {
              const handleAsync = async () => {
                const db = await getDBConnection()
                const data = await selectByColumnFromTable(db, "card_timestamp", "cards_hash", CardHash)
                
                const card = data[0]
                const newLevel = decreaseLevelOfCard(card.level)
                const newDateOfNextAnswer = calculateDateOfNextAnswer(Date.now(), newLevel)

                console.log(card)
                await updateCardTimestamp(db, card.cards_hash, Date.now(), newDateOfNextAnswer, newLevel)

              }; handleAsync()
              
              cardsAwaitingState.pop()
              
              setViewState("front")
            }}
          >
          <Text>Ответ не верный</Text>
          </Pressable>
        </View> : null
      }
      {noCardsLeftState?
      <Text style={{
        position: "absolute", 
        fontSize: 20, 
        alignSelf: "center", 
        top: "50%",
        fontFamily: "RobotoSlab-SemiBold",
      
      }}>Вы повторили все карточки!</Text>
      :null
      }
    </View>
  )
}
