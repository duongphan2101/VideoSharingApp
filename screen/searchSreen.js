import { Dimensions, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useState } from 'react';

const data = [
    { id: '1', name : 'Laura', avatar: require('../assets/SearchVideo/Avatar13.png'), background: require('../assets/SearchVideo/Container40.png'),
        caption: 'excuti clizser dog myzs vnsqer csavn cas utikcs'
    },
    { id: '2', name : 'Liz', avatar: require('../assets/SearchVideo/Avatar14.png'), background: require('../assets/SearchVideo/Container41.png'),
        caption: 'excuti clizser dog myzs vnsqer csavn cas utikcs'
    },
    { id: '3', name : 'Cris', avatar: require('../assets/SearchVideo/Avatar15.png'), background: require('../assets/SearchVideo/Container43.png'),
        caption: 'excuti clizser dog myzs vnsqer csavn cas utikcs'
    },
    { id: '4', name : 'Lina', avatar: require('../assets/SearchVideo/Avatar16.png'), background: require('../assets/SearchVideo/Container44.png'),
        caption: 'excuti clizser dog myzs vnsqer csavn cas utikcs'
    },
]
const widthScreen = Dimensions.get('window').width;
export default function App({ navigation }) {
    return (
        <View style={styles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.head}>
                <View style={styles.input}>
                    <TextInput style={{flex: 1}} textContentType='seach' placeholder='search ...' value='Pet'/>
                    <Icon name='close' color='black' size={20}/>
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
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity style={{width: widthScreen/2, padding: 10}}>
                        <Image source={item.background} style={{alignSelf: 'center'}}/>
                        <Text style={{paddingVertical: 10}}>{item.caption}</Text>
                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                            <Image source={item.avatar}/>
                            <Text style={{paddingHorizontal: 10}}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={{width: '100%', paddingHorizontal: 10, alignItems: 'center'}}
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
