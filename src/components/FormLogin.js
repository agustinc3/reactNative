import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            mail:'',
            password: ''
        }
    }

    loguearUsuario(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch((e)=> alert('Verifica tus datos'))
    }

  render() {
    return (
      <View>
        <Text style={styles.title}>Logueate en mi app</Text>
        <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Dinos tu email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />
                <TextInput
                    style = {styles.input}
                    placeholder = 'Dinos tu password'
                    keyboardType = 'email-address'
                    value = {this.state.password}
                    onChangeText = { (text) => this.setState({password: text}) }
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {if (this.state.password=='') {
                        alert('Escribe tu contraseña')
                    } else if(this.state.mail==''){
                        alert('Escribe tu email') }
                        else{this.loguearUsuario(this.state.mail, this.state.password)}}}
                >
                    <Text style={styles.textBtn}>Iniciar sesión</Text>
                </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24
    },
    btn:{
        backgroundColor:'purple',
        padding:16,
        marginBottom: 24
    },
    textBtn:{
        color:'white',
        textAlign:'center'
    },
    title:{
            fontSize:16,
            fontWeight:'bold',
            textDecorationLine:'underline',
            textAlign:'center',
            marginBottom:4
    
    }
    
})