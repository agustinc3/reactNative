import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Buscador from '../components/Buscador'
import FichaUsuario from '../components/FichaUsuario'


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      usersBackup:[]
    }
  }

  componentDidMount() {
    console.log(this.state.users);
    db.collection('users')
      .onSnapshot(docs => {
        let arrUsers = []
        docs.forEach(doc => {
          arrUsers.push({
            id: doc.id,
            data: doc.data()

          })
        })

        this.setState({
          users: arrUsers,
          usersBackup : arrUsers
        })
      })
  }

  filtrarUsuarios(nombre) {
    let usuariosFiltrados = this.state.usersBackup.filter((elm) => elm.data.name.toLowerCase().includes(nombre.toLowerCase()))

    this.setState({
      users: usuariosFiltrados.slice(0, 5),
    })
  }

  render() {
    return (
      <View>
        <Buscador navigation={this.props.navigation} filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} />
        { this.state.users.length === 0 ?  <Text>El usuario no existe</Text>:
        <FlatList
                    style={styles.nombres}
                    data={this.state.users}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({ item })=><FichaUsuario nombre={item.data.name}  id={item.id}/>} /> } 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nombres:{
      textDecorationStyle: 'dashed'
  }
})