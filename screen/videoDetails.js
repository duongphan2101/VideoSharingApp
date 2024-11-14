import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, useWindowDimensions, Dimensions, Modal, TextInput, Button, Alert, Image } from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function VideoStreaming({ navigation, route }) {
  const videoRefs = useRef([]);
  const [activePosId, setActivePostId] = useState(null);
  const { height } = useWindowDimensions();
  const [likedPosts, setLikedPosts] = useState({});
  const id = route.params.idPost;
  const idUser = route.params.idUser;
  const avatar = route.params;

  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  // const widthScreen = Dimensions.get('window').width;

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.151:3000/videoDetails?id=${id}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setVideos(response.data);
        setActivePostId(response.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id); 
    }
  }, [id]);

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

  const toggleLike = (idPost) => {
    setLikedPosts(prev => ({ ...prev, [idPost]: !prev[idPost] }));
  };

  const fetchComments = async () => {
    
    try {
      const response = await axios.get(`http://192.168.1.151:3000/comment?id=${id}`);
      if (response.status === 200) {
        setComments(response.data);
        setCommentsVisible(true); // Show the modal
      } else {
        Alert.alert("Lỗi", "Không thể lấy bình luận. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra trong quá trình lấy bình luận.");
    }
  };

  // const handleAddComment = () => {
  //   const newCommentData = { id: Date.now().toString(), text: newComment };
  //   setComments([...comments, newCommentData]); // Add the new comment
  //   setNewComment(''); // Clear the input
  // };

  const renderVideo = ({ item, index }) => (
    <View style={[styles.videoContainer, { height }]}>
      <TouchableOpacity onPress={() => handlePlayPause(index)}>
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          source={{ uri: item.url }}
          style={styles.video}
          resizeMode="contain"
          shouldPlay={item.idPost === activePosId}
          isLooping
        />
      </TouchableOpacity>
      <View style={styles.boxIcon}>

        <TouchableOpacity>
          <Image style={[{height: 50, width: 50, borderRadius: 50, marginBottom: 10}]} source={{uri: avatar.avatar}}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleLike(item.idPost)}>
          <Icon2
            style={styles.iconRight}
            name="heart-o"
            size={30}
            color={likedPosts[item.idPost] ? 'red' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchComments(item.idPost)}> {/* Show comments modal */}
          <Icon2 style={styles.iconRight} name="comment-o" size={30} color="white" />
        </TouchableOpacity>
        <Icon2 style={styles.iconRight} name="bookmark-o" size={30} color="white" />
      </View>
      <View style={styles.boxTitle}>
        <Text style={{ color: 'white', fontSize: 18 }}>{item.content}</Text>
      </View>
      <View style={styles.music}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon2 style={{ paddingRight: 30 }} name="music" size={30} color="white" />
          <Text style={{ color: 'white', fontSize: 16 }}>Music on Video</Text>
        </View>
        <Icon2 name="navicon" size={30} color="white" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name='chevron-left' size={40} color="white" />
      </TouchableOpacity>
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={item => item.idPost}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
      
      {/* Comment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCommentsVisible}
        onRequestClose={() => setCommentsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bình luận</Text>
            <TouchableOpacity>
              <Icon style={styles.close} name='close' size={30} color='black' onPress={() => setCommentsVisible(false)}/>
            </TouchableOpacity>
            <FlatList
              data={comments}
              keyExtractor={comment => comment.id}
              renderItem={({ item }) => (
                <View  style={{flexDirection: 'row', padding: 5, alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>

                  <View style={{flexDirection: 'row',alignItems: 'center'}}>
                    <Image source={{uri: item.avatar}} style={{height: 50, width: 50}}/>
                    <View style={{paddingLeft: 10}}>
                      <Text style={styles.commentText}>{item.username}</Text>
                      <Text style={{fontSize: 11, color: 'gray', marginTop: -8, marginBottom: 5}}>{item.time}</Text>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                  </View>
                  <Icon2
                    name='heart-o'
                    size={20}
                    color='gray'
                  />
                </View>
                
              )}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={styles.input}
                placeholder='Thêm bình luận...'
                placeholderTextColor="#888"
                value={newComment}
                onChangeText={setNewComment}
              />
              <Icon2 name='paper-plane' size={20} color="pink"/>
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    bottom: 70,
    right: 20,
    alignItems: 'center',
  },
  iconRight: {
    paddingVertical: 10,
  },
  boxTitle: {
    position: 'absolute',
    bottom: 60,
    left: 20,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height: '60%',
    position: 'absolute',
    bottom: 0
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 8, 
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10
  },
  close : {
    position: 'absolute', 
    right: 0,
    top: -40
  }
});
