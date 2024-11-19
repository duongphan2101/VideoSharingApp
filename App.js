// App.js
import React from 'react';
import { View,StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon2 from 'react-native-vector-icons/FontAwesome.js';
import Icon3 from 'react-native-vector-icons/Entypo.js';
import HomeScreen from './screen/home.js';
import SearchScreen from './screen/searchSreen.js';
import FriendsScreen from './screen/friends.js';
import ProfileScreen from './screen/profile.js';
import videoStreaming from './screen/videoStreaming.js';
import login from './screen/Login.js'
import Register from './screen/Register.js'
import post from './screen/Post_Video_Screen.js';
import plus from './screen/Create_Video.js';
import Following from './screen/following.js';
import profileDetails from './screen/profiledetails.js';
import videoDetails from './screen/videoDetails.js';
import editProfile from './screen/EditProfile.js';
import ImageView from './screen/ImageView.js';
import ImageStreaming from './screen/imageStreaming.js';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({navigation, route}) {
  const { userData } = route.params;
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarActiveTintColor: 'pink',
      tabBarInactiveTintColor: 'black',
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ userData }}
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
        initialParams={{ userData }}
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon2 name="search" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Plus"
        initialParams={{ userData }}
        component={plus}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon3 name="circle-with-plus" size={35} color={color} />,
        }}
      />
      <Tab.Screen
        name="Friends"
        initialParams={{ userData }}
        component={FriendsScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ color }) => <Icon2 name="users" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{ userData }}
        component={ProfileScreen}
        options={{
          header: () => (
            <View style={styles.headerProflieContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon2 style={{ paddingHorizontal: 10 }} name="navicon" size={20} color="black" onPress={()=> navigation.navigate('Login')}/>
                    <Icon2 style={{ paddingHorizontal: 10 }} name="user-plus" size={20} color="black" />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=> navigation.navigate('EditProfile', {user: userData})}>
                    <Icon2 style={{ color: 'pink', paddingHorizontal: 5 }} name="pencil" size={20} />
                    <Text style={{ color: 'pink', paddingHorizontal: 5 }}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({ color }) => <Icon2 name="user-circle-o" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen 
            name='Login' 
            component={login}
            options={{
              headerShown: false}}
          />
          <Stack.Screen 
            name='Register' 
            component={Register}
            options={{
              headerShown: false}}
          />
        <Stack.Screen 
            name='VideoSharingApp' 
            component={TabNavigator}
            options={{
              headerShown: false}}
          />
        <Stack.Screen 
            name='VideoStreaming'
            component={videoStreaming}
            options={{
              headerShown: false}}
        />
        <Stack.Screen 
            name='Following' 
            component={Following}
            options={{
              headerShown: false}}
        />
        <Stack.Screen 
            name='ProfileDetails' 
            component={profileDetails}
            options={{
              headerShown: false}}
        />
        <Stack.Screen 
            name='Post' 
            component={post}
            options={{
              headerShown: false}}
        />
        <Stack.Screen 
            name='VideoDetails' 
            component={videoDetails}
            options={{
              headerShown: false}}
        />
        <Stack.Screen 
            name='EditProfile' 
            component={editProfile}
            options={{
              headerTitle:""
            }}
        />
        <Stack.Screen 
            name='ImageView' 
            component={ImageView}
            options={{
              headerTitle:""
            }}
        />
        <Stack.Screen 
            name='New Feed' 
            component={ImageStreaming}
            // options={{
            //   headerTitle:""
            // }}
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
  }, headerProflieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'white',
}
})

