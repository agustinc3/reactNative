import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Post from '../components/Post'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios: [],
      posts: [],
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
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
      let arrPosts = []
      docs.forEach((doc)=>{
        arrPosts.push({
          id:doc.id,
          data: doc.data()
        })
      })
      this.setState({
        posts: arrPosts
      },() => console.log(this.state.posts))
    })
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }
  eliminarPost(idPost){
    db.collection('posts').doc(idPost).delete()

  }

  render() {
    return (
      <View  style={styles.contenedor}>
        <Text>Perfil del usuario:</Text>
          <FlatList
          data={this.state.usuarios}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=> <View> 
          <Text>{item.data.name}</Text>
          <Text>{item.data.owner}</Text>
          <Text>{item.data.minibio}</Text>
          <Image 
            source={{uri: item.data.fotoPerfil}}
            style={styles.img}
          
          />
          </View>
            }
         />
            <FlatList
            
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <View  style={styles.postContainer}>
                    <Text>Cantidad de posteos: {this.state.posts.length}</Text>
                    <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                    <TouchableOpacity
                    style={styles.btnEliminar}
                    onPress={()=>this.eliminarPost(item.id)}> 
                    <Text style={styles.textEliminar}>Eliminar Posteo</Text>
                    </TouchableOpacity>
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
  },
  btnEliminar:{
    backgroundColor:'#Be2542',
    padding: 10,
    borderRadius:6,
    marginBottom: 10
  },
  img:{
      height:100,
      width:500,
    },
    contenedor: {
        flex:1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    postContainer:{
        marginBottom: 16,
        backgroundColor: '#FFFFFF', // White background for the "box"
        borderRadius: 8, // Border radius for rounded corners
        padding: 16,
        elevation: 2, // Shadow for a slight lift
    },
    })
