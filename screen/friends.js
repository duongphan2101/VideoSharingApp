import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState, useEffect } from 'react';
import axios from 'axios';
const widthScreen = Dimensions.get('window').width;
export default function App({ navigation, route}) {
    const user = route.params.userData;

    const [suggest, setSuggest] = useState([]);

    const fetchData = async (id) => {
        try {
          const response = await axios.get(`http://192.168.1.140:3000/suggest?id=${id}`);
          if (Array.isArray(response.data) && response.data.length > 0) {
            setSuggest(response.data);
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        }
      };
    
      useEffect(() => {
        if (user.idUser) {
          fetchData(user.idUser); 
        }
      }, [user.idUser]);

    return (
        <View style={[styles.container]}>

            <View style={styles.troppin}>
                <Text style={{fontSize: 24, paddingVertical: 20, color: 'white'}}>
                    Nothing
                </Text>
                <Text style={{fontSize: 17 , color: 'white'}}>
                    Follow your friends to see more content from them
                </Text>
            </View>
           
           <View style={[styles.suggest]}>
    
                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Suggestedaccounts.png')}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Viewmore.png')}/>
                            </TouchableOpacity>

                        </View>
                        <FlatList
                            data={suggest}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                            <TouchableOpacity style={{width: widthScreen/3, height: 180, padding: 10}} 
                                onPress={() => navigation.navigate('ProfileDetails', { user: item, my: user })}>
                                <Image style={{height: '100%', width: '100%', resizeMode: 'contain'}} 
                                    source={{uri : item.avatar}}/>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 5}}>{item.username}</Text>
                            </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={3}
                            contentContainerStyle={{ alignItems: 'flex-start', marginTop: 10, justifyContent: 'flex-start' }}
                        />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }, imgLogo: {
        alignItems: 'center',
        marginTop: 30,
    }, fl: {
        paddingHorizontal: 15,
        alignItems: 'center',
    }, textgrey: {
        color: 'grey',
    }, head: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    leftHead: {
        flexDirection: 'row',
        alignItems: 'center',
    }, suggest : {
        flexDirection: 'row', 
        marginTop: 15 , 
        justifyContent: 'space-between', 
        padding: 10,
        alignItems: 'center',
        width: '100%',
    }, troppin : {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10, 
        backgroundColor: 'black',
        height: '60%'
    }
});
