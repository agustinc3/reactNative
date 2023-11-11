import { Text, View, FlatList,  StyleSheet} from 'react-native'
import React, { Component } from 'react'
import FormComentarios from '../components/FormComentarios'
import { db } from '../firebase/config'
export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataPost: null
        }
    }
    
    componentDidMount(){
        db
        .collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot((doc)=>{
            this.setState({dataPost: doc.data() }
            )
        })
    }
  render() {
    return (
      <View>
        <Text style={styles.title}>Comments</Text>
        {
            this.state.dataPost !== null && this.state.dataPost.comentarios !== undefined ?
                <FlatList style={styles.container}
                    data={this.state.dataPost.comentarios.sort((a, b)=> b.createdAt - a.createdAt)}
                    keyExtractor = {(item)=> item.createdAt.toString()}
                    renderItem={({item})=> <View>
                        <View style={styles.ownerContainer}> 
                        <Text style={styles.owner}>{item.owner}</Text>
                        <Text> dice:</Text>
                        </View>
                        <Text>{item.comentario}</Text>
                    </View> }
                />
            :
            <Text>Aún no hay comentarios </Text>
        }
        <FormComentarios
         postId= {this.props.route.params.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{marginBottom:10},
    owner:{
        fontWeight:'bold'
    },
    ownerContainer:{
        display:'flex',
        flexDirection:'row'
    },
    title:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold',
        textDecorationLine:'underline',
        marginBottom:4
    }
})