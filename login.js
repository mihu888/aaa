import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { settoken, gettoken, saveLoginInfo, setuser } from './globals';
import { useNavigation } from '@react-navigation/native'; 

//import { AuthContext } from './globals';

const AuthScreen = () => {

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  //const { setToken } = useContext(AuthContext);

  const handleAuthAction = () => {
    if (isLoginMode) {
      // 发送登录请求到后端API
      fetch('http://120.55.68.146:8089/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setuser(username)
          settoken(data.token);
          //setToken(userToken);
          saveLoginInfo(data.token, username);
          Alert.alert('登录成功！');
          navigation.navigate('main');
       } else {
           Alert.alert('用户名或密码错误');
       }
     })
     .catch(error => console.error(error));
   } else {
  
     if(password !== confirmPassword){
         Alert.alert("两次输入密码不一致，请重新输入");
         return;
     }
  
    //  // 检查用户名是否已存在
    //  fetch('https://api.example.com/checkUsername', { 
    //    method: 'POST',
    //    headers: { 
    //      'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify({ username })
    //  })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.exists) { // 用户名已存在
    //     Alert.alert("该用户名已被使用，请选择另一个");
    //   } else { // 用户名可用，继续注册操作
         fetch('http://120.55.68.146:8089/register/', { 
           method: 'POST',
           headers: { 
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({ username, password })
         })
        .then(response => response.json())
        .then(data => {
          if(!data.success){Alert.alert("该用户名已被使用，请选择另一个");}
          else{Alert.alert("注册成功")}
          console(data)
        })
        .catch(error => console.error(error));
    // }
    // }).catch(error=>console.error(error));
   }
  };

 return (
   <View style={{flex:1}}>
    <View style={{flex:1}}></View>
    <View style={{flex:10}}>
   	 <Text>账号:</Text>
 	 <TextInput value={username} onChangeText={setUsername} />
     
	 <Text>密码:</Text>
	 <TextInput secureTextEntry value={password} onChangeText={setPassword} />

   {!isLoginMode && (
	   <>
	   	  <Text>确认密码:</Text>
	      <TextInput secureTextEntry value={confirmPassword} onChangeText=  
{setConfirmPassword}/>
	   </>
   )}

	<Button title={isLoginMode ? "登录" : "注册"} onPress=    
{handleAuthAction}/>

	<Button title={isLoginMode ? "注册" : "返回登录"} onPress={()  => setIsLoginMode(!isLoginMode)} />
</View>
</View>);
};

export default AuthScreen;