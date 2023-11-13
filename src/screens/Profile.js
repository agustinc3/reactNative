import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios: []
    }
  }

  componentDidMount(){
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
      let arrDocs = []
      docs.forEach((doc)=>{
        arrDocs.push({
          id:doc.id,
          data: doc.data()
        })
      })
      this.setState({
        usuarios: arrDocs
      },() => console.log(this.state.usuarios))
    })
    console.log(this.props)
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View>
        <Text>El email del usuario es:</Text>
          <FlatList
          data={this.state.usuarios}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=> <View> 
            <Text>{item.data.name}</Text>
          <Text>{item.data.owner}</Text>
          <Text>{item.data.minibio}</Text>
          </View>
            }
         />


        
          <TouchableOpacity
          style={styles.signoutBtn}
          onPress={()=> this.logout()}
          >
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  signoutBtn:{
    backgroundColor:'red',
    padding: 16
  }
})