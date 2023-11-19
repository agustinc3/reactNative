import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';
import Home from '../screens/Home'
import Search from '../screens/Search'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='green' />
        }}
        />
        <Tab.Screen 
        name='New Post' 
        component={NewPost}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='camera' size={24} color='green' />
        }}
        />
        <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='search' size={24} color='green' />
        }}
        />
        <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='user' size={24} color='green' />
        }}
        />
    </Tab.Navigator>
  )
}