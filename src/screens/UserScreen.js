import React from 'react'
import { SafeAreaView,Text,View,TextInput,TouchableOpacity,Image ,StyleSheet} from 'react-native'
import {Avatar,Title,Caption,TouchableRipple,Switch,useTheme} from 'react-native-paper'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AuthContext } from '../components/Context/context';
import { useSelector } from 'react-redux';


export const UserScreen = ({navigation}) =>{

    const paperTheme = useTheme()

    const {name,email,sex} = useSelector(state=>state.user.data)

    const {toggleTheme} = React.useContext(AuthContext)

    const colo = '#077f7b'

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:'flex-end'}}>
                    {paperTheme.dark ? <Feather name="sun" size={20} color={paperTheme.colors.text}/> : <FontAwesome5 name="moon" size={20} color={paperTheme.colors.text}/>}
                    <TouchableRipple onPress={()=>toggleTheme()}>
                    <View pointerEvents="none">
                        <Switch color={colo} value={paperTheme.dark}/>
                    </View>
                </TouchableRipple>
            </View>
            <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                {sex.title === 'Женский' ? <Image    
                    source={require('../../assets/Image/female.png')}
                    style={{width:100,height:100}}
                />:<Image    
                source={require('../../assets/Image/male.png')}
                style={{width:100,height:100}}
            />}
                <View style={{alignItems:"center"}}>
                    <Title>{name}</Title>
                    <Caption>{email}</Caption>
                </View>
            </View>
            
            <View style={styles.infoBoxWrapper}>
                <View style={styles.infoBox}>
                    <Title>$150</Title>
                    <Caption>Бюджет</Caption>
                </View>
                <View style={{width:1,height:'100%',backgroundColor:'#dddddd'}}>
                </View>
                <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Рецептов</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
            <TouchableRipple onPress={()=>navigation.navigate('About')}>
                    <View style={styles.menuItem}>
                        <Icon name="account-outline" color="#077f7b" size={25}/>
                        <Text style={{marginLeft:10,fontSize:16,color:paperTheme.colors.text}}>О нас</Text>                        
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>console.log(1)}>
                    <View style={styles.menuItem}>
                        <Icon name="card"  color="#077f7b" size={25}/>
                        <Text style={{marginLeft:10,fontSize:16,color:paperTheme.colors.text}}>Оплата</Text>                        
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>console.log(1)}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color="#077f7b" size={25}/>
                        <Text style={{marginLeft:10,fontSize:16,color:paperTheme.colors.text}}>Поделится</Text>                        
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>console.log(1)}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#077f7b" size={25}/>
                        <Text style={{marginLeft:10,fontSize:16,color:paperTheme.colors.text}}>Поддержка</Text>                        
                    </View>
                </TouchableRipple>
               
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30,
    },
    infoBoxWrapper:{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
        marginVertical:30,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper:{
      },
      menuItem:{
          flexDirection:"row",
          alignItems:"center",
          paddingVertical: 15,
          paddingHorizontal: 30,
      }
})