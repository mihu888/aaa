// authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储登录信息
export async function saveLoginInfo(userInfo) {
  try {
    const serializedUserInfo = JSON.stringify(userInfo);
    await AsyncStorage.setItem('loginInfo', serializedUserInfo);
  } catch (error) {
    console.error('Error saving login info:', error);
  }
}

// 获取登录信息
export async function getLoginInfo() {
  try {
    const loginInfoString = await AsyncStorage.getItem('loginInfo');
    if (loginInfoString !== null) {
      return JSON.parse(loginInfoString);
    }
    return null;
  } catch (error) {
    console.error('Error getting login info:', error);
    return null;
  }
}

// 删除登录信息
export async function clearLoginInfo() {
  try {
    await AsyncStorage.removeItem('loginInfo');
  } catch (error) {
    console.error('Error clearing login info:', error);
  }
}



let token = '';  
  
export const settoken = (variable) => {  
  token = variable;  
};  
  
export const gettoken = () => {  
  return token;  
};