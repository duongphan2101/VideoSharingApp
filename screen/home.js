import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { Video } from 'expo-av';
import axios from 'axios';

const dataTopTrending = [
  { id: '1', image: require('../assets/Home_Video_Listing/Container3.png'), marginLeft: -10 },
  { id: '2', image: require('../assets/Home_Video_Listing/Container15.png'), marginLeft: 0 },
  { id: '3', image: require('../assets/Home_Video_Listing/Container16.png'), marginLeft: 0 },
];
const dataAudio = [
  { 
    id: '1', 
    containerImage: require('../assets/Home_Video_Listing/Image7.png'),
    TitleImage: require('../assets/Home_Video_Listing/Perfectlady.png'),
    creImage: require('../assets/Home_Video_Listing/Bookcase.png'),
  },
  { 
    id: '2', 
    containerImage: require('../assets/Home_Video_Listing/Image8.png'),
    TitleImage: require('../assets/Home_Video_Listing/Experience.png'),
    creImage: require('../assets/Home_Video_Listing/Lifestyle.png'),

  },
  { 
    id: '3', 
    containerImage: require('../assets/Home_Video_Listing/Image9.png'),
    TitleImage: require('../assets/Home_Video_Listing/Yourself.png'),
    creImage: require('../assets/Home_Video_Listing/Bookcase.png'),

  },
  { 
    id: '4', 
    containerImage: require('../assets/Home_Video_Listing/Image10.png'),
    TitleImage: require('../assets/Home_Video_Listing/Experience.png'),
    creImage: require('../assets/Home_Video_Listing/Lifestyle.png'),

  },
];

export default function App({ navigation, route }) {
    const user  = route.params.userData;
    const [images, setImages] = useState([]);
    const [stories, setStory] = useState([]);
    const [user1, setUser] = useState();

    const fetchDataUser = async () => {
      try {
        const response = await axios.get(`http://192.168.1.141:3000/data?id=${user.idUser}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.141:3000/imageStreaming4`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setImages(response.data);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    const fetchStories = async () => {
      try {
        const response = await axios.get('http://192.168.1.141:3000/Userstories');
        setStory(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
        Alert.alert('Lỗi', 'Không thể lấy danh sách story');
      }
    };

    useEffect(() => {
      fetchDataUser();
      fetchData();
      fetchStories();

    }, []);

// Hàm renderItem cho phần Stories
const renderItem1 = ({ item }) => {
  const maxLength = 7;
  const displayName =
    item.username.length > maxLength
      ? item.username.slice(0, maxLength) + '...'
      : item.username;

  return (
    <TouchableOpacity
      style={styles.padTouch}
      onPress={() => navigation.navigate('StoryDetails', { userData: user })}
    >
      <Image
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          borderWidth: 3,
          borderColor: '#0099FF',
        }}
        source={{ uri: item.avatar }}
      />
      <Text style={styles.username}>{displayName}</Text>
    </TouchableOpacity>
  );
};


  // Hàm renderItem
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.padTouch, { marginLeft: item.marginLeft }]} onPress={()=>navigation.navigate('VideoStreaming', {userData: user})}>
      <Image source={item.image} />
    </TouchableOpacity>
  );

    // Hàm renderItem cho phần audio
    const renderItem2 = ({ item }) => (
      <TouchableOpacity style={{paddingHorizontal: 10}}>
        <Image source={item.containerImage} />
        <Image source={item.TitleImage} />
        <Image source={item.creImage} />
      </TouchableOpacity>
    );

      // Hàm renderAnh
  const renderAnh = ({ item }) => (
    <TouchableOpacity style={{padding: 10}} onPress={()=> {navigation.navigate('New Feed', {userData: user})}}>
       <Image style={{height: 120, width: 100, borderRadius: 10, resizeMode: 'contain'}} source={{uri : item.url}}/>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container} vertical={true} showsVerticalScrollIndicator={false}>

    {/* Story Section */}
    <SafeAreaView style={styles.listStory}>
      <TouchableOpacity style={{alignItems: 'center'}} onPress={()=> navigation.navigate('CreateStory', {userData: user})}>
        <Image style={{height: 50, width: 50, borderRadius: 50}} source={{uri: user.avatar}} />
        <Text>You</Text>
      </TouchableOpacity>

      <FlatList
        data={stories}
        renderItem={renderItem1}
        keyExtractor={item => item.idPost}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>

    {/* Top Trending Section */}
    <SafeAreaView style={{ marginTop: 15,marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Top trending</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('VideoStreaming', {userData: user})}>
          <Image source={require('../assets/Home_Video_Listing/Button1.png')}/>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataTopTrending}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </SafeAreaView>

    {/* Browse Section */}
    <View style={{ marginTop: 25, marginBottom: 20}}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Browse topic</Text>
      <View style={[styles.viewTopic, {marginTop: 10}]}>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Container4.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Container5.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Container6.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Container7.png')} />
        </TouchableOpacity>
      </View>
      <View style={[styles.viewTopic, {marginTop: 10}]}>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Container8.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Container9.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Container10.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Container36.png')} />
        </TouchableOpacity>
      </View>
    </View>

    {/* Streaming Section */}
    <SafeAreaView style={{ marginTop: 20, marginBottom: 20}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Images</Text>
        <TouchableOpacity onPress={()=> {navigation.navigate('New Feed', {userData: user1})}}>
          <Image source={require('../assets/Home_Video_Listing/Button1.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={images}
        renderItem={renderAnh}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </SafeAreaView>

    {/* Audio Section */}
    <SafeAreaView style={{ marginTop: 20, marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Audio</Text>
        <TouchableOpacity>
          <Image source={require('../assets/Home_Video_Listing/Button1.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataAudio}
        renderItem={renderItem2}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </SafeAreaView>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 15,
  },
  listStory: {
    paddingVertical: 15,
    flexDirection: 'row',
  },
  padTouch: {
    paddingHorizontal: 10,
    alignItems: 'center',
  }, 
  viewTopic : {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nav : {
    marginTop: 20, 
    marginBottom: 12,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderTopColor: 'grey',
    borderTopWidth: .5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});