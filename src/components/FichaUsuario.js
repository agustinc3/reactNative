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
            <Text>
            {this.props.nombre}
            </Text>
        )
    }
}
