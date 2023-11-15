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
      // https://www.w3schools.com/jsref/jsref_localecompare.asp
      users: usuariosFiltrados.sort((a, b) => a.data.name.localeCompare(b.data.name)),
    });
  }

  PerfilDeUsuario(nombre) {
    nombre == auth.currentUser.email ?
      this.props.navigation.navigate('MyProfile')
      :
      this.props.navigation.navigate('ProfileUser', { user: nombre })
  }


  render() {
    return (
      <View>
        <Buscador navigation={this.props.navigation} filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} />
        {this.state.users.length === 0 ? <Text>El usuario no existe</Text> :
          <FlatList
            style={styles.nombres}
            data={this.state.users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FichaUsuario nombre={item.data.name} id={item.id} owner={item.data.owner} PerfilDeUsuario={(nombre) =>this.PerfilDeUsuario(nombre)}/>} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nombres: {
    textDecorationStyle: 'dashed'
  }
});