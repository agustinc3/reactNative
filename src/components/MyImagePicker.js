import { Text, View , TouchableOpacity, Image, StyleSheet  } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage  } from '../firebase/config'


export default class MyImagePicker extends Component {
    constructor(props ){
         super(props)
         this.state ={
            imagenCargada: ''
         }
    }
    activarPicker(){
        ImagePicker.launchImageLibraryAsync()
        .then(imageData =>  this.setState({imagenCargada:imageData.assets[0].uri} ) )
        .catch( err=> console.log (err))
    }
    aceptarImagen  (){
      fetch(this.state.imagenCargada)
      .then(resp => resp.blob( ))
      .then(imagen =>{
        let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`)
        ref.put(imagen)
        .then(()=>{
          ref.getDownloadURL()
          .then((url) => {this.props.actualizarEstadoFotoDePerfil(url)})
        })
      } )
      .catch(err=>  console.log (err) )
      
    }


    rechazarImagen (){
      this.setState({imagenCargada: ''})
    }
    render() {
      return (
        <View>
          {this.state.imagenCargada !== '' ?
          <>
            <Image
            source={{uri: this.state.imagenCargada}}
            style = {styles.img}
            />
            <TouchableOpacity 
            onPress={()=> this.aceptarImagen()}
            style = {styles.btn}>
            <Text style = {styles.textBtn}>Aceptar imagen</Text> 
            </TouchableOpacity>
          
            <TouchableOpacity 
            onPress={()=> this.rechazarImagen()}
            style = {styles.btn}>
            <Text style = {styles.textBtn}>Rechazar imagen</Text>
            </TouchableOpacity>
  
          </>

          :
          <>
              <TouchableOpacity
              onPress={()=> this.activarPicker()}
              style= {styles.btn}
              >
                  <Text style = {styles.textBtn}> Cargue su imagen desde la libreria </Text>
              </TouchableOpacity>
          
          
          
          </>
  
  
          
          }
          
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    img: {
      height : 200
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
    })