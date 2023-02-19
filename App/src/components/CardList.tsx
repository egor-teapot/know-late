import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  TextInput
} from 'react-native';


type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={{backgroundColor: "white", marginVertical: 5, marginHorizontal:15, padding: 30, borderRadius: 5}}>
    <Text style={{color: "black"}}>{title}</Text>
  </View>
);

export function CardList({ navigation }):JSX.Element {
  return(
    <View>
        <TextInput 
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderRadius: 100,
        }}
        placeholder={"Введите название карточки"}
      />
      <ScrollView>
        <ScrollView
          style={{paddingBottom:230}}
        >
          {/* <VirtualizedList
            data={DATA}
            getItemCount={DA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          /> */}

          <View>
            <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            />
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

        </ScrollView>
      </ScrollView>
    </View>

  )
}

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];