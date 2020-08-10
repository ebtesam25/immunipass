import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Camera } from 'expo-camera';
import { TextInput } from 'react-native-gesture-handler';


var imgdata=null;
var url=null;
var cUrl=null;
var pUrl=null;

let customFonts  = {
  'Gadugi': require('../assets/fonts/gadugi.ttf'),
  'Gadugi B': require('../assets/fonts/gadugib.ttf'),
};

export default class Face extends React.Component  {
  state = {
    fontsLoaded: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this._loadFontsAsync();
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

 

  

  render(){
    const { hasCameraPermission } = this.state;
    const {ref} = this.state;
    let { image } = this.state;
    const takePicture = async () => {
   
            const options = {quality: 0.3, base64: true};
            imgdata = await this.camera.takePictureAsync(options);
            url=imgdata.uri;
            console.log('Image Captured');
            console.log(url);
            
            let base64Img = `data:image/jpg;base64,${imgdata.base64}`
      
            
           let cloudinary = 'https://api.cloudinary.com/v1_1/diywehkap/image/upload';
        
            let data = {
              "file": base64Img,
              "upload_preset": "hm4fkyir",
            }
            fetch(cloudinary, {
              body: JSON.stringify(data),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
            }).then(async r => {
              let data = await r.json()
              cUrl=data.secure_url;
              pUrl=cUrl.toString();
              console.log(pUrl);
              x=1;
          
            let labelcontent=await fetch('http://feed02313b0c.ngrok.io/facerec', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'cache-control': 'no-cache'
            },
            body: JSON.stringify({root:"",imgurl:pUrl})
          }).then(response => response.json())
          .then(data => (Speech.speak(data.results.toString())))
          .catch(err=>console.log(err));


          }).catch(err=>console.log(err));
         

           
     
    };



    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
    <View style={styles.container}>
      <Camera style={{ flex: 0.7 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
    </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    position:'relative',
    backgroundColor:'#FFF'
  },
  header:{
    height:'50%',
    width:'50%',
    resizeMode:'contain',
    alignSelf:'center'
  },
  welcome:{
    fontFamily:'Gadugi',
    fontSize:50,
    alignSelf:'center',
    top:'20%',
    color:'transparent',
    position:'absolute',
    zIndex:2,
  },
  login:{
    fontFamily:'Gadugi B',
    fontSize:30,
    backgroundColor:'#6ed48f',
    width:'80%',
    alignSelf:'center',
    height:'10%',
    textAlignVertical:'center',
    textAlign:'center',
    fontWeight:"200",
    color:'#FFF',
    color:'#FFF',
    borderRadius:10,
    marginTop:'30%'

  },
  reg:{
    fontFamily:'Gadugi B',
    fontSize:30,
    backgroundColor:'#aafda7',
    width:'80%',
    alignSelf:'center',
    height:'10%',
    textAlignVertical:'center',
    textAlign:'center',
    fontWeight:"200",
    color:'#FFF',
    borderRadius:10,
    marginTop:'5%',

}
});