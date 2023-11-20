import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
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
  
  
  render() {
    return (
      <View style={styles.contenedor} >
        <Text>Email de usuario : </Text>
            <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={({item}) => <View>
              <Text>{item.data.owner}</Text>
              <Text>{item.data.name}</Text>
              <Text>{item.data.miniBio}</Text>
              </View>
               }
            />
            <Text>Posteos del usuario:{this.props.route.params.user}</Text>
            <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
            <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <View>
                    <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                    <TouchableOpacity
                    style={styles.btnEliminar}
                    onPress={()=>this.eliminarPosteo(item.id)}> 
                    <Text style={styles.textEliminar}>Elimar Posteo</Text>
                    </TouchableOpacity>
                </View>
            }
            />
      </View>
    )
  }
}
const styles = StyleSheet.create({
    signoutBtn:{
      backgroundColor:'#Be2542',
      padding: 10,
      borderRadius:6,
    },
    btnEliminar:{
      backgroundColor:'purple',
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
    textEliminar:{
      color:'white',
      textAlign:'center'
    }
  })