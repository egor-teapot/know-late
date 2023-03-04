
import { readFolderElements, STORAGE } from '../filesystem/filesystem';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';

type ItemProps = {title: string};


const Item = ({title}: ItemProps) => (
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
    >
        <Text
        style={{
          // transform: [{rotate: "90deg"}],
          // margin: 10,
          color: 'black',
          // fontSize: 30,
          textAlign: "center",

          // verticalAlign: "top"
        }}
        >...</Text>

    </Pressable>
  </View>
);



 
  
  // setData([{name: "some"}])
  
// возвращает массив с именами файлов и папок
const cadrsFolderElements = async () => await readFolderElements('/cards')

// const elementList = [{name: "test 1"}] 

export function CardList({ navigation }):JSX.Element {

  // добавить тип данных к массиву чтоб он не ругался
  const [data, setData] = useState([])

  // useEffect re-render error
  // https://typeofnan.dev/fix-the-maximum-update-depth-exceeded-error-in-react/
  useEffect(() => {
    console.log("CardList screen updated")

    const handleAsync = async () => {
      const newData = await cadrsFolderElements()
      setData((data) => [...newData])
    }
    handleAsync()
  }, [])


  return(
    <View>
        <TextInput 
        style={{
          height: 40,
          margin: 12,
          borderBottomWidth: 2,
          borderColor: "lightgray",
          // borderLeftWidth: 2,
          padding: 10,
          // borderRadius: 5,
        }}
        placeholder={"Введите название карточки"}
      />
      <ScrollView>
        {/* <ScrollView
          style={{paddingBottom:230}}
        > */}
          <View>
          <View>
            {/* 
            FlatList 
            https://stackoverflow.com/questions/67623952/error-virtualizedlists-should-never-be-nested-inside-plain-scrollviews-with-th */}
            {
              data.map(item => <Item title={item.name} />)
            }
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
                  // backgroundColor: "white"
                }}
                onPress={()=>{navigation.navigate("CardEditor")}}
              >
                <Text style={{textAlign: "center", color: "gray"}}>Добавить карточку</Text>
              </Pressable>
          </View>

        {/* </ScrollView> */}
      </ScrollView>
    </View>

  )
}
