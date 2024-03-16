import { Text, View, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';

const moreScreen = () =>{
    return (
        <SafeAreaView style={{flex:1}}>
          <LinearGradient 
            colors={['#FFC0CB', '#FFC0CB', '#FFFFFF', '#FFFFFF']} 
            locations={[0, 0.18, 0.27, 1]} // 控制各个颜色出现的位置
            style={{ flex: 1 }}
          >
            <View style={{flex:2, justifyContent:'flex-end'}}>
                <Text style={{
                textAlign:'center',
                fontSize :30,
                fontWeight :'bold',
                color :'black'}}>每日记账</Text>
            </View>
            <View style={{flex:1}}></View>
            <View style={{flex:16}}>
                <Text style={{textAlign:"center", color:'black'}}>更多内容正在开发中，敬请期待</Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      );
}

export default moreScreen;