import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
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

export default function VideoStreaming({ navigation }) {
  const videoRefs = useRef([]);
  const [activePosId, setActivePostId] = useState(post[0].id);
  const { height } = useWindowDimensions();
  const [likedPosts, setLikedPosts] = useState({});
  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.getStatusAsync().then(status => {
        if (status.isPlaying) {
          video.pauseAsync();
        } else {
          video.playAsync();
        }
      });
    }
  };
  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] })); // Đảo ngược trạng thái "liked" của bài đăng
  };
  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newActivePostId = viewableItems[0].item.id;
      setActivePostId(newActivePostId);

      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (post[index].id === newActivePostId) {
            video.playAsync();
          } else {
            video.pauseAsync();
          }
        }
      });
    }
  };

  const renderVideo = ({ item, index }) => (
    <View style={[styles.videoContainer, { height }]}>
      <TouchableOpacity onPress={() => handlePlayPause(index)}>
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={item.id === activePosId}
          isLooping
        />
      </TouchableOpacity>
      <View style={styles.boxIcon}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Icon2
              style={styles.iconRight}
              name="heart-o"
              size={30}
              color={likedPosts[item.id] ? 'red' : 'white'}
            />
          </TouchableOpacity>
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
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    zIndex: -1
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
    zIndex: 1
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
