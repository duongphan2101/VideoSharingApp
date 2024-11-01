import React, { useRef } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const post = [
  {
    id: '1',
    video: 'https://imgur.com/fg0Dwnr.mp4',
    caption: 'I can fix that',
    hagtag: '#movie, #cypher105',
    music: 'afterhours - the Weeknd'
  },
  {
    id: '2',
    video: 'https://imgur.com/3sctqTx.mp4',
    caption: 'I can fix that',
    hagtag: '#movie, #cypher105',
    music: 'afterhours - the Weeknd'
  },
];

// const post =   {
//     id: '1',
//     video: 'https://imgur.com/fg0Dwnr.mp4',
//     caption: 'I can fix that',
//     hagtag: '#movie, #cypher105',
//     music: 'afterhours - the Weeknd'
//   }

export default function VideoStreaming({ navigation }) {
    const video = useRef<Video>(null);
  const renderVideo = ({ item }) => (
    <View style={styles.videoContainer}>
        <Video
            ref={video}
            source={{ uri: item.video }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
        />
        <View style={styles.boxIcon}>
            <Icon2 style={styles.iconRight} name="heart-o" size={30} color="white" />
            <Icon2 style={styles.iconRight} name="comment-o" size={30} color="white" />
            <Icon2 style={styles.iconRight} name="bookmark-o" size={30} color="white" />
        </View>
        <View style={styles.boxTitle}>
            <Text style={{ color: 'white', fontSize: 18 }}>{item.caption}</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>{item.hagtag}</Text>
        </View>
        <View style={styles.music}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon2 style={{ paddingRight: 30 }} name="music" size={30} color="white" />
            <Text style={{ color: 'white', fontSize: 16 }}>{item.music}</Text>
            </View>
            <Icon2 name="navicon" size={30} color="white" />
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-thin-left" size={30} color="white" />
      </TouchableOpacity>

      <FlatList
        data={post}
        renderItem={renderVideo}
        keyExtractor={item => item.id}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 11,
  },
  videoContainer: {
    width: '100%',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  boxIcon: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    zIndex: 11,
    alignItems: 'center'
  },
  iconRight: {
    paddingVertical: 10,
  },
  boxTitle: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    zIndex: 11,
  },
  music: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
});
