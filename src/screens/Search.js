import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { db , auth } from '../firebase/config'
import Buscador from '../components/Buscador'
import FichaUsuario from '../components/FichaUsuario'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      usersBackup: []
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
        arrUsers.sort((a, b) => a.data.owner.localeCompare(b.data.owner)); // https://www.w3schools.com/jsref/jsref_localecompare.asp

        this.setState({
          users: arrUsers,
          usersBackup: arrUsers
        })
      })
  }

  filtrarUsuarios(nombre) {
    let usuariosFiltrados = this.state.usersBackup.filter((elm) =>
      elm.data.name.toLowerCase().includes(nombre.toLowerCase())
    );

    this.setState({
      
      users: usuariosFiltrados,
    });
  }

  PerfilDeUsuario(nombre) {
    nombre == auth.currentUser.email ?
      this.props.navigation.navigate('Profile')
      :
      this.props.navigation.navigate('ProfileUser', { user: nombre })
  }


  render() {
    return (
      <View style={styles.contenedor}>
        <Buscador navigation={this.props.navigation} filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} />
        {this.state.users.length === 0 ? <Text>El usuario no existe</Text> :
          <FlatList
            
            data={this.state.users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FichaUsuario data={item.data} nombre={item.data.name} id={item.id} owner={item.data.owner} PerfilDeUsuario={(nombre) =>this.PerfilDeUsuario(nombre)}/>} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex:1
  }
})