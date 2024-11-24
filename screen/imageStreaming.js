import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text, Modal, TextInput } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import axios from 'axios';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/EvilIcons';
const ImageViewScreen = ({navigation, route}) => {
    const my  = route.params.userData;
    const [images, setImages] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const [comments, setComments] = useState([]);
    const [isCommentsVisible, setCommentsVisible] = useState(false);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://172.20.10.9:3000/imageStreaming');
            if (Array.isArray(response.data) && response.data.length > 0) {
                setImages(response.data);
            }
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };

    const fetchComments = async (idPost) => {
        try {
            const response = await axios.get(`http://172.20.10.9:3000/comment?id=${idPost}`);
            if (response.status === 200) {
                setComments(response.data);
                setCommentsVisible(true);
            } else {
                Alert.alert("Lỗi", "Không thể lấy bình luận. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            Alert.alert("Lỗi", "Đã có lỗi xảy ra trong quá trình lấy bình luận.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleLike = (id) => {
        setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const renderAnh = ({ item }) => (
        
        <View style={styles.card}>
            <TouchableOpacity style={{ padding: 10, flexDirection: 'row' }} onPress={() => navigation.navigate('ProfileDetails', { user: item, my: my })}>
                <Image style={{ height: 30, width: 30, borderRadius: 30 }} source={{ uri: item.avatar }} />
                <Text style={{ fontWeight: 'bold', alignSelf: 'center', marginLeft: 10 }}>{item.username}</Text>
            </TouchableOpacity>
            <Image
                source={{ uri: item.url }}
                style={styles.image}
            />
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => toggleLike(item.idPost)}>
                    <EvilIcons name="heart" size={40} color={likedPosts[item.idPost] ? 'red' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> fetchComments(item.idPost)}>
                    <EvilIcons name="comment" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <EvilIcons name="share-apple" size={40} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <Text><Text style={{ fontWeight: 'bold' }}>{item.username}</Text> : {item.content}</Text>
            </View>

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
                            <Icon3 style={styles.close} name='close' size={30} color='black' onPress={() => setCommentsVisible(false)} />
                        </TouchableOpacity>
                        <FlatList
                            data={comments}
                            keyExtractor={comment => comment.idComment}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={{ uri: item.avatar }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={[styles.commentText, { fontWeight: 'bold' }]}>{item.username}</Text>
                                            <Text style={{ fontSize: 11, color: 'gray', marginTop: -8, marginBottom: 5 }}>{item.time}</Text>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={styles.input}
                                placeholder='Thêm bình luận...'
                                placeholderTextColor="#888"
                            />
                            <Icon2 name="paper-plane" size={20} color="pink" />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );

    return images.length > 0 ? (
        <FlatList
            data={images}
            renderItem={renderAnh}
            keyExtractor={(item) => item.idPost}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 10 }}
            showsVerticalScrollIndicator={false}
        />
        
    ) : (
        <View style={styles.container}>
            <Text>No images available</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    card: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        height: 'auto'
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'contain',
        borderRadius: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },modalContainer: {
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
        bottom: 0,
        zIndex: 1
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

export default ImageViewScreen;
