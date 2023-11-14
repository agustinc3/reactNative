import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { TextInputComponent } from 'react-native'


export default class FormDescripcionPost extends Component {
    constructor(props){
        super(props)
        this.state ={
            descripcionPost : '',
            foto:''
        }
    }
  render() {
    // 
    return (
        <View>
          <Text> Añade una descripción  </Text>
  
          <View>
              <TextInput 
              placeholder='Describí tu post'
              onChangeText={(text) => this.props.actualizarDescripcion(text)}
              value= {this.props.estadoDescripcion}
              style={styles.input}
              multiline={true}
              numberOfLines={8}
              />
              
              
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'red'
    },
    btn:{
        borderWidth:1,
        borderColor:'green'
    }
})