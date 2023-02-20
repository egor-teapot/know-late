import React, {useState, Component} from "react"
import {
    View,
    Text,
    Pressable,
    ToastAndroid
} from 'react-native'

import { CardEditorHTML } from "./CardEditorHTML"
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { STORAGE } from "../filesystem/filesystem"
import RNFS from 'react-native-fs2'

export const CardEditor = () => {
  // https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md#allowFileAccess
  
  return(
    <View style={{flex: 1, width: "100%", height:"100%"}}>
      <View style={{flex: 1, width: "100%", height:"100%"}}>
        <WebView
        source={{ html: CardEditorHTML }} 
        setBuiltInZoomControls={false}
        onMessage={ (event) => {
          console.log(event.nativeEvent.data)} }
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: 20,
          paddingTop: 20,
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <Pressable
          onPress={async () => {
            // ToastAndroid.show(, ToastAndroid.SHORT)
            const data = await RNFS.readDir(STORAGE)
            const parsed = JSON.stringify(data) 
            console.log(data.map(item => item.name))
          }}
        >
          <Text>Сторона вопроса</Text>
        </Pressable>

        <Pressable
          onPress={async () => {
            RNFS.unlink(await STORAGE+"some.txt")
            RNFS.writeFile(await STORAGE+"some.txt", "some text", "utf8")
            // возвращяемая строка закодирована в base64 ее нужно декодировать еще раз
            console.log(decodeURI(await RNFS.readFile(STORAGE+"some.txt", "utf8")))

          }}
        >
          <Text>Сторона ответа</Text>
        </Pressable>
      </View>
    </View>

  )
}

// export function CardEditor() {

//     // https://stackoverflow.com/questions/67755775/how-do-i-create-a-proper-text-editor-in-react-native


//     // ну в жепу, я буду использовать webview он не может быть на столько жирным

//     // как сделать собственный html отрисовщик для react native
//     // https://meliorence.github.io/react-native-render-html/docs/reinvent-the-wheel

//    const [inputState, setInputState] = useState('')

//     return(
//         // <View style={{flex:1, width:"100%",height:"100%"}}>
//         //     <WebView source={{uri: 'http://facebook.com/'}} style={{flex:1}} javaScriptEnabled={true} />
//         // </View>
//         <View>
//           {/* <Text>{parseDocument(CardEditorHTML)}</Text> */}
//         </View>

//     ) // return
//   } // fun CardEditor