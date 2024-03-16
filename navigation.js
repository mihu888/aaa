// import React from 'react';  
// import { NavigationContainer } from '@react-navigation/native';  
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
// //import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Icon } from '@ui-kitten/components';
// import CustomTabBar from './CustomTabBar'; // 导入自定义TabBar组件 
// import Screen1 from './Screen/detail';  
// import Screen2 from './Screen/icon';
// import Screen3 from './Screen/add';  
// import Screen4 from './Screen/find';  
// import Screen5 from './Screen/my';  
  
// const Tab = createBottomTabNavigator();  
  
// function MyTabs() {  
//   return (  
//    /* <Tab.Navigator  
//       initialRouteName="Screen1"  
//       screenOptions={{  
//         tabBarActiveTintColor: 'black',  
//         tabBarLabelStyle: { fontSize: 12 },  
//         tabBarStyle: {  
//           backgroundColor: 'pink',  
//           height: 56,  
//           elevation: 0,  
//           shadowOpacity: 0,  
//           position: 'absolute',  
//           bottom: 0,  
//           left: 0,  
//           right: 0,  
//         },  
//       }}>
//       */
//      <Tab.Navigator  
//       tabBar={(props) => <CustomTabBar {...props} />} // 使用自定义TabBar  
//       initialRouteName="Screen1"  
//       screenOptions={{  
//         // 移除默认的tabBarActiveTintColor等样式，因为我们在CustomTabBar中处理  
//       }}>   
//       <Tab.Screen name="明细" component={Screen1} options={{  
//           tabBarIcon: ({ focused, color, size }) => (  
//             <Ionicons name="reorder-four-outline" size={size} color={color} /> ),  
//         }}   />  
//       <Tab.Screen name="图表" component={Screen2} options={{  
//           tabBarIcon: ({ focused, color, size }) => (  
//             <Ionicons name="reorder-four-outline" size={size} color={color} /> ), 
//         }} />  
//       <Tab.Screen name="记账" component={Screen3} options={{  
//           tabBarIcon: ({ focused, color, size }) => (  
//             <Ionicons name="reorder-four-outline" size={size} color={color} /> ),  
//         }}/>  
//       <Tab.Screen name="发现" component={Screen4} options={{  
//           tabBarIcon: ({ focused, color, size }) => (  
//             <Ionicons name="reorder-four-outline" size={size} color={color} /> ),  
//         }} />  
//       <Tab.Screen name="我的" component={Screen5} options={{  
//           tabBarIcon: ({ focused, color, size }) => (  
//             <Ionicons name="reorder-four-outline" size={size} color={color} /> ),  
//         }}/>  
//     </Tab.Navigator>  
//   );  
// }  
  
// export default function navigation() {  
//   return (  
//     <NavigationContainer>  
//       <MyTabs />  
//     </NavigationContainer>  
//   );  
// }


// import React, { Component } from 'react'
// import { Text, View, ScrollView, StyleSheet, Button, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import {NavigationContainer} from '@react-navigation/native'
// import Icon from 'react-native-vector-icons/Ionicons'

// const Tab = createBottomTabNavigator()

// function a(){
//   return(
//     <View>
//       <Text>a</Text>
//     </View>
//   )
// }

// function b(){
//   return(
//     <View>
//     </View>
//   )
// }

// function c(){
//   return(
//     <View>
//     </View>
//   )
// }

// function d(){
//   return(
//     <View>
//     </View>
//   )
// }

// function e(){
//   return(
//     <View>
//     </View>
//   )
// }


// export default class MyTabs extends Component {

//   render() {
  
//   return ( 
//     <View style={{flex:1}}>
//       <View style={{height:740}}></View>
//     <NavigationContainer >
    
//     <Tab.Navigator tabBarOptions={{
//     style: {position:'absolute',bottom:0,width:'100%'}
//     }}
//     screenOptions={({ route }) => ({
//     tabBarIcon: ({ focused, color, size }) => {
    
//     let iconName;
    
//     if (route.name === 'Screen1') {iconName = 'ios-home';}
//     else if (route.name === 'Screen2') {iconName = 'ios-settings';}
//     // Add more conditions for other screens
    
//     return (<Icon name={iconName} size={size} color={color} />);
//     },
//     })}>
//     <Tab.Screen name="Screen1" component={a}/>
//     <Tab.Screen name="Screen2" component={b}/>
//     <Tab.Screen name="Screen3" component={c}/>
//     <Tab.Screen name="Screen4" component={d}/>
//     <Tab.Screen name="Screeb5"component ={e}/>
  
//   </Tab.Navigator > 
//   </NavigationContainer > 
//   </View >
//   );
// }
// }


// import React from 'react';
// import { Text, View, ScrollView, StyleSheet, Button, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Tab = createBottomTabNavigator();

// function Screen1() {
//   return (
//     <View>
//       {/* Content for Screen 1 */}
//     </View>
//   )
// }

// function Screen2() {
//   return (
//     <View>
//       {/* Content for Screen 2 */}
//     </View>
//   )
// }

// function Screen3() {
//   return (
//     <View>
//       {/* Content for Screen 3 */}
//     </View>

//   )
// }

// function Screen4() {
//   return(
//     <View>
//        {/* *Content for Screen D */}
//     </View >
//   )
// } 

// function Screeb5(){
//   return(
//     <View >
//        {/* *Content for Screeb E */}
//     </View >
//   )
// } 

// export default function MyTabs() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator tabBarOptions={{ style: { position: 'absolute', bottom:0, width:'100%'} }}>
//         <Tab.Screen name="Screen1" component={Screen1} options={{
//           tabBarIcon: ({ color, size }) => (<Ionicons name='ios-home' size={size} color={color} />)
//         }} />
        
//         <Tab.Screen name="Screen2" component={Screen2} options={{
//           tabBarIcon: ({ color, size }) => (<Ionicons name='ios-settings' size={size} color={color}/>)
//            }} />

// <Tab.Screen name ="ScreebC"
// component ={Screen3}
// options={{tabBarLabel:"screeen3",tabBaricon:(props) =>
// (<Ionicons name={'md-paw'}size= {25}{...props}/>)}}/>

// </ Tab.Navigator > 
// </ NavigationContainer >

// );
// };


// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// function RootTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <View style={{flex:1}}>
//       <View style={{flex:1,top:100}}>
//         <Text>aaa</Text>
//       </View>

//       <View style={{flex:1, top:750}}>
//         <NavigationContainer>
//           <RootTabs />
//         </NavigationContainer>
//       </View>
//     </View>
//   );
// }


import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class MyTabs extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:10}}>
          <Text>view</Text>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity onPress={()=>{}}>
            <Text>a</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({})