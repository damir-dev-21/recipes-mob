import React, { useState } from 'react'
import {Provider} from 'react-redux'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer,
        DefaultTheme as NavigationDefaultTheme,
        DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'
import {AppLoading} from 'expo'
import { AsyncLoad } from './src/AsyncLoad'
import Tabs from './src/navigation/index'
import store from './src/store/index'
import {RecipeDetail} from './src/screens/RecipeDetail'
import { Search } from './src/screens/Search'

import {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme ,DarkTheme as PaperDarkTheme} from 'react-native-paper'


import AppIntroSlider from 'react-native-app-intro-slider';
import Intro from './src/screens/Intro'
import { LoginScreen } from './src/screens/LoginScreen'
import { RegScreen } from './src/screens/RegScreen'

import {AuthContext} from './src/components/Context/context'
import { About } from './src/screens/About'

const App = () =>{

  const [isDark,setIsDark] = React.useState(false);
  
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDark ? CustomDarkTheme : CustomDefaultTheme;

  const Stack = createStackNavigator()
  
  const [isReady,setIsReady] = useState(false);

  const authContext = React.useMemo(()=>({
    toggleTheme:()=>{
      setIsDark(isDark => !isDark)
    }
  }))


  if(!isReady){
    return(
      <AppLoading
        startAsync={AsyncLoad}
        onFinish={()=>setIsReady(true)}
        onError={e=>console.log(e)}
      />
    )
  }
  
    return(
     <PaperProvider theme={theme}>
       <AuthContext.Provider value={authContext}>
       <Provider store={store}>
      <NavigationContainer theme={theme}>

      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={'Intro'}>

        <Stack.Screen name='Home' component={Tabs} />

          <Stack.Screen name="RecipeDetail" component={RecipeDetail}  options={{headerShown:false}}/>

          <Stack.Screen name="Search" component={Search}/>

          <Stack.Screen name="Login" component={LoginScreen}/>

          <Stack.Screen name="Regis" component={RegScreen} options={{headerShown:false}}/>

          <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}}/>

          <Stack.Screen name='About' component={About} />

        </Stack.Navigator>

      </NavigationContainer>  
      </Provider>
     
       </AuthContext.Provider>
      </PaperProvider>
    )
  
}

export default App