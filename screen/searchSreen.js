import { Alert, Dimensions, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const widthScreen = Dimensions.get('window').width;
export default function App({ navigation }) {
    const [result, setResult] = useState([]);
    const [keyword, setKeyword] = useState();
    
    const fetchData = async()=> {
       try {
           const response = await axios.get(`http://192.168.1.140:3000/search`);
           setResult(response.data);
       } catch (error) {
           console.log("Lỗi khi search", error);
           Alert.alert("Lỗi khi search ",error.message);
       }
    };

    const fetchDataSearch = async (keyword) => {
        try {
            const response = await axios.get('http://192.168.1.140:3000/searchKeyWord', {
                params: { keyword }
            });
            setResult(response.data);
        } catch (error) {
            console.log("Lỗi khi tìm kiếm", error);
            Alert.alert("Lỗi khi tìm kiếm", error.message);
        }
    };

    const handleSearch = (text) => {
        setKeyword(text);
        fetchDataSearch(text);
    };
   
    useEffect(() => {
       fetchData();
   }, []);

    return (
        <View style={styles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.head}>
            <View style={styles.input}>
                    <TextInput
                        style={{ flex: 1 }}
                        textContentType='search'
                        placeholder='search ...'
                        value={keyword}
                        onChangeText={handleSearch}
                    />
                    <Icon name='close' color='black' size={20} onPress={() => setKeyword('')} />
                </View>
                <TouchableOpacity style={{paddingHorizontal: 10}}><Icon name='navicon' color='black' size={30}/></TouchableOpacity>
            </View>

            <View style={[styles.head, {justifyContent: 'space-between', paddingVertical: 10}]}>
                <TouchableOpacity style={{backgroundColor: '#FF1493', padding: 10, borderRadius: 20}}>
                    <Text style={{color: 'white', fontSize: 15}}>Trending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 10}}>
                    <Text style={{color: '#FF1493', fontSize: 15}}>Accounts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 10}}>
                    <Text style={{color: '#FF1493', fontSize: 15}}>Streaming</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 10}}>
                    <Text style={{color: '#FF1493', fontSize: 15}}>Audio</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={result}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity style={{width: 200, height: 300, padding: 10, position: 'relative'}}
                        onPress={()=> navigation.navigate('VideoDetails', {idPost: item.idPost, idUser: item.idUser, avatar: item.avatar})}>
                        <Image source={{uri : 'https://pngmagic.com/product_images/black-background-for-youtube-thumbnail.jpg'}}
                         style={{alignSelf: 'center', height: '75%', width: '100%', borderRadius: 15}}/>
                        <Text style={{paddingVertical: 10, marginLeft: 10}}>{item.content}</Text>
                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                            <Image style={{height: 30, width: 30, borderRadius: 50}} source={{uri:item.avatar}}/>
                            <Text style={{paddingHorizontal: 10}}>{item.username}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.idPost}
                numColumns={2}
                contentContainerStyle={{width: widthScreen, paddingHorizontal: 10, alignItems: 'flex-start'}}
            />

            <TouchableOpacity style={styles.showmore}>
                <Text style={{color: '#FF1493'}} >Show more</Text>
                <Icon style={{color: '#FF1493'}} name='chevron-down' color='black' size={20}/>
            </TouchableOpacity>
            
            <Text style={styles.maybe}>Maybe you're interesting</Text>

            <View style={styles.sussgestion}>
                <TouchableOpacity style={{backgroundColor: '#BFEFFF', padding: 10, borderRadius: 20, margin: 10}}>
                    <Text style={{color: '#87CEFF', fontSize: 15}}>Funny momment of pet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#BFEFFF', padding: 10, borderRadius: 20 , margin: 10}}>
                    <Text style={{color: '#87CEFF', fontSize: 15}}>Cats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#BFEFFF', padding: 10, borderRadius: 20 , margin: 10}}>
                    <Text style={{color: '#87CEFF', fontSize: 15}}>Dogs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#BFEFFF', padding: 10, borderRadius: 20 , margin: 10}}>
                    <Text style={{color: '#87CEFF', fontSize: 15}}>Food for pet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#BFEFFF', padding: 10, borderRadius: 20 , margin: 10}}>
                    <Text style={{color: '#87CEFF', fontSize: 15}}>Vet Center</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    }, head : {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    }, input : {
        backgroundColor: '#E8E8E8',
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        borderRadius: 5
    }, showmore : {alignSelf: 'center', flexDirection: 'row', padding: 10, paddingBottom: 30

    },sussgestion : {
        paddingHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }, maybe : {paddingVertical: 10, paddingHorizontal: 10, fontSize: 18, fontWeight: 'bold'}

});
