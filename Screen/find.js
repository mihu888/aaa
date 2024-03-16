import React from 'react';  
import { View, Text, StyleSheet } from 'react-native';  
  
const Screen1 = () => {  
  return (  
    <View style={styles.container}>  
      <View style={styles.header}>  
        <Text style={styles.headerText}>每日记账</Text>  
      </View>  
      <View>  
        <Text>这是屏幕4</Text>  
      </View>  
    </View>  
  );  
};  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    // 其他全局样式，如果需要的话  
  },  
  header: {  
    // 确保 header 贴顶  
    alignItems: 'center',  
    justifyContent: 'center',  
    height: 150, // 根据需要调整高度  
    backgroundColor: 'pink', // 可以添加背景色，以便看到它的边界  
  },  
  headerText: {  
    fontSize: 24, // 字体大小，根据需要调整  
    fontWeight: 'bold', // 字体加粗  
    color: 'black', // 如果背景色深，可能需要设置文字颜色  
  },  
});  
  
export default Screen1;