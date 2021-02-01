import React from 'react'
import {AntDesign,MaterialIcons,Ionicons} from '@expo/vector-icons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Main} from '../screens/Main'
import {RecipeDetail} from '../screens/RecipeDetail'
import {Search} from '../screens/Search'
import {CartScreen} from '../screens/CartScreen'
import {UserScreen} from '../screens/UserScreen'



const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel:false,
    style:{
        height:'10%',
        backgroundColor: '#ffffff'
    }
}

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={tabOptions}
            screenOptions={({route})=>({
                tabBarIcon:({focused})=>{
                    const tintColor = focused ? '#077f7b' : 'grey'

                    switch(route.name){
                        case 'Home':
                            return(
                                <AntDesign name="home" size={24} color={tintColor}/>
                            )
                        case 'Search':
                            return(
                                <AntDesign name="search1" size={24} color={tintColor} />                            
                            )    
                        case 'Cart':
                            return(
                                <AntDesign name="shoppingcart" size={24} color={tintColor} />
                            )  
                        case 'User':
                            return(
                                <AntDesign name="user" size={24} color={tintColor} />                   
                            )  
                        }    
                    }
                                    
            })}
        >
            <Tab.Screen
                name="Home"
                component={Main}
            />
            <Tab.Screen
                name="Search"
                component={Search}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
            />
            <Tab.Screen
                name="User"
                component={UserScreen}
            />
        </Tab.Navigator>
    )
}

export default Tabs