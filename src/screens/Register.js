import { Text, View, StyleSheet, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import FormRegister from '../components/FormRegister'

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      estaCargando:true
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged(( user )=> {
      if(user !== null){
        this.props.navigation.navigate('TabNavigation')
        
      }this.setState({estaCargando:false})
    })
  }


  render() {
    return (
      <View style={styles.loader}>
        {this.state.estaCargando ?  (<ActivityIndicator size="large" color="blue" />) :
        <FormRegister navigation={this.props.navigation} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loader:{
    display:'flex',
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  }
})