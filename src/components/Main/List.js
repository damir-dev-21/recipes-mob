import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View ,ScrollView,Image,Text, Button, TouchableOpacity} from 'react-native'

export const List = ({product,navigation}) =>{

    const {colors} = useTheme()

    return(
        <View style={{width:'100%',flex:1,marginVertical:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <View style={{width:'40%'}}>
                <Image source={product.img} style={{width:100,height:100,borderRadius:50}} resizeMode="cover"/>
            </View>
            <View style={{width:'60%'}}>
                <View>
                    <Text style={{fontSize:20,fontWeight:"bold",color:colors.text}}>{product.title}</Text>
                    <Text style={{marginVertical:10,fontSize:20,color:'#077f7b',fontWeight:"bold"}}>{product.price}$</Text>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                    
                    <TouchableOpacity onPress={()=>navigation.navigate('RecipeDetail',{
                        product:product
                    })}>
                        <View style={{height:30,borderRadius:10,width:100,backgroundColor:'black',}}>
                            <Text style={{color:'white',lineHeight:27,fontSize:16,textAlign:"center"}}>
                                Открыть
                            </Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}