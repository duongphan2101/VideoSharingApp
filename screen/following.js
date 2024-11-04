import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';

const MyVideos = () => {
    return (
        <FlatList
            data={dataFollowing}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.cardPeople}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={item.image} style={{height: 50, width: 50}}/>
                        <Text style={{marginLeft: 10}}>{item.name}</Text>
                    </View>
                    <View style={{borderWidth: .3, borderColor: 'black', padding: 10, borderRadius: 10}}>
                        <Text>Following</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{width: '100%', paddingHorizontal: 10, marginTop: 30, flex: 1}}
        />
    );
};

const MyImages = () => {
    return (
        <FlatList
            data={dataFollowing}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.cardPeople}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={item.image} style={{height: 50, width: 50}}/>
                        <Text style={{marginLeft: 10}}>{item.name}</Text>
                    </View>
                    <View style={{borderWidth: .3, borderColor: 'black', padding: 10, borderRadius: 10}}>
                        <Text>Following</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{width: '100%', paddingHorizontal: 10, marginTop: 30, flex: 1}}
        />
    );
};

const widthScreen = Dimensions.get('window').width;

const MyVideosTabView = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'videos', title: '368 followers' },
        { key: 'images', title: '456 following' },
    ]);

    const renderScene = SceneMap({
        videos: MyVideos,
        images: MyImages,
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

const dataGoiY = [
    { id: '1', name : 'Boby Sandoval', image: require('../assets/Follow/Avatar32.png')},
    { id: '2', name : 'Jenie Bonce', image: require('../assets/Follow/Avatar38.png')},
    { id: '3', name : 'Anja O` Connor', image: require('../assets/Follow/Avatar39.png')},
  ];

  const dataFollowing = [
    { id: '1', name : 'Kiran Glaucus', image: require('../assets/Follow/Avatar31.png')},
    { id: '2', name : 'Sally Rooney', image: require('../assets/Follow/Avatar32.png')},
    { id: '3', name : 'Marie Franco', image: require('../assets/Follow/Avatar36.png')},
    { id: '2', name : 'Jena Nguyen', image: require('../assets/Follow/Avatar35.png')},
    { id: '3', name : 'Kristin Watson', image: require('../assets/Follow/Avatar34.png')},
  ];

export default function App({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.leftHead}>
                    <Icon2 name='angle-left' size={30} color='black' onPress={() => navigation.goBack()}/>
                    <Image style={{ height: 50, width: 50, marginHorizontal: 10 }} source={require('../assets/MyProfile/Container71.png')}/>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Ruth Sanders</Text>
                </View>
                <View style={styles.leftHead}>
                    <Icon2 style={{ paddingHorizontal: 5 }} name='search' size={20} color='black'/>
                    <Icon2 style={{ paddingHorizontal: 5 }} name='bars' size={20} color='black'/>
                </View>
            </View>
            <MyVideosTabView/>
            <View style={{marginBottom: 20, height: 300}}>
                <Text style={{backgroundColor: '#E8E8E8', padding: 10}}>Suggestion for you</Text>
                <FlatList
                    data={dataGoiY}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.cardPeople}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={item.image} style={{height: 50, width: 50}}/>
                                <Text style={{marginLeft: 10}}>{item.name}</Text>
                            </View>
                            <View style={{padding: 10, borderRadius: 10, backgroundColor: '#00BFFF'}}>
                                <Text style={{color: 'white'}}>Follow</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{width: '100%', paddingHorizontal: 10, marginTop: 30}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 70
    },
    head: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scene: {
        height: 200
    },
    tabBar: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    indicator: {
        backgroundColor: 'pink',
        height: 2,
    },
    tabLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeTabLabel: {
        color: 'pink',
    },
    inactiveTabLabel: {
        color: 'gray',
    }, cardPeople : {
        padding: 10, 
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
