import React from 'react';
import { StyleSheet, Text, StatusBar,View,Animated,FlatList,Image,Dimensions, TouchableOpacity } from 'react-native';


const {width,height}= Dimensions.get('screen')
// const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const bgs = ['#FFF','#FFF']
const DATA = [
  {
    "key": "3571572",
    "title": "Рады видеть вас в приложений Recipes",
    "description": "Приобретайте рецепты изысканных блюд в одном приложений",
    "image": require('../../assets/IntroImage/intro1.png')
  },
  {
    "key": "3571747",
    "title": "Отбирайте блюда по категориям",
    "description": "Выбирайте блюда которые вы предпочитаете",
    "image": require('../../assets/IntroImage/intro2.png')
  },
  {
    "key": "3571680",
    "title": "Приобретайте за три клика",
    "description": "Выбирайте блюдо, добавляйте в корзину, покупайте!",
    "image": require('../../assets/IntroImage/intro3.png')
  },
 
]

const Indicator = ({scrollX}) =>{
 
  return(
    <View style={{position:"relative",bottom:160,flexDirection:"row"}}>
      {DATA.map((_,i)=>{
        const inputRange = [(i-1) * width, i * width, (i+1)*width];

         const scale = scrollX.interpolate({
          inputRange,
          outputRange:[0.6,0.9,0.6],
          extrapolate:'clamp'
        })
        return(
          <Animated.View key={`indicator-${i}`}
            style={{
              height:10,
              width:10,
              borderRadius:5,
              backgroundColor:'#000',
              margin:10,
              transform:[
                {
                  scale,
                }
              ]
            }}
          >

          </Animated.View>
        )
      })}
    </View>
  )
};

const Backdrop = ({scrollX}) =>{
  // [0,width,width*2,...]
  const backgroundColor = scrollX.interpolate({
    inputRange:bgs.map((_,i)=>i*width),
    outputRange:bgs.map((bg)=>bg)
  })
  return(
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor
        }
      ]}
    />
  )
}

export default function Intro({showApp,navigation}) {

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="light-content"  />
      <Backdrop scrollX={scrollX}/>
      
      <Animated.FlatList 
        data = {DATA}
        keyExtractor={item=>item.key}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent:{contentOffset:{x:scrollX}}}],
          {useNativeDriver:false}
        )}
        pagingEnabled
        horizontal
        contentContainerStyle={{paddingBottom:100}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item})=>{
          return(
            <View style={{width,alignItems:"center",padding:35}}>
              <View>
              <Text style={{color:'#000',fontWeight:'800',fontSize:24,textAlign:"center"}}>{item.title}</Text>
              <Text style={{color:'#000',fontWeight:'300',fontSize:17,marginTop:15,textAlign:"center"}}>{item.description}</Text>
              </View>
              <View style={{justifyContent:"center"}}>
              <Image
                source={item.image}
                style={{
                  width:300,
                  height:350,
                  resizeMode:'contain'
                }}
              />
              </View>

              <View>
                
              </View>
              
            </View>
          )
        }}
      />
      <Indicator scrollX = {scrollX}/>
      <View style={{position:"absolute",bottom:40}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Regis')}>
          <View style={{backgroundColor:'#077f7b',borderRadius:10,width:width-50,height:40}}>
            <Text style={{color:'white',textAlign:"center",fontSize:19,lineHeight:38}}>
              Создать аккаунт
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:15}}>
          <Text style={{fontSize:17}}>Уже есть аккаунт ?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text style={{borderBottomWidth:2,borderBottomColor:'#077f7b',marginLeft:10,color:'#077f7b',fontWeight:"bold",fontSize:18}}>Войти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
