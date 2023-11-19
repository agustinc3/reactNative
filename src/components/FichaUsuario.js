import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export default class FichaUsuario extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        console.log(this.props.data);
    }


render(){
    return(
        <TouchableOpacity onPress={() => this.props.PerfilDeUsuario(this.props.nombre)} style={styles.nombres}>
        <Text>{this.props.nombre}</Text>
        <Text>{this.props.owner}</Text>
      </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    nombres: {
        marginVertical: 5,
        padding: 5,
        backgroundColor: '#CDCDCD',
        borderRadius: 5,
      },
    }
  )

