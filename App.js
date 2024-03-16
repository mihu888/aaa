// import { Text, StyleSheet, View, TextInput, SafeAreaView, Button } from 'react-native'
// import React, { Component } from 'react'
// //import WebView from 'react-native-webview'
// //import Ionicons from 'react-native-vector-icons/Ionicons'
// import AuthScreen from './login'
// import LineChartComponent from './chart'
// import MyTabs from './navigation'
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native'
// import Screen1 from './Screen/detail';  
// import Screen2 from './Screen/icon';
// import Screen3 from './Screen/add';  
// import Screen4 from './Screen/find';  
// import Screen5 from './Screen/my';  

// const stack = createNativeStackNavigator();

// function MyApp() {
//   // Assign this to a dev-only button or useEffect call
//   const connectToRemoteDebugger = () => {
//     NativeDevSettings.setIsDebuggingRemotely(true);
//   };
// }

// export default class App extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <stack.Navigator initialRouteName='my' screenOptions={{headerShown:false}}>
//           <stack.Screen name='add' component={Screen3}/>
//           <stack.Screen name='detail' component={Screen1}/>
//           <stack.Screen name='icon' component={Screen2}/>
//           <stack.Screen name='find' component={Screen4}/>
//           <stack.Screen name='my' component={Screen5}/>
//         </stack.Navigator>
//       </NavigationContainer>
//     )
//   }
// }

// const styles = StyleSheet.create({})





import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';  
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
//import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from '@ui-kitten/components';
import CustomTabBar from './CustomTabBar'; // 导入自定义TabBar组件 
import Screen1 from './Screen/detail';  
import Screen2 from './Screen/icon';
import Screen3 from './Screen/add';  
import Screen4 from './Screen/find';  
import Screen5 from './Screen/my';  
import billScreen from './Screen/bill';
import budgetScreen from './Screen/budget';
import moreScreen from './Screen/more';
import AuthScreen from './login';
import { settoken, gettoken, getLoginInfo } from './globals';
  
const Tab = createBottomTabNavigator();  
const Stack = createNativeStackNavigator();
  
function MyTabs() {  
  return (  
     <Tab.Navigator  
      tabBar={(props) => <CustomTabBar {...props} />} 
      initialRouteName="Screen1"  
      screenOptions={{  
        headerShown:false
      }}>   
      <Tab.Screen name="明细" component={Screen1} options={{  
          tabBarIcon: ({ focused, color, size }) => (  
            <Ionicons name="reorder-four-outline" size={size} color={color} /> ),  
        }}   />  
      <Tab.Screen name="图表" component={Screen2} options={{  
          tabBarIcon: ({ focused, color, size }) => (  
            <Ionicons name="bar-chart-outline" size={size} color={color} /> ), 
        }} />  
      <Tab.Screen name="记账" component={Screen3} options={{
          tabBarIcon: ({ focused, color, size }) => (  
            <Ionicons name="add-circle-outline" size={size} color={color} /> ),  
        }}/>  
      <Tab.Screen name="发现" component={Screen4} options={{  
          tabBarIcon: ({ focused, color, size }) => (  
            <Ionicons name="search-outline" size={size} color={color} /> ),  
        }} />  
      <Tab.Screen name="我的" component={Screen5} options={{  
          tabBarIcon: ({ focused, color, size }) => (  
            <Ionicons name="people-outline" size={size} color={color} /> ),  
        }}/>  
    </Tab.Navigator> 
  );  
}  

function Stack1(){

  const [initialRoute, setInitialRoute] = useState('login');

  useEffect(() => {
    async function checkToken() {
      const loginInfo = await getLoginInfo();
      if (loginInfo) {
        const token = loginInfo.token;
        const username = loginInfo.username;
        // 现在你可以分别使用token和username进行后续操作
        setInitialRoute('main');
      }
      
    }

    checkToken();
  }, []); // 注意这里的空依赖数组，确保只在组件挂载时执行一次

  return(
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown:false}}>
      <Stack.Screen name = 'main' component={MyTabs}/>
      <Stack.Screen name = 'bill' component={billScreen}/>
      <Stack.Screen name = 'budget' component={budgetScreen}/>
      <Stack.Screen name = 'more' component={moreScreen}/>
      <Stack.Screen name = 'login' component={AuthScreen}/>
    </Stack.Navigator> 
  )
}
  
export default function Navigation() {  
  return (  
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />  
      <Stack1 />  
    </NavigationContainer>  
  );  
}