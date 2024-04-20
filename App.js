import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';  
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      style={{ flex: 1 }}
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
      const token = gettoken();
      if (token != null) {
        setInitialRoute('main');
    }
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