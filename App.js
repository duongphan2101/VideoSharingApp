// App.js
import React from 'react';
import { View,StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon2 from 'react-native-vector-icons/FontAwesome.js';
import Icon3 from 'react-native-vector-icons/Entypo.js';
import HomeScreen from './screen/home.js';
import SearchScreen from './screen/home.js';
import FriendsScreen from './screen/home.js';
import ProfileScreen from './screen/home.js';
import videoStreaming from './screen/videoStreaming.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarActiveTintColor: 'pink',
      tabBarInactiveTintColor: 'black',
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Video Sharing App</Text>
              <Icon2 name="bell-o" size={25} color="black" />
            </View>
          ),
          tabBarIcon: ({ color }) => <Icon2 name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon2 name="search" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Plus"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon3 name="circle-with-plus" size={35} color={color} />,
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon2 name="users" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon2 name="user-circle-o" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='VideoSharingApp' screenOptions={{headerShown: false}}>
        <Stack.Screen 
            name='VideoSharingApp' 
            component={TabNavigator}
          />
        <Stack.Screen 
            name='VideoStreaming' 
            component={videoStreaming}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: .3,
    paddingTop: 40
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})