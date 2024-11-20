import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function App({navigation}) {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.141:3000/account');
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");

  const regis = () => {
    console.log("accname "+user)
    console.log("pass "+pass)
    console.log("User name "+ name)
    console.log("sdt "+sdt)
    console.log("email "+email)
  }
  const InsertUser = async () => {
    try {
      const response = await axios.post('http://192.168.1.141:3000/register', {
        username: name,
        sdt, 
        email, 
        accname: user,
        pass
      });
  
      if (response.status === 201) {
        Alert.alert("Thành công", "Tạo tài khoản thành công");
        navigation.navigate('Login');
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo tài khoản");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      Alert.alert("Lỗi", "Không thể kết nối tới máy chủ.");
    }
  };
  
  return (
    <ImageBackground source={require('../assets/bgL.png')} resizeMode='cover' style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.logo}>
          <Text style={{color: 'pink', fontSize: 32, fontWeight: 'bold'}}>Nice to meet you!</Text>
        </View>
        <View style={styles.viewInput}>
          <View style={[{width: '50%'},styles.input]}>
            <Icon name='user' size={30} color={'pink'}/>
            <TextInput 
              style={styles.textInput} 
              placeholder='Username' 
              placeholderTextColor={'pink'} 
              value={user} 
              onChangeText={setUser}
            />
          </View>
          <View style={[{width: '48%'},styles.input]}>
            <Icon name='lock' size={30} color={'pink'}/>
            <TextInput 
              style={styles.textInput} 
              placeholder='Password' 
              secureTextEntry 
              placeholderTextColor={'pink'} 
              value={pass} 
              onChangeText={setPass}
            />
          </View>
        </View>
        <View style={styles.viewInput}>
          <View style={[{width: '100%'},styles.input]}>
            <AntDesign name="user" size={20} color="pink" />
            <TextInput 
              style={styles.textInput} 
              placeholder='Your name' 
              placeholderTextColor={'pink'} 
              value={name} 
              onChangeText={setName}
            />
          </View>
          
        </View>

        <View style={styles.viewInput}>
          <View style={[{width: '100%'},styles.input]}>
            <Fontisto name="email" size={24} color="pink" />
            <TextInput 
              style={styles.textInput} 
              placeholder='Your email' 
              placeholderTextColor={'pink'} 
              value={email} 
              onChangeText={setEmail}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder='Your email' 
              placeholderTextColor={'pink'} 
              value='@gmail.com' 
              editable={false}
            />
          </View>
          
        </View>

        <View style={styles.viewInput}>
          <View style={[{width: '100%'},styles.input]}>
            <AntDesign name="phone" size={20} color="pink" />
            <TextInput 
              style={styles.textInput} 
              placeholder='Your Phone' 
              placeholderTextColor={'pink'} 
              value={sdt} 
              onChangeText={setSdt}
            />
          </View>
          
        </View>

          <TouchableOpacity style={styles.Touch} onPress={InsertUser}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Register</Text>
          </TouchableOpacity>

          <View style={styles.hr}/>
     
          <TouchableOpacity style={{alignItems: 'flex-start', flexDirection: 'row', paddingHorizontal: 20, width: '100%'}} onPress={()=> navigation.navigate('Login')}>
          <AntDesign name="arrowleft" size={16} color="white" style={{alignSelf: 'center', paddingHorizontal: 10}}/>
            <Text style={{fontSize: 13, color: 'white'}}>Login</Text>

          </TouchableOpacity>
         
          {/* <Text style={{fontSize: 11, color: 'white', position: 'absolute', bottom: 10, alignSelf: 'center'}}>Cre: PN2D2101</Text> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },
  logo: {
    padding: 20,
  },
  viewInput: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderColor: 'pink',
    borderWidth: .3,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    color: 'pink',
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
    paddingHorizontal: 10,
    color: 'pink',
  },
  Touch: {
    padding: 20,
    backgroundColor: 'pink',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 15,
    width: '100%',
    marginHorizontal: 20
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: 'pink',
    marginVertical: 20,
  },
});
