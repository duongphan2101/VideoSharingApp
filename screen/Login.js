import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';

import { useState, useEffect } from 'react';
export default function App({navigation}) {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.151:3000/account');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    const checkAccount = data.find(item => item.account_user === user && item.pass === pass);
      if(checkAccount){
        navigation.navigate('VideoSharingApp', {userData: checkAccount });
    }else{
      Alert.alert('Kiểm tra lại tài khoản và mật khẩu!');
    }
  };
  
  return (
    <View style={styles.container}>
        <View style={styles.logo}>
            <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold'}}>Wellcome Back!</Text>
        </View>
        <View style={styles.viewInput}>
            <View style={styles.input}>
                <Icon name='user' size={30} color={'white'}/>
                <TextInput style={{marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'white'}} placeholder='user name'
                 placeholderTextColor={'white'} value={user} onChangeText={setUser}/>
            </View>
            <View style={styles.input}>
                <Icon name='lock' size={30} color={'white'}/>
                <TextInput style={{marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'white'}} placeholder='password'
                 secureTextEntry placeholderTextColor={'white'} value={pass} onChangeText={setPass}/>
            </View>

            <TouchableOpacity style={styles.Touch} onPress={handleLogin}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Login</Text>
            </TouchableOpacity>

            <View style={styles.hr}/>

            {/* <TouchableOpacity style={{alignItems: 'center'}} onPress={()=> navigation.navigate('Register')}>
                <Text style={{fontSize: 13, color: 'white'}}>Register</Text>
            </TouchableOpacity> */}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }, logo: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  }, viewInput: {
    paddingVertical: 20,
    paddingHorizontal: 10
  }, input: {
    borderColor: 'white',
    borderWidth: .3,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    marginVertical: 10,
    color: 'white'
  }, Touch : {
    padding: 20,
    backgroundColor: '#474693',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 15
  }, hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});
