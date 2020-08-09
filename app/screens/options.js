import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as AuthSession from 'expo-auth-session';
const auth0Domain = 'http://dev-fxc-5-dk.us.auth0.com';
const auth0ClientId = 'zrURK1y9ukzlFqT02pcB0YTHdHs1dqbx';
let customFonts  = {
  'Gadugi': require('../assets/fonts/gadugi.ttf'),
  'Gadugi B': require('../assets/fonts/gadugib.ttf'),
};
export default class Options extends React.Component  {

  state = {
    fontsLoaded: false,
  };
 


  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
         

      <Image source={require('../assets/img/distance.png')} style={styles.header}></Image>
      <Text style={styles.welcome} onPress={() => this.props.navigation.navigate('TheMap')}>Welcome!</Text>
      <Text style={styles.login} onPress={() => this.props.navigation.navigate('Qr')}>Checkin</Text>
      <Text style={styles.air} onPress={() => this.props.navigation.navigate('Air')}>Air Quality</Text>
      <Text style={styles.reg} onPress={() => this.props.navigation.navigate('TheMap')}>Immunization</Text>
    </View>
    );
    }
    else {
    return <AppLoading />;
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
    width:'80%',
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
    marginTop:'25%'

  },
  air:{
    fontFamily:'Gadugi B',
    fontSize:30,
    backgroundColor:'#85e5a0',
    width:'80%',
    alignSelf:'center',
    height:'10%',
    textAlignVertical:'center',
    textAlign:'center',
    fontWeight:"200",
    color:'#FFF',
    color:'#FFF',
    borderRadius:10,
    marginTop:'3%'

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