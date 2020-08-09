import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Linking } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default class Details extends Component {

  constructor() {
    super();
    this.state = {
        show: false,
        hasLocationPermission:true,
        num:0,
        markers: [{"latlng":{
          "latitude": 25.76684817404011,
          "longitude": -80.19163068383932,
        }}],
      };
    
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

componentDidMount(){
    this.hospital()
}

hospital(){
  var res = [
        {
          "_id": "5f2c380572eecb8e3ece4d1f",
          "adress": "12th main, Indiranagar, Bangalore",
          "distance": 0,
          "lat": 10.6,
          "lon": 45.6,
          "name": "hospital",
        },
         {
          "_id": "5f2c33e6d1b7d36fca669923",
          "address": "12th main road, Indiranagar, Bangalore",
          "distance": 0.14142135623731025,
          "lat": 10.5,
          "lon": 45.5,
          "name": "city general hospital",
        },
         {
          "_id": "5f2cc961a70f3ba765dffbea",
          "address": "12th main road, Indiranagar, Bangalore",
          "distance": 24.580073230159428,
          "lat": 6.9,
          "lon": 69.9,
          "name": "city general hospital",
        },
         {
          "_id": "5f2cc923a70f3ba765dffbe8",
          "address": "12th main road, Indiranagar, Bangalore",
          "distance": 39.592044655460775,
          "lat": 5.8,
          "lon": 6.3,
          "name": "city general hospital",
        },
         {
          "_id": "5f2cc959a70f3ba765dffbe9",
          "address": "12th main road, Indiranagar, Bangalore",
          "distance": 53.49579422721005,
          "lat": 45.2,
          "lon": 4.8,
          "name": "city general hospital",
        },
      ]
      this.setState({markers:res})
      this.setState({num:res.length})
      console.log(res)
      return res
}


  getRiskScores(latitude,longitude){
      if(this.state.scoreset==""){
    fetch('http://7642019dc7df.ngrok.io/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "lat":latitude,  
          "lon":longitude,   

        })
})
    .then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
           this.setState({markers:responseJson})

       
    })
    .catch((error) => {
        console.error(error);
    });
}

}



  render() {
    const { navigation, route } = this.props;
    const { latitude,longitude,scoreset } = route.params;
    return (

      <View style={{backgroundColor:'#aafda7', flex:1}}>
          
        <View style={{backgroundColor:'#6ed48f', height:550, position:'absolute',zIndex:1, width:'100%'}}>
            <Text style={{fontSize:20,fontFamily:'Gadugi', color:'#DDFBD2', marginTop:'10%', marginLeft:'10%'}}>Hospitals Nearby:</Text>
            
            <Text style={{fontSize:40,fontFamily:'Gadugi', color:'#DDFBD2', marginTop:'1%', marginLeft:'10%'}}>{this.state.num} hospitals found</Text>
        </View>
        <View style={styles.mapContainer}> 
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.state.markers[1],
          longitude: -80.1915964,
          latitudeDelta: .005,
          longitudeDelta: .005
        }} 
        >
          
          {
              this.state.markers.map((marker, i) => (
                console.log(typeof marker.lon),
                  <MapView.Marker key={i} coordinate={{latitude:marker.lat,longitude:marker.lon}} title={marker.name} description={marker.address} onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query='+marker.lat+","+marker.lon)} >
                   
                </MapView.Marker>
                
                  
              ))}
              
      </MapView>
      </View>
      
      <Text style={{borderRadius:10, width:'80%', position:'absolute', zIndex:3,bottom:'2.5%', alignSelf:'center',textAlign:'center', height:70,fontFamily:'Gadugi', fontSize:30, textAlignVertical:'center', color:'transparent'}}  onPress={() => {
            this.props.navigation.navigate('State');
          }}>Confirm</Text>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray'
  },
  mapContainer: {
    height: 520,
    borderRadius:50,
    width:'90%',
    alignSelf:'center',
    position:'absolute',
    zIndex:2,
    top:'20%',
    backgroundColor:'#F2F3F5',
    alignContent:'center',
    elevation:2,
  },
  map: {
    height: '92%',
    borderRadius:100,
    width:'90%',
    margin:'5%',
    alignSelf:'center',
    
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});