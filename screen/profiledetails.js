import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState,  useEffect } from 'react';
import axios from 'axios';
const dataVideos = [
    { id: '1', image: require('../assets/ProfileDetails/Container86.png') },
    { id: '2', image: require('../assets/ProfileDetails/Container87.png') },
    { id: '3', image: require('../assets/ProfileDetails/Container88.png') },
    { id: '4', image: require('../assets/ProfileDetails/Container89.png') },
    { id: '5', image: require('../assets/ProfileDetails/Container90.png') },
    { id: '6', image: require('../assets/ProfileDetails/Container91.png') },
];

const widthScreen = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
const MyVideos = ({id}) => {
    const [videos, setVideos] = useState([]);
    const navigation = useNavigation();
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`http://192.168.1.5:3000/profilevideos?id=${id}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setVideos(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
  
    useEffect(() => {
        if (id) {
          fetchData(id); 
        }
     }, [id]);

    return (
      <FlatList
        data={videos}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoItem} onPress={()=> navigation.navigate('VideoDetails', {idPost: item.idPost, idUser: item.idUser, avatar: item.avatar})}>
            <Image style={{height: '100%', width: '100%', borderRadius: 10}} 
                source={{uri : 'https://pngmagic.com/product_images/black-background-for-youtube-thumbnail.jpg'}}/>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={{ alignItems: 'flex-start', marginTop: 10, justifyContent: 'flex-start', flex: 1}}
      />
    );
};


const MyLiked = () => {
    return (
        <FlatList
            data={dataVideos}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.videoItem}>
                    <Image source={item.image} />
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={{ alignItems: 'center', marginTop: 10 }}
        />
    );
};


const MyVideosTabView = ({id}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'videos', title: 'My Videos' },
        { key: 'liked', title: 'Liked' },
    ]);

    const renderScene = SceneMap({
        videos: () => <MyVideos id={id}/>,
        liked: MyLiked,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            renderLabel={({ route, focused }) => (
                <Text style={[styles.tabLabel, focused ? styles.activeTabLabel : styles.inactiveTabLabel]}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: widthScreen }}
        />
    );
};

export default function App({ navigation, route }) {
    const user = route.params.user;
    const my = route.params.my;
    const [isFollowing, setIsFollowing] = useState(false);
    const [data, setData] = useState({});
    const fetchData = async (id) => {
        try {
          const response = await axios.get(`http://192.168.1.5:3000/follow?id=${id}`);
          if (Array.isArray(response.data) && response.data.length > 0) {
            const followData = response.data[0];
            setData(followData);
            // console.log("my ", my.idUser)
            // console.log("user ", user.idUser)
            checkIsFollowing(my.idUser, user.idUser)
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

  useEffect(() => {
    if (user && user.idUser) {
      fetchData(user.idUser);
    }
  }, [user]);

  const checkIsFollowing = async (idFollowing, idFollowed) => {
      try {
          const response = await axios.get('http://192.168.1.5:3000/is-following', {
              params: {
                  id_following: idFollowing,
                  id_followed: idFollowed
              }
          });
  
          if (response.status === 200) {
              const isFollowing = response.data.isFollowing;
              setIsFollowing(isFollowing);
          } else {
              console.error("Lỗi khi kiểm tra trạng thái:", response.status);
              setIsFollowing(false);
          }
      } catch (error) {
          console.error("Lỗi khi gọi API2:", error);
          setIsFollowing(false);
      }
  };

  const follow = async (idFollowing, idFollowed) => {
    try {
        const response = await axios.post('http://192.168.1.5:3000/follow', {
            idFollowing: idFollowing,
            idFollowed: idFollowed,
        });

        if (response.status === 200) {
            setIsFollowing(true);
        } else {
            console.error("Lỗi khi thực hiện theo dõi:", response.status);
        }
    } catch (error) {
        console.error("Lỗi khi gọi API theo dõi:", error);
    }
};
const unfollow = async (idFollowing, idFollowed) => {
    try {
        const response = await axios.delete('http://192.168.1.5:3000/unfollow', {
            idFollowing: idFollowing,
            idFollowed: idFollowed,
        });

        if (response.status === 200) {
            setIsFollowing(false);
        } else {
            console.error("Lỗi khi thực hiện hủy theo dõi:", response.status);
        }
    } catch (error) {
        console.error("Lỗi khi gọi API hủy theo dõi:", error);
    }
};

  

    return (
        <View style={[styles.container]}>
            <View style={styles.head}>
                <View style={styles.leftHead}>
                    <Icon2 name='angle-left' size={30} color='black' onPress={() => navigation.goBack()} />
                </View>
                <View style={styles.leftHead}>
                    <TouchableOpacity><Icon2 style={{ paddingHorizontal: 5 }} name='bell-o' size={20} color='black' /></TouchableOpacity>
                    <TouchableOpacity><Icon2 style={{ paddingHorizontal: 5 }} name='bars' size={20} color='black' /></TouchableOpacity>
                </View>
            </View>

            <View style={styles.imgLogo}>
                <Image style={{ height: 150, width: 150, borderRadius: 150 }} source={{ uri: user.avatar }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', paddingVertical: 10 }}>{user.username}</Text>
            </View>


            <View style={{ flexDirection: 'row', marginTop: 0, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.fl} onPress={() => navigation.navigate('Following', {user: user})}>
                    <Text>{data.following_count || 0}</Text>
                    <Text style={styles.textgrey}>Following</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fl} onPress={() => navigation.navigate('Following', {user: user})}>
                    <Text>{data.followers_count || 0}</Text >
                    <Text style={styles.textgrey}>Followers</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fl}>
                    <Text>6031</Text>
                    <Text style={styles.textgrey}>Like</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity
                style={[
                    styles.fl,
                    {
                        backgroundColor: isFollowing ? 'white' : 'pink',
                        padding: 8,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: isFollowing ? 'pink' : 'transparent'
                    }
                ]}
                onPress={() => {
                    if (isFollowing) {
                        unfollow(my.idUser, user.idUser);
                    } else {
                        follow(my.idUser, user.idUser);
                    }
                }}
            >
                <Text style={{ color: isFollowing ? 'pink' : 'white' }}>
                    {isFollowing ? 'Following' : 'Follow'}
                </Text>
            </TouchableOpacity>


                <TouchableOpacity style={styles.fl}>
                    <Image source={require('../assets/ProfileDetails/Button20.png')} />
                </TouchableOpacity>

            </View>

            <MyVideosTabView id={user.idUser} />
            <View style={[styles.suggest]}>

                <TouchableOpacity style={styles.fl}>
                    <Image source={require('../assets/ProfileDetails/Suggestedaccounts.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.fl}>
                    <Image source={require('../assets/ProfileDetails/Viewmore.png')} />
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                <TouchableOpacity style={styles.fl}>
                    <Image source={require('../assets/ProfileDetails/Container83.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.fl}>
                    <Image source={require('../assets/ProfileDetails/Container84.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.fl}>
                    <Image source={require('../assets/ProfileDetails/Container85.png')} />
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
        paddingBottom: 20
    }, imgLogo: {
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: 10
    }, fl: {
        paddingHorizontal: 15,
        alignItems: 'center',
    }, textgrey: {
        color: 'grey',
    }, head: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftHead: {
        flexDirection: 'row',
        alignItems: 'center',
    }, suggest: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        width: '100%',
    }, tabViewContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    }, touchTabView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    }, videoItem: {
        width: widthScreen / 3,
        padding: 15,
    }, scene: {
        flex: 1
    }, tabBar: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    }, indicator: {
        backgroundColor: 'pink',
        height: 2,
    }, tabLabel: {
        fontSize: 16,
    }, activeTabLabel: {
        color: 'pink',
    }, inactiveTabLabel: {
        color: 'black',
    }
});
