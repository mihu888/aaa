import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
//import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  const [selectedTabIndex, setSelectedTabIndex] = useState(state.index);

  useEffect(() => {
    setSelectedTabIndex(state.index);
  }, [state.index]);

  const renderTabBarOption = (options, index) => {
    const focused = index === selectedTabIndex;
    const color = focused ? colors.primary : colors.text;
    const size = focused ? 26 : 20;
    const labelStyle = focused ? styles.focusedLabel : styles.unfocusedLabel;

    return (
      <TouchableOpacity
        key={options.title}
        onPress={() => {
          setSelectedTabIndex(index);
          navigation.navigate(state.routes[index].name);
        }}
        style={styles.tab}
      >
        {/* 图标容器，可以添加额外的图标样式 */}
        <View style={styles.iconContainer}>
          <Ionicons
            name={options.tabBarIcon({ focused, color, size }).props.name}
            size={size}
            color={color}
          />
        </View>
        {/* 文字容器，设置粉色背景 */}
        <View style={styles.labelContainer}>
          <Text style={[labelStyle, { marginTop: 6 }]}>{options.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

          return renderTabBarOption({ ...options, title: label }, index);
        })}
      </ScrollView>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    paddingBottom: 10, // Adjust as needed
  },
  tab: {
    flex: 1,
    flexDirection: 'column', // 改为垂直堆叠
    alignItems: 'center',
    justifyContent: 'flex-end', // 让图标和文字位于底部
    padding: 12,
  },
  iconContainer: {
    // 你可以在这里添加图标的样式，如果需要的话
  },
  labelContainer: {
    backgroundColor: 'pink', // 设置文字背景色为粉色
    paddingVertical: 5, // 根据需要调整文字背景色的垂直内边距
    paddingHorizontal: 15, // 根据需要调整文字背景色的水平内边距
    borderRadius: 10, // 可选：给文字背景添加圆角
  },
  focusedLabel: {
    fontSize: deviceWidth < 375 ? 12 : 14, // 聚焦时的文字大小，根据屏幕宽度调整
    fontWeight: 'bold',
    color: 'black', // 假设你希望聚焦时的文字在粉色背景上是黑色的
  },
  unfocusedLabel: {
    fontSize: deviceWidth < 375 ? 10 : 12, // 未聚焦时的文字大小，根据屏幕宽度调整
    fontWeight: 'normal',
    color: 'black', // 假设你希望未聚焦时的文字在粉色背景上是黑色的
  },
  scrollContent: {
    paddingHorizontal: 10, // 水平内边距
  },
});

export default CustomTabBar;