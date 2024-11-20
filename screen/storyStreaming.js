import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';

import AntDesign from '@expo/vector-icons/AntDesign';

export default function VideoStreaming({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [stories, setStories] = useState([]); // Lưu danh sách stories
  const videoRefs = useRef([]); // Ref cho video trong stories

  // Fetch stories từ API
  const fetchStories = async () => {
    try {
      const response = await axios.get('http://192.168.1.141:3000/stories');
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchStories();
  }, []);

  // Xác định loại file để render đúng dạng
  const renderStory = ({ item, index }) => {
    const isVideo = item.type === 'video' || item.url.endsWith('.mp4');

    return (
      <View style={[styles.storyContainer, { width }]}>
        <TouchableOpacity style={{position: 'absolute', top: 60, left: 20}}  onPress={()=> navigation.goBack()}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        {isVideo ? (
          <Video
            ref={(ref) => (videoRefs.current[index] = ref)}
            source={{ uri: item.url }}
            style={styles.media}
            resizeMode="contain"
            shouldPlay={true}
            isLooping
          />
        ) : (
          <Image source={{ uri: item.url }} style={styles.media} />
        )}
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={renderStory}
        keyExtractor={(item) => item.idPost.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  storyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
  },
  caption: {
    color: 'white',
    fontSize: 16,
  },
});
