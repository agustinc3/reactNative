import { Text, View , TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'
import { db  } from '../firebase/config'

export default class InfoAdicionalUser extends Component {
  constructor(props){
    super(props )
    this.state={
        fotoPerfil: ''
    }
  }
  actualizarEstadoFotoDePerfil(url){
    this.setState ({
        fotoPerfil: url
    })
  }
  actualizarDocDelUsuario(){
    console.log(this.props.route.params.docId)
    db.collection ('users')
    .doc(this.props.route.params.docId)
    .update({
        fotoPerfil:  this.state.fotoPerfil
    })
    .then(resp => {
        this.props.navigation.navigate('TabNavigation') 
    })
  }
  
    render() {
    return (
      <View>
        <Text>InfoAdicionalUser</Text>
        <MyImagePicker actualizarEstadoFotoDePerfil= {(url)=> this.actualizarEstadoFotoDePerfil(url )} />
        {
            this.state.fotoPerfil !== '' ? 
        
            
            <TouchableOpacity  
            onPress={() => this.actualizarDocDelUsuario()}
            style= {styles.btn}
            >
            <Text  style = {styles.textBtn}>
                Añadir foto de perfil
            </Text>
        </TouchableOpacity>
        : null
       }
        <TouchableOpacity
        style= {styles.btn}
        onPress={()=> this.props.navigation.navigate('Login')}
        >
            <Text  style = {styles.textBtn}>
                Omitir este paso
            </Text>
        </TouchableOpacity>

      </View>
    )
  }
}
const styles = StyleSheet.create({
    btn:{
      backgroundColor:'purple',
      padding:16,
      marginBottom: 24
    },
    textBtn:{
        color:'white',
        textAlign:'center'
      }
})