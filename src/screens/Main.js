import React from 'react'
import {View,Text,ScrollView,StatusBar} from 'react-native'
import { Header } from '../components/Main/Header'
import { Category } from '../components/Main/Category'
import { Popular } from '../components/Main/Popular'
import { RecipeList } from '../components/Main/RecipeList'
import { useTheme } from '@react-navigation/native'



export const Main = ({navigation}) => {

    const {colors,dark} = useTheme()

    const theme = useTheme()

    return(
        
        <ScrollView>
            <StatusBar backgroundColor={theme.colors.background}  barStyle={theme.dark ? 'light-content' : 'dark-content'} />
            <View style={{flex:1,padding:15,paddingTop:30,height:'100%'}}>
                <Header/>
                <Category/>
                <Popular navigation={navigation}/>
                <RecipeList  navigation={navigation}/>
            </View>
        </ScrollView>

    )
}