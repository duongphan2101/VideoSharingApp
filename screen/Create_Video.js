import * as ImagePicker from 'expo-image-picker';
import { Image, View, Text, Alert, Modal,StyleSheet, FlatList } from 'react-native';
import { Video } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function MediaPickerExample({ navigation, route }) {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isAudioModalVisible, setAudioModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("For you");
  const user = route.params.userData;

const filterOptions = [
  {
    id: "1",
    name: "Film",
    icon: require("../assets/Create_Video_Select_Filter/Image_45.png"),
  },
  {
    id: "2",
    name: "Black white",
    icon: require("../assets/Create_Video_Select_Filter/Image_38.png"),
  },
  {
    id: "3",
    name: "Natural",
    icon: require("../assets/Create_Video_Select_Filter/Image_40.png"),
  },
  {
    id: "4",
    name: "Art",
    icon: require("../assets/Create_Video_Select_Filter/Image_39.png"),
  },
  {
    id: "5",
    name: "Vintage",
    icon: require("../assets/Create_Video_Select_Filter/Image_41.png"),
  },
  {
    id: "6",
    name: "Spring",
    icon: require("../assets/Create_Video_Select_Filter/Image_42.png"),
  },
  {
    id: "7",
    name: "Baby",
    icon: require("../assets/Create_Video_Select_Filter/Image_43.png"),
  },
  {
    id: "8",
    name: "Contrast",
    icon: require("../assets/Create_Video_Select_Filter/Image_44.png"),
  },
];

const audioOptions = [
  {
    id: "1",
    name: "Beautiful lady",
    duration: "00:30",
    image: require("../assets/Create_Video_Select_Music/Image_49.png"),
  },
  {
    id: "2",
    name: "Nice day",
    duration: "00:30",
    image: require("../assets/Create_Video_Select_Music/Image_50.png"),
  },
  {
    id: "3",
    name: "Sunny",
    duration: "00:30",
    image: require("../assets/Create_Video_Select_Music/Image_51.png"),
  },
  {
    id: "4",
    name: "Flowers",
    duration: "00:30",
    image: require("../assets/Create_Video_Select_Music/Image_52.png"),
  },
  {
    id: "5",
    name: "Morning coffee",
    duration: "00:30",
    image: require("../assets/Create_Video_Select_Music/Image_53.png"),
  },
];

const filterCategories = ["For you", "Trending", "Saved"];

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const toggleAudioModal = () => {
    setAudioModalVisible(!isAudioModalVisible);
  };
  useEffect(() => {
    recordMedia();
  }, []);

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Bạn cần cấp quyền để truy cập thư viện!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const recordMedia = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Bạn cần cấp quyền để truy cập camera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const confirmMedia = () => {
    if (media) {
      navigation.navigate('Post', { media, mediaType, user });
    } else {
      Alert.alert("Lỗi", "Không có phương tiện nào để xác nhận!");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black'}}>
           <TouchableOpacity
            style={{alignSelf: 'center', position: 'absolute', top: 140, zIndex: 111}}
            onPress={toggleAudioModal}>
            <Image
              source={require("../assets/Create_Video_Select_Filter/Button_9.png")}
            />
          </TouchableOpacity>
      {media && mediaType === 'image' && (
        <Image
          source={{ uri: media }}
          style={{ width: 'auto', height: 'auto' , flex: 1}}
          resizeMode="contain"
        />
      )}

      {media && mediaType === 'video' && (
        <Video
          source={{ uri: media }}
          style={{ width: 'auto', height: 'auto' , flex: 1}}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      )}

      <View style={styles.sideButtons}>
        <TouchableOpacity style={styles.sideButton}>
            <Image
              source={require("../assets/Create_Video_Select_Filter/Repeat_2.png")}
              style={styles.icon}
            />
            <Text style={styles.iconLabel}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={toggleFilterModal}
          >
            <Ionicons name="filter" size={24} color="white" />
            <Text style={styles.iconLabel}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton}>
            <Ionicons name="timer-outline" size={24} color="white" />
            <Text style={styles.iconLabel}>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton}>
            <Ionicons name="flash" size={24} color="white" />
            <Text style={styles.iconLabel}>Flash</Text>
          </TouchableOpacity>
        </View>
        {/* Bottom Buttons */}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.bottomButton} onPress={recordMedia}>
            <Ionicons name="happy-outline" size={24} color="white" />
            <Text style={styles.bottomButtonText}>Effect</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={confirmMedia}>
            <Image source={require('../assets/CreateVideo-UploadVideo/Container54.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomButton} onPress={pickMedia}>
            <Ionicons name="image-outline" size={24} color="white" />
            <Text style={styles.bottomButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={toggleFilterModal}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Filter</Text>

            <View style={styles.categoryContainer}>
              {filterCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryButton,
                    activeCategory === category && styles.activeCategoryButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      activeCategory === category && styles.activeCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <FlatList
              data={filterOptions}
              keyExtractor={(item) => item.id}
              numColumns={5}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.filterOption}>
                  <Image source={item.icon} style={styles.filterIcon} />
                  <Text style={styles.filterText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>
      </Modal>

{/* Add Audio Modal */}
       <Modal
        visible={isAudioModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleAudioModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.audioModalContent}>
            <TouchableOpacity
              onPress={toggleAudioModal}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Audio</Text>

            <View style={styles.categoryContainer}>
              {filterCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryButton,
                    activeCategory === category && styles.activeCategoryButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      activeCategory === category && styles.activeCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={audioOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.audioOption}>
                  <Image source={item.image} style={styles.audioImage} />
                  <View style={styles.audioDetails}>
                    <Text style={styles.audioText}>{item.name}</Text>
                    <Text style={styles.audioDuration}>{item.duration}</Text>
                  </View>
                  <TouchableOpacity style={styles.useButton}>
                    <Text style={styles.useButtonText}>Use</Text>
                  </TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={24} color="gray" />
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sideButtons: {
    position: "absolute",
    top: 100,
    right: 10,
    alignItems: "center",
  },
  sideButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  iconLabel: {
    color: "white",
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#888",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  activeCategoryButton: {
    borderBottomWidth: 2,
    borderBottomColor: "pink",
  },
  categoryText: {
    fontSize: 14,
    color: "gray",
  },
  activeCategoryText: {
    color: "pink",
  },
  filterOption: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  filterIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  filterText: {
    fontSize: 10,
    textAlign: "center",
    color: "gray",
  },
  audioModalContent: {
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  audioOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  audioImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  audioDetails: {
    flex: 1,
  },
  audioText: {
    fontSize: 16,
  },
  audioDuration: {
    color: "gray",
    fontSize: 12,
  },
  useButton: {
    borderWidth: 1,
    borderColor: "#ff4d4f", // Use a more reddish pink
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "transparent",
    marginRight: 10, // Spacing between button and ellipsis
  },
  useButtonText: {
    color: "#ff5d5f", // Match the reddish pink color
    fontWeight: "bold",
  },
  ellipsisIcon: {
    paddingLeft: 10,
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomButton: {
    alignItems: "center",
  },
  bottomButtonText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  captureIcon: {
    width: 60,
    height: 60,
    backgroundColor: "red",
    borderRadius: 30,
  },
});
