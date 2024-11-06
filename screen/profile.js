import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import Following from './following';

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

const MyImages = () => {
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

const dataVideos = [
    { id: '1', image: require('../assets/MyProfile/Container72.png')},
    { id: '2', image: require('../assets/MyProfile/Container73.png')},
    { id: '3', image: require('../assets/MyProfile/Container74.png')},
    { id: '4', image: require('../assets/MyProfile/Container75.png')},
    { id: '5', image: require('../assets/MyProfile/Container76.png')},
    { id: '6', image: require('../assets/MyProfile/Container77.png')},
    { id: '7', image: require('../assets/MyProfile/Container78.png')},
    { id: '8', image: require('../assets/MyProfile/Container79.png')},
    { id: '9', image: require('../assets/MyProfile/Container80.png')},
  ];

const widthScreen = Dimensions.get('window').width;

const MyVideosTabView = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'videos', title: 'My Videos' },
        { key: 'images', title: 'My Images' },
        { key: 'liked', title: 'Liked' },
    ]);

    const renderScene = SceneMap({
        videos: MyVideos,
        images: MyImages,
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

export default function App({ navigation }) {
    return (
        <View style={[styles.container]}>
            <View style={styles.imgLogo}>
                <Image style={{ height: 150, width: 150 }} source={require('../assets/MyProfile/Container71.png')} />
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Ruth Sanders</Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity style={styles.fl} onPress={()=>navigation.navigate('Following')}>
                        <Text>203</Text>
                        <Text style={styles.textgrey}>Following</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fl} onPress={()=>navigation.navigate('Following')}>
                        <Text>628</Text>
                        <Text style={styles.textgrey}>Followers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fl}>
                        <Text>6031</Text>
                        <Text style={styles.textgrey}>Like</Text>
                    </TouchableOpacity>
                </View>
                    
            </View>
            <MyVideosTabView/>

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
        paddingBottom: 20
    }, fl: {
        paddingHorizontal: 15,
        alignItems: 'center',
    }, textgrey: {
        color: 'grey',
    }, scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
