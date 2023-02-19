import React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';

export function HomeScreen ({ navigation }) {
    return(
        <View
        style={{
            backgroundColor: "white",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
            <Button
              title={"Просмотр карточек"}
            />
            <Button
              title={"Управление карточками"}
              onPress={ () => {navigation.navigate('CardList')} }
            />
        </View>
    )
  }