// https://stackoverflow.com/questions/67755775/how-do-i-create-a-proper-text-editor-in-react-native
// https://meliorence.github.io/react-native-render-html/docs/reinvent-the-wheel


import React, {useEffect, useState} from "react"
import {
    View,
    Text,
    Pressable,
    ToastAndroid,
    TextInput
} from 'react-native'

import { CardEditorHTML } from "./CardEditorHTML"
import { WebView, WebViewMessageEvent} from 'react-native-webview'
import { editorState } from "../../App"
import { selectAllCardsArray, getDBConnection } from "../db"
import { readFile, DocumentDirectoryPath } from "react-native-fs"



const cardsAnswerTimeChecker = async () => {
    const currentDate = new Date()
    const db = await getDBConnection()
    const allCards = await selectAllCardsArray(db);

    let arr = []

    allCards.map(item => {
        // console.log(item)
        if (currentDate >= new Date(item["date_of_next_answer"])) arr.push(item.hash)
    })
    return arr
};
// cardAnswerTimeChecker().then(data => console.log(data))

export const CardAnswering = () => {
    console.log("CARDANSWERING SCREEN")

  const [viewState, setViewState] = useState('front')
  const [cardsToAnswer, setCardsToAnswer] = useState([])

  useEffect(() => {
        const handleAsync = async () => {
            const cards = await cardsAnswerTimeChecker()
            setCardsToAnswer((data) => [...cards])
        }
        handleAsync()
  }, [])

  const test = () => {
    return(
        cardsToAnswer.map(item => {return <Text style={{color: "black"}}>SDfasdf</Text>})
    )
  }


  const handleWebViewReload = (viewedPart:string, data:string) => {
    if (viewedPart === 'front') {
      return `
      document.getElementById('header').style.display = 'none'
      document.getElementById('back').style.display = 'none'
      document.getElementById('front').style.display = ''
      document.getElementById('front').innerHTML = "${data.front}"`
    }
  
    if (viewedPart === 'back') {
      return `
      document.getElementById('header').style.display = 'none'
      document.getElementById('back').style.display = ''
      document.getElementById('front').style.display = 'none'
      document.getElementById('back').innerHTML = "${data.back}"`
    }
  }

  let WebViewRef:null

  console.log(cardsToAnswer)

  return(
    <View style={{flex: 1, width: "100%", height:"100%"}}>
      <View style={{flex: 1, width: "100%", height:"100%"}}>
        <View>
        {
            test()
        }
        </View>

        {/* <WebView
        ref={(ref) => {WebViewRef = ref}}
        source={{ html:  CardEditorHTML()}}
        setBuiltInZoomControls={false}
        injectedJavaScript={handleWebViewReload(viewState, editorState)}
        onMessage={ (event) => {
          const data = event.nativeEvent.data
          // editorState.front = data.front
          if(editorState.viewedPart === 'front') editorState.front = data
          if(editorState.viewedPart === 'back') editorState.back = data

        }}
        /> */}
      </View>
    </View>
  )
}
