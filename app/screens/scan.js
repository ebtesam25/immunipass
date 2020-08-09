import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Font from 'expo-font';

let customFonts  = {
    'Gadugi': require('../assets/fonts/gadugi.ttf'),
  };
  
export default class Scan extends React.Component  {
    state = {
      fontsLoaded: false,
      hasCameraPermission: null,
        scanned: false,
    };
  
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      };
  
    componentDidMount() {
      this._loadFontsAsync();
      this.getPermissionsAsync();
    }
  
    render(){
        const { hasCameraPermission, scanned } = this.state;
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
          }
          if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
          }
        if (this.state.fontsLoaded) {
            

    
        return (
        <View style={styles.container}>
        
          <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Text style={styles.h2} onPress={() => this.setState({ scanned: false })}>Scan Again</Text>
        )}
      </View>
         
        </View>
        );
        }
        else {
        return <AppLoading />;
        }
      }
      handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };
    }

    const styles = StyleSheet.create({
        container: {
          height:'100%',
          position:'relative',
          backgroundColor: '#fff',
        },
        menu: {
            height:50,
            width:50,
            position:'absolute',
            top:'3%',
            left:'5%',
            zIndex:2,
        },
        name:{
            fontFamily:'Gadugi',
            fontSize:35,
            position:'absolute',
            top:'4%',
            alignSelf:'center',
            color:'#0a2463',
        },
        avatar:{
            height:50,
            width:50,
            position:'absolute',
            top:'3%',
            right:'5%',
            zIndex:2,
        },  
        presc:{
          height:'80%',
          width:'80%',
          alignSelf:'center',
          position:'absolute',
          resizeMode:'contain',
        },
        health:{
            height:'80%',
            width:'80%',
            alignSelf:'center',
            position:'absolute',
            resizeMode:'contain',
            top:'35%',
          },
          h1:{
              fontSize:35,
              fontFamily:'Gadugi',
              position:'absolute',
              zIndex:2,
              top:'28%',
              alignSelf:'center',
              color:'#247ba0',
          },
          h2:{
            fontSize:20,
            fontFamily:'Gadugi',
            position:'absolute',
            zIndex:2,
            bottom:'6%',
            alignSelf:'center',
            paddingHorizontal:20,
            paddingVertical:10,
            backgroundColor:'#247ba0',
            color:'#fff',
            borderRadius:25,
        },

        
      });