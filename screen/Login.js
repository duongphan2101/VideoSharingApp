import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App({navigation}) {
  const [data, setData] = useState([]);
  const [current_user, setCurrent_user] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://172.20.10.9:3000/account');
      setData(response.data);
      setUser("")
      setPass("")
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
        navigation.navigate('App', { userData: checkAccount });
    }else{
      Alert.alert('Kiểm tra lại tài khoản và mật khẩu!');
    }
  };
  
  return (
    <View style={styles.container}>
      {/* <View style={styles.overlay}> */}
        <View style={styles.logo}>
          <Text style={{color: 'black', fontSize: 48, fontWeight: 'bold'}}>LOGIN</Text>
        </View>
        <View style={styles.viewInput}>
          <View style={styles.input}>
            <Icon name='user' size={30} color={'black'}/>
            <TextInput 
              style={styles.textInput} 
              placeholder='Username' 
              placeholderTextColor={'black'} 
              value={user} 
              onChangeText={setUser}
            />
          </View>
          <View style={styles.input}>
            <Icon name='lock' size={30} color={'black'}/>
            <TextInput 
              style={styles.textInput} 
              placeholder='Password' 
              secureTextEntry 
              placeholderTextColor={'black'} 
              value={pass} 
              onChangeText={setPass}
            />
          </View>

          <TouchableOpacity style={styles.Touch} onPress={handleLogin}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Login</Text>
          </TouchableOpacity>
{/* 
          <View style={styles.hr}/> */}

          {/* Uncomment the following if you need a Register option */}
          
          <TouchableOpacity style={{alignSelf: 'center', flexDirection: 'row', marginTop: 20}} onPress={()=> navigation.navigate('Register')}>
            <Text style={{fontSize: 13, color: 'black'}}>Register</Text>
            <AntDesign name="arrowright" size={16} color="black" style={{alignSelf: 'center', paddingHorizontal: 10}}/>
          </TouchableOpacity>
         
        </View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },
  logo: {
    padding: 20,
  },
  viewInput: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  input: {
    borderColor: 'black',
    borderWidth: .3,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    marginVertical: 10,
    color: 'black',
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
    paddingHorizontal: 10,
    color: 'black',
  },
  Touch: {
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 15,
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
  },
});
