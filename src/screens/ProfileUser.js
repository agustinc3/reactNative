import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios:[], 
      posteos: []
    }
  }
  
  componentDidMount(){
    db.collection('users').where('owner', '==', this.props.route.params.user).onSnapshot((docs)=>{
        let arrDocs = []
        docs.forEach((doc) => {
          arrDocs.push({
            id:doc.id,
            data: doc.data()
          })
        })

        this.setState({
          usuarios : arrDocs
        })
      })
      db.collection('posts').where('owner', '==', this.props.route.params.user).onSnapshot((docs)=>{
        let arrPosts = []
        docs.forEach((doc)=> {
          arrPosts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        
        this.setState({
          posteos: arrPosts
        })
      })
  }
  
  eliminarPosteo(idPost){
    db.collection('posts').doc(idPost).delete()

  }
  
  componentDidUpdate(){
    console.log(this.state.usuarios)
    console.log(this.state.posteos);
    console.log(this.props.route.params.owner);
  }
  render() {
    return (
      <View style={styles.contenedor}>

        <FlatList
          data={this.state.usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.data.owner}</Text>
              <Text>{item.data.name}</Text>
              <Text>{item.data.miniBio}</Text>
              {item.data.fotoPerfil != '' ? (
                  <Image
                    source={item.data.fotoPerfil}
                    style={styles.img}
                    resizeMode="contain"
                  />
                ) : ''}
          </View>
        )}
      />
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
              <Post navigation={this.props.navigation} data={item.data} id={item.id} />
            </View>
          )}
        />
      </View>
    );
  }}
  
  const styles = StyleSheet.create({
    signoutBtn: {
      backgroundColor: '#Be2542',
      padding: 10,
      borderRadius: 6,
    },
    btnEliminar: {
      backgroundColor: 'purple',
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
    },
    img: {
      height: 100,
      width: 350,
    },
    contenedor: {
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    postContainer: {
      marginBottom: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 16,
      elevation: 2,
    },
    textEliminar: {
      color: 'white',
      textAlign: 'center',
    },
  })