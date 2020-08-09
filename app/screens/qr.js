import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, View, Image, Text,TouchableOpacity } from 'react-native';


export default class Qr extends Component {
    state = {
        data: '',
        permit:''
     }
     componentDidMount = () => {
        
     }
     checkPermit(){
      fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/getimmunopass', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uid":"auth0|5f2f23987ee0f0003d8cb8c5",  
          "type":"vaccine",   

        })
})
    .then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
       
       if(responseJson.status=='denied'){
        this.setState({permit:'Sorry, you are not allowed to enter this zone :('})
       }
       else{
         this.props.navigation.navigate('Face')
       }
    })
    .catch((error) => {
        console.error(error);
    });
     }
    render() {
        return (
        <View style={styles.container}>
          <QRCode
            value="auth0|5f2f23987ee0f0003d8cb8c5"
            size={200}
            backgroundColor='#ffffff'
            color='#6ed48f'
          />
          <Text style={styles.login} onPress={()=>this.checkPermit()}>Next</Text>
          <Text style={styles.permit}  >{this.state.permit}</Text>
        </View>
        );
    }
      
} 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection:'column',
        paddingTop:'30%',
        backgroundColor:'#fff'
    },
    login:{
        fontFamily:'Gadugi B',
        fontSize:30,
        backgroundColor:'#6ed48f',
        width:'60%',
        alignSelf:'center',
        height:'10%',
        textAlignVertical:'center',
        textAlign:'center',
        fontWeight:"200",
        color:'#FFF',
        borderRadius:10,
        marginTop:'30%'
    
      },
      permit:{
        fontFamily:'Gadugi',
        fontSize:30,
        width:'80%',
        alignSelf:'center',
        textAlignVertical:'center',
        textAlign:'center',
        fontWeight:"200",
        color:'#6ed48f',
        borderRadius:10,
        marginTop:'30%'
      
      }
    
});     