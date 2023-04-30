// https://stackoverflow.com/questions/67755775/how-do-i-create-a-proper-text-editor-in-react-native
// https://meliorence.github.io/react-native-render-html/docs/reinvent-the-wheel


import React, {useState} from "react"
import {
    View,
    Text,
    Pressable,
    ToastAndroid,
    TextInput
} from 'react-native'

import { CardEditorHTML } from "./CardEditorHTML"
import { WebView, WebViewMessageEvent} from 'react-native-webview'
// import { STORAGE } from "../filesystem/filesystem"
// import RNFS from 'react-native-fs2'
import { editorState } from "../../App"

/*
Этот обьект описывает работу с состоянием карточки

useCase - может принимать стостояния edit или view.
при состоянии edit элемент с id header прячется,
и отображается только один элемент из front и back(по умолчанию: front).
При состоянии view отображается элементы с id header и front

viewedPart - дефолтная сторона при редактировании карточки

header - хранит innerHTML элемента с id header

front - хранит innerHTML элемента с id front

back - хранит innerHTML элемента с id back
*/



export const CardEditor = () => {
  // https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md#allowFileAccess
  
  const [viewState, setViewState] = useState('front')

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

  return(
    <View style={{flex: 1, width: "100%", height:"100%"}}>
      <TextInput
        style={{
          fontSize: 15
        }}
        placeholder="Название карточки"
        onChangeText={text => editorState.header = text}
      />
      <View style={{flex: 1, width: "100%", height:"100%"}}>
        <WebView
        ref={(ref) => {WebViewRef = ref}}
        source={{ html: CardEditorHTML() }} 
        setBuiltInZoomControls={false}
        injectedJavaScript={handleWebViewReload(viewState, editorState)}
        onMessage={ (event) => {
          const data = event.nativeEvent.data
          // editorState.front = data.front
          if(editorState.viewedPart === 'front') editorState.front = data
          if(editorState.viewedPart === 'back') editorState.back = data

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
        }}
      >
        <Pressable
          onPress={async () => {
            if (viewState === 'front') return
            setViewState('front')
            editorState.viewedPart = 'front'
            WebViewRef.reload()
          }}
        >
          <Text>Сторона вопроса</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            if (viewState === 'back') return
            setViewState('back')
            editorState.viewedPart = 'back'
            WebViewRef.reload()
          }}
        >
          <Text>Сторона ответа</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            console.log(editorState)

          }}
        >
          <Text>Логировать состояние</Text>
        </Pressable> */}
      </View>
    </View>

  )
}
