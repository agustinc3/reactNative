import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import FormDescripcionPost from '../components/FormDescripcionPost'
import CamaraPost from '../components/CamaraPost'


export default class NewPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      descripcion: '',
      urlFoto: '',
      paso1: true

    }
  }


  onSubmit({
    descripcion,
    urlFoto
  }) {
    db.collection('posts').add(
      {
        owner: auth.currentUser.email,
        createdAt:Date.now(),
        urlFoto: urlFoto,
        descripcion: descripcion,
        likes:[],
        comentarios: []
      }
    )
    .then(() => this.props.navigation.navigate('Home'))
    .catch((e) => console.log(e))

  }

  actualizarDescripcion(text) {
    this.setState({
      descripcion: text
    })
  }

  actualizarFotourl(url) {
    this.setState({
      urlFoto: url,
      paso1: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.paso1 ?
            <CamaraPost
              actualizarFotourl={(url) => this.actualizarFotourl(url)} />
            :
            <>
              <FormDescripcionPost
                actualizarDescripcion={(descripcion) => this.actualizarDescripcion(descripcion)}
                estadoDescripcion={this.state.descripcion} />

              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.onSubmit({
                  descripcion: this.state.descripcion,
                  urlFoto: this.state.urlFoto

                })}>

                <Text style={styles.textBtn} > Enviar</Text>
              </TouchableOpacity>

            </>


        }

      </View>
     
    )
  }
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor:'green',
    height: 50,
    padding:16,
    marginBottom: 24
    // borderWidth: 1,
    // borderColor: 'green',
    
  },
  container: {
    flex: 1
  },
  textBtn:{
    color:'white',
    textAlign:'center'
  },
})