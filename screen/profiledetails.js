import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import Following from './following';

const dataVideos = [
    { id: '1', image: require('../assets/ProfileDetails/Container86.png')},
    { id: '2', image: require('../assets/ProfileDetails/Container87.png')},
    { id: '3', image: require('../assets/ProfileDetails/Container88.png')},
    { id: '4', image: require('../assets/ProfileDetails/Container89.png')},
    { id: '5', image: require('../assets/ProfileDetails/Container90.png')},
    { id: '6', image: require('../assets/ProfileDetails/Container91.png')},
  ];

  const dataFollowing = [
    { id: '1', caption: 'Love is life color <3', name : 'Kiran Glaucus', image: require('../assets/Follow/Avatar31.png')},
    { id: '2', caption: 'fan 24kRight', name : 'Sally Rooney', image: require('../assets/Follow/Avatar32.png')},
    { id: '3', caption: 'this is the dogman', name : 'Marie Franco', image: require('../assets/Follow/Avatar36.png')},
    { id: '4', caption: 'im crazy', name : 'Jena Nguyen', image: require('../assets/Follow/Avatar35.png')},
    { id: '5', caption: 'nolove nolife', name : 'Kristin Watson', image: require('../assets/Follow/Avatar34.png')},
  ];

  const MyVideos = () => {
    return(
        <FlatList
            data={dataVideos}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.videoItem}>
                    <Image source={item.image}/>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={{alignItems: 'center', marginTop: 10}}
        />
    );
};


const MyLiked = () => {
    return(
        <FlatList
            data={dataVideos}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.videoItem}>
                    <Image source={item.image}/>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={{alignItems: 'center', marginTop: 10}}
        />
    );
};

const widthScreen = Dimensions.get('window').width;

const MyVideosTabView = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'videos', title: 'My Videos' },
        { key: 'liked', title: 'Liked' },
    ]);

    const renderScene = SceneMap({
        videos: MyVideos,
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
            initialLayout={{width: widthScreen}}
        />
    );
};

export default function App({ navigation, route }) {
    
    const id = route.params.userID;
    const filteredData = dataFollowing.filter(item => item.id === id);
    return (
        <View style={[styles.container]}>
            <View style={styles.head}>
                <View style={styles.leftHead}>
                    <Icon2 name='angle-left' size={30} color='black' onPress={() => navigation.goBack()}/>
                </View>
                <View style={styles.leftHead}>
                    <TouchableOpacity><Icon2 style={{ paddingHorizontal: 5 }} name='bell-o' size={20} color='black'/></TouchableOpacity>
                    <TouchableOpacity><Icon2 style={{ paddingHorizontal: 5 }} name='bars' size={20} color='black'/></TouchableOpacity>
                </View>
            </View>
           <FlatList
                data={filteredData}
                contentContainerStyle={{height: 50}}
                renderItem={({item})=> (
                    <View style={styles.imgLogo}>
                        <Image style={{ height: 150, width: 150 }} source={item.image} />
                        <Text style={{ fontSize: 24, fontWeight: 'bold', paddingVertical: 10}}>{item.name}</Text>
                        <Text style={{ fontSize: 16}}>{item.caption}</Text>                      
                    </View>
                )}
                keyExtractor={item => item.id}
           />
           <View style={{ flexDirection: 'row', marginTop: 0, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.fl}>
                                <Text>203</Text>
                                <Text style={styles.textgrey}>Following</Text>
                            </TouchableOpacity>
        
                            <TouchableOpacity style={styles.fl}>
                                <Text>628</Text>
                                <Text style={styles.textgrey}>Followers</Text>
                            </TouchableOpacity>
        
                            <TouchableOpacity style={styles.fl}>
                                <Text>6031</Text>
                                <Text style={styles.textgrey}>Like</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'center'}}>

                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Button21.png')}/>
                            </TouchableOpacity>
        
                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Button20.png')}/>
                            </TouchableOpacity>

                        </View>
                        
           <MyVideosTabView/>
           <View style={[styles.suggest]}>
    
                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Suggestedaccounts.png')}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Viewmore.png')}/>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 0 }}>
                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Container83.png')}/>
                            </TouchableOpacity>
        
                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Container84.png')}/>
                            </TouchableOpacity>
        
                            <TouchableOpacity style={styles.fl}>
                                <Image source={require('../assets/ProfileDetails/Container85.png')}/>
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
        marginTop: 30,
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
    }, suggest : {
        flexDirection: 'row', 
        marginTop: 15 , 
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
    }, touchTabView : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    }, videoItem : {
        width: widthScreen / 3,
        padding: 15
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
