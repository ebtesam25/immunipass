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
export default class Clerk extends React.Component  {

  state = {
    fontsLoaded: false,
  };
  _loginWithAuth0 = async () => {
    const redirectUrl = 'http://45.79.199.42:8001/'
    const connection = 'openid'
    let authUrl = `${auth0Domain}/authorize?response_type=token&client_id=${auth0ClientId}&connect=${connection}&redirect_uri=${redirectUrl}`
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const result = await AuthSession.startAsync({
        authUrl: authUrl
    });

    if (result.type === 'success'){
        console.log("Res",result);
        let token = result.params.access_token;
        console.log(token)
        this.props.navigation.navigate("Options");
    }
  
};
_signWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const connection = 'openid'
    let authUrl = `${auth0Domain}/authorize?response_type=token&client_id=${auth0ClientId}&connect=${connection}&redirect_uri=${redirectUrl}&screen_hint=signup`
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const result = await AuthSession.startAsync({
        authUrl: authUrl
    });
    console.log(result)
    if (result.type === 'success'){
        console.log("Res",result);
        let token = result.params.access_token;
        console.log(token)


        this.props.navigation.navigate("TheMap");
    }
  
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
         

      <Image source={require('../assets/img/clerk.png')} style={styles.header}></Image>
      <Text style={styles.welcome} onPress={() => this.props.navigation.navigate('Scan')}>Welcome!</Text>
      <Text style={styles.login} onPress={() => this._loginWithAuth0()}>Login</Text>
      <Text style={styles.reg} onPress={() => this._signWithAuth0()}>Register</Text>
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
    height:'55%',
    width:'75%',
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