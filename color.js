import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient 
        colors={['#FFC0CB', '#FFC0CB', '#FFFFFF', '#FFFFFF']} 
        locations={[0, 0.18, 0.27, 1]} // 控制各个颜色出现的位置
        style={{ flex: 1 }}
      >
        {/* 这里是你想要放置在背景上的内容 */}
        <Text>这是一个上为粉色，下为白色，在中间渐变的背景文本</Text>
      </LinearGradient>
    </View>
  );
};

export default GradientComponent;