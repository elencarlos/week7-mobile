import React, { Component } from "react";
import {
   View,
   StyleSheet,
   TouchableOpacity,
   Text,
   TextInput,
   Image
} from "react-native";
import api from "../services/api";
// import * as ImagePicker from "expo-image-picker";
import ImagePicker from "react-native-image-picker";

class New extends Component {
   static navigationOptions = ({ navigation }) => ({
      headerTitle: "Nova Publicação"
   });

   state = {
      preview: "",
      image: null,
      author: "",
      place: "",
      description: "",
      hashtags: ""
   };

   handleSelectImage = () => {
      const options = {
         title: "Select Foto",
         customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
         storageOptions: {
            skipBackup: true,
            path: "images"
         }
      };

      ImagePicker.showImagePicker(options, response => {
         console.log("Response = ", response);

         if (response.didCancel) {
            console.log("User cancelled image picker");
         } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
         } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
         } else {
            const image = {
               uri: response.uri,
               type: "jpeg",
               name: `${name}.${"jpg"}`
            };

            // You can also display the image using data:
            const preview = { uri: "data:image/jpeg;base64," + response.data };

            this.setState({
               preview: preview,
               image
            });
         }
      });

      //   let result = await ImagePicker.launchImageLibraryAsync({
      //      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //      allowsEditing: false,
      //      aspect: [4, 3]
      //   });

      //   if (!result.cancelled) {
      //      const name = Math.random()
      //         .toString(36)
      //         .substr(2, 9);

      //      const image = {
      //         uri: result.uri,
      //         type: "jpeg",
      //         name: `${name}.${"jpg"}`
      //      };
      //      this.setState({ image });
      //      console.log(this.state.image);
      //   }
   };

   handleSubmit = async e => {
      e.preventDefault();
      console.log(this.state);

      const data = new FormData();
      data.append("image", this.state.image);
      data.append("author", this.state.author);
      data.append("place", this.state.place);
      data.append("description", this.state.description);
      data.append("hashtags", this.state.hashtags);

      await api.post("posts", data);

      this.props.navigation.navigate("Feed");
   };

   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity
               style={styles.selectButton}
               onPress={this.handleSelectImage}>
               <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
            </TouchableOpacity>

            {this.state.image && (
               <Image
                  source={{ uri: this.state.image }}
                  style={styles.preview}
               />
            )}
            <TextInput
               style={styles.input}
               autoCorrect={false}
               autoCapitalize='none'
               placeholder='Nome do Autor'
               placeholderTextColor='#999'
               value={this.state.author}
               onChangeText={author => this.setState({ author })}
            />
            <TextInput
               style={styles.input}
               autoCorrect={false}
               autoCapitalize='none'
               placeholder='Local da Foto'
               placeholderTextColor='#999'
               value={this.state.place}
               onChangeText={place => this.setState({ place })}
            />
            <TextInput
               style={styles.input}
               autoCorrect={false}
               autoCapitalize='none'
               placeholder='Descrição'
               placeholderTextColor='#999'
               value={this.state.description}
               onChangeText={description => this.setState({ description })}
            />
            <TextInput
               style={styles.input}
               autoCorrect={false}
               autoCapitalize='none'
               placeholder='Hashtags'
               placeholderTextColor='#999'
               value={this.state.hashtags}
               onChangeText={hashtags => this.setState({ hashtags })}
            />
            <TouchableOpacity
               style={styles.shareButton}
               onPress={this.handleSubmit}>
               <Text style={styles.shareButtonText}>Compartilhar Imagem</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30
   },

   preview: {
      width: "100%",
      height: 480,
      marginVertical: 15
   },

   selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#CCC",
      borderStyle: "dashed",
      height: 42,

      justifyContent: "center",
      alignItems: "center"
   },

   selectButtonText: {
      fontSize: 16,
      color: "#666"
   },

   preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: "center",
      borderRadius: 4
   },

   input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 15,
      marginTop: 10,
      fontSize: 16
   },

   shareButton: {
      backgroundColor: "#7159c1",
      borderRadius: 4,
      height: 42,
      marginTop: 15,

      justifyContent: "center",
      alignItems: "center"
   },

   shareButtonText: {
      fontWeight: "bold",
      fontSize: 16,
      color: "#FFF"
   }
});

export default New;
