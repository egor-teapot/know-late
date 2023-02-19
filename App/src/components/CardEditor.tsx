import React, {useState, Component} from "react"
import {
    View,
    Button,
    TextInput,
    Text
} from 'react-native'

import { CardEditorHTML } from "./CardEditorHTML"
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { parseDocument, ElementType } from 'htmlparser2'


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
        <Button title="front" />
        <Button title="back" />
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