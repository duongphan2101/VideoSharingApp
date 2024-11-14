import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';


  const dataFollowing = [
    { id: '1', caption: 'Love is life color <3', name : 'Kiran Glaucus', image: require('../assets/Follow/Avatar31.png')},
    { id: '2', caption: 'fan 24kRight', name : 'Sally Rooney', image: require('../assets/Follow/Avatar32.png')},
    { id: '3', caption: 'this is the dogman', name : 'Marie Franco', image: require('../assets/Follow/Avatar36.png')},
    { id: '4', caption: 'im crazy', name : 'Jena Nguyen', image: require('../assets/Follow/Avatar35.png')},
    { id: '5', caption: 'nolove nolife', name : 'Kristin Watson', image: require('../assets/Follow/Avatar34.png')},
  ];

export default function App({ navigation}) {
    
    return (
        <View style={[styles.container]}>
            {/* <View style={styles.head}>
                <View style={styles.leftHead}>
                    <Icon2 name='angle-left' size={30} color='black' onPress={() => navigation.goBack()}/>
                </View>
                <View style={styles.leftHead}>
                    <TouchableOpacity><Icon2 style={{ paddingHorizontal: 5 }} name='bell-o' size={20} color='black'/></TouchableOpacity>
                    <TouchableOpacity><Icon2 style={{ paddingHorizontal: 5 }} name='bars' size={20} color='black'/></TouchableOpacity>
                </View>
            </View> */}

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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10, 
        backgroundColor: 'black'
    }
});
