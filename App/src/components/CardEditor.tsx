import React, {useEffect, useState, useRef} from "react"
import {
    View,
    Text,
    Pressable,
    TextInput
} from 'react-native'

import { CardEditorHTML } from "./CardEditorHTML"
import { WebView } from 'react-native-webview'
import { editorState } from "../../App"
import { readFile, DocumentDirectoryPath } from "react-native-fs"

let WebViewRef:null

export const CardEditor = () => {
    
    const [cardData, setCardData] = useState(CardEditorHTML())


    useEffect(() => {

      const handleAsync = async () => {
        if(editorState.case == "edit" && editorState.hash != "") {
          const data = await readFile(DocumentDirectoryPath + `/cards/${editorState.hash}.html`) 
          setCardData(data)
        }

      }; handleAsync()
    })
    
    return(
      <View style={{flex: 1, width: "100%", height:"100%"}}>
      <TextInput
        style={{
          fontSize: 25,
          color: "#DD0000",
          backgroundColor: "#FFBB6C"
        }}
        defaultValue={editorState.header}
        placeholder="Название карточки"
        placeholderTextColor={"#B95F5F"}
        onChangeText={text => {
          editorState.header = text
          
          console.log(editorState)
        }}
      />
      <View style={{flex: 1, width: "100%", height:"100%"}}>

      <View style={{flex: 1, width: "100%", height:"100%"}}>
        <WebView
          ref={(ref) => {WebViewRef = ref}}
          setBuiltInZoomControls={false}
          source={{html: cardData}}
          onLoad={() => {
              WebViewRef.injectJavaScript(`
              getCardData()

              document.getElementById('header').style.position = "absolute"
              document.getElementById('header').style.visibility = "hidden"
              document.getElementById('header').style.zIndex = -1
            `)
            } // arrow fun
          } // onLoad
          onLoadStart={() => {
            WebViewRef.injectJavaScript(`

            document.getElementById('header').style.position = "absolute"
            document.getElementById('header').style.visibility = "hidden"
            document.getElementById('header').style.zIndex = -1

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
            if(editorState.header == "") editorState.header = parsed.header

            console.log(editorState)
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          overflow: "hidden",
          paddingBottom: 20,
          paddingTop: 20,
          backgroundColor: "#37B872"
        }}
      >
        <Pressable
          onPress={async () => {
            editorState.viewedPart = 'front'
            WebViewRef.injectJavaScript(`
              document.getElementById('header').style.position = "absolute"
              document.getElementById('header').style.visibility = "hidden"
              document.getElementById('header').style.zIndex = -1

              document.getElementById('front').style.position = "static"
              document.getElementById('front').style.visibility = "visible"
              document.getElementById('front').style.zIndex = 1
              
              document.getElementById('back').style.position = "absolute"
              document.getElementById('back').style.visibility = "hidden"
              document.getElementById('back').style.zIndex = -1
              
              document.getElementById('front').innerHTML = "${editorState.front}"
            `)
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 25
            }}
          >Вопрос</Text>
        </Pressable>

        <Pressable
          onPress={() => {


          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 25
            }}
          >...</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            editorState.viewedPart = 'back'
            WebViewRef.injectJavaScript(`
              document.getElementById('header').style.display = 'none'

              document.getElementById('back').style.position = "static"
              document.getElementById('back').style.visibility = "visible"
              document.getElementById('back').style.zIndex = 1
              
              document.getElementById('front').style.position = "absolute"
              document.getElementById('front').style.visibility = "hidden"
              document.getElementById('front').style.zIndex = -1

              document.getElementById('back').innerHTML = "${editorState.back}"
            `)
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 25
            }}
          >Ответ</Text>
        </Pressable>
      </View>
    </View>
    </View>
  )
}
