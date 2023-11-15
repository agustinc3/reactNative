import { Text, View, TouchableOpacity, StyleSheet, Image , FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            likes:0,
            estaMiLike:false,
            dataPost: null
        }
    }

    componentDidMount(){
        console.log(this.props);
        let validacionLike = this.props.data.likes.includes(auth.currentUser.email)
        this.setState({
            estaMiLike: validacionLike
        })
        db
        .collection('posts')
        .doc(this.props.id)
        .onSnapshot((doc)=>{
            this.setState({dataPost: doc.data() }
            )
        })
    }


    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((resp) =>{
            this.setState({
                estaMiLike:true
            })
        })
        .catch((err) => console.log(err))
    }

    unlike(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then((resp) =>{
            this.setState({
                estaMiLike:false
            })
        })
        .catch((err) => console.log(err))
    }

    irAComentar(){
        this.props.navigation.navigate('Comments',{id: this.props.id})
    }

    botonPerfil(){
        this.props.data.owner == auth.currentUser.email ?
        this.props.navigation.navigate('Profile')
        :
        this.props.navigation.navigate('ProfileUser', { user: this.props.data.owner })
    }

    render() {
        return (
        <View style={styles.containerPost}>
            <Image
               source = {{uri: this.props.data.urlFoto ? this.props.data.urlFoto : '' }}
               style = {styles.img} 
               resizeMode='contain' 
           
            />
            <Text style={styles.descripcion}>{this.props.data.descripcion}</Text>
            <TouchableOpacity
            onPress={() => this.botonPerfil()}
            ><Text style={styles.owner}>{this.props.data.owner}</Text></TouchableOpacity>

            {/* <Text style={styles.usuario}>{this.props.data.owner}</Text>
            <Text>{this.props.data.descripcion}</Text> */}
            <View>
            
                {
                    this.state.estaMiLike ?
                    <View style={styles.likeContainer}>
                        <Text>{this.props.data.likes.length}</Text>
                        <TouchableOpacity
                        onPress={()=> this.unlike()}
                        >
                            <FontAwesome
                            name='heart'
                            color='red'
                            size={24}
                            />
                        </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.likeContainer}>
                        <Text>{this.props.data.likes.length}</Text>
                        <TouchableOpacity
                        onPress={()=> this.like()}
                        >
                        <FontAwesome
                        name='heart-o'
                        color='red'
                        size={24}
                        />
                        </TouchableOpacity>
                        </View>
                }
            
            </View>
            
            
            <View>
            <View style={styles.commentContainer}>
                <TouchableOpacity style={styles.comentarBtn}
                    onPress={()=> this.irAComentar()}
                >   
                <FontAwesome
                name='comment-o'
                color='white'
                size={20}
                />
                    <Text style={styles.comentarTxt}>Comentar {this.props.data.comentarios ? '(' + this.props.data.comentarios.length + ')' :  '(0)'}</Text>
                </TouchableOpacity></View>
                </View>

                {this.state.dataPost !== null && this.state.dataPost.comentarios.length !== 0 ? 
                <FlatList style={styles.container}
                    data={this.state.dataPost.comentarios.sort((a, b)=> b.createdAt - a.createdAt).slice(0,4)}
                    keyExtractor = {(item)=> item.createdAt.toString()}
                    renderItem={({item})=> <View>
                        <View style={styles.ownerContainer}> 
                        <Text style={styles.owner}>{item.owner}</Text>
                        </View>
                        <Text>{item.comentario}</Text>
                    </View> }/>             :
            <Text>Aún no hay comentarios </Text>
        }
            
        </View>
        )
    }
}

const styles = StyleSheet.create({
    containerPost:{
        marginBottom:8,
        marginTop:8,
        borderWidth: 1,
        borderColor: 'purple'
        
    },
    likeContainer:{
        display:'flex',
        flexDirection:'row-reverse',
    },
    comentarBtn:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'purple',
        textAlign:'right'
    },
    comentarTxt:{
        color:'white',
        textAlign:'right'
    },
    usuario:{
        fontWeight:'bold'
    },
    img: {
        width: '100% ',
        height : 200
    },
    descripcion:{
        textAlign:'center'
    },
    owner:{
        fontWeight:'bold'
    }
    
})