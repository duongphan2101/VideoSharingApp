import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Image, Dimensions, ScrollView , Alert} from "react-native";
import { TextInput, Text } from "react-native";
import { Video } from 'expo-av';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';

const Post_Video_Screen = ({ navigation, route }) => {
  const { media, mediaType, user } = route.params;
  const [content, setContent] = useState("");
  const postMedia = async (idUser, type, url, navigation) => {
    try {
      const response = await axios.post('http://192.168.1.151:3000/savePost', {
        idUser,
        type,
        url,
        content,
      });
  
      if (response.status === 201) {
        Alert.alert("Thành công", "Bài viết đã được lưu thành công!");
        navigation.navigate('Home');
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu bài viết vào cơ sở dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      Alert.alert("Lỗi", "Không thể kết nối tới máy chủ.");
    }
  };

  const post = () => {
    // console.log(media)
    // console.log(mediaType)
    // console.log(content)
    // console.log(user.idUser)

    postMedia(user.idUser, mediaType, media, navigation);
  }
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={{position: 'absolute', top: 20, left: 20, zIndex: 11}} onPress={()=> navigation.goBack()}>
        <Ionicons  name="close" size={24} color="black"/>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {mediaType === 'image' && (
          <Image
            source={{ uri: media }}
            style={{flex: 1, width: 300, height: 300}}
            resizeMode="contain"
          />
        )}

        {mediaType === 'video' && (
          <Video
            source={{ uri: media }}
            style={{flex: 1, width: 300, height: 300}}
            resizeMode="contain"
            isLooping
          />
        )}
        <TouchableOpacity>
          <Image
            source={require("../assets/CreateVideo-PostVideo/Button16.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Input title"
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
          value={content}
          onChangeText={setContent}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Input description"
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
          multiline
        />
      </View>

      <View style={styles.itemContainer1}>
        <Image
          source={require("../assets/CreateVideo-PostVideo/Addhashtag.png")}
        />
        <Image
          source={require("../assets/CreateVideo-PostVideo/Tag5.png")}
        />
      </View>

      <View style={styles.itemContainer2}>
        <Image
          source={require("../assets/CreateVideo-PostVideo/Tagsomeone.png")}
        />
        <Image
          source={require("../assets/CreateVideo-PostVideo/Tag6.png")}
        />
      </View>

      <View style={styles.itemContainer3}>
        <Image
          source={require("../assets/CreateVideo-PostVideo/Comments.png")}
        />
        <Image
          source={require("../assets/CreateVideo-PostVideo/Switch1.png")}
        />
      </View>

      <View style={styles.itemContainer3}>
        <Image
          source={require("../assets/CreateVideo-PostVideo/Whocanwatch.png")}
        />
        <Image
          source={require("../assets/CreateVideo-PostVideo/DropdownButton1.png")}
        />
      </View>

      <View style={styles.itemContainer1}>
        <Image
          source={require("../assets/CreateVideo-PostVideo/Alsoposton.png")}
        />
      </View>

      <View style={styles.itemContainer3}>
        <Image
          source={require("../assets/CreateVideo-PostVideo/Facebook.png")}
        />
        <Image
          source={require("../assets/CreateVideo-PostVideo/Switch2.png")}
        />
      </View>

      <View style={styles.itemContainer3}>
        <Image
          source={require("../assets/CreateVideo-PostVideo/Twitter.png")}
        />
        <Image
          source={require("../assets/CreateVideo-PostVideo/Switch3.png")}
        />
      </View>

      <View style={styles.itemContainer3}>
        <Image
          source={require("../assets/CreateVideo-PostVideo/Instagram.png")}
        />
        <Image
          source={require("../assets/CreateVideo-PostVideo/Switch4.png")}
        />
      </View>
      <View style={styles.itemContainer3}>
        <TouchableOpacity>
          <Image
            source={require("../assets/CreateVideo-PostVideo/Button17.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={post}> 
          <Image
            source={require("../assets/CreateVideo-PostVideo/Button18.png")}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  inputContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
    marginTop: -10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
  },
  itemContainer1: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  itemContainer2: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  itemContainer3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 40,
    alignItems: "center",
  },
});

export default Post_Video_Screen;
