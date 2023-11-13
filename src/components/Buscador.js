import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

class Buscador extends Component{
    constructor(props){
        super(props)
        this.state = {
            valorInput: ''
        }
    }

    evitarSubmit(evento){
        evento.preventDefault();
    }

    guardarValor(evento){
        this.setState(
            {
                valorInput: evento.target.value
            },
            () => this.props.filtrarUsuarios(this.state.valorInput)
        )
    }

    render(){
        return(
            <>
            <TextInput onSubmit={(evento)=> this.evitarSubmit(evento)}
              placeholder='Busca usuarios'
            keyboardType='default' onChange={(evento)=> this.guardarValor(evento)}
            value={this.state.valorInput}/>
            </>
        )
    }
}

export default Buscador