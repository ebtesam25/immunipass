import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions,ActivityIndicator } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import{LineChart} from 'react-native-chart-kit';

let customFonts  = {
    'Gadugi': require('../assets/fonts/gadugi.ttf'),
  };
  var obj=[];
  var voc = [];
  var pm25 =[];
  var pm5=[];
  var pm10 = [];
  var tps=[];
  var tmp=[];
  var hum=[];
  var timestmp=[];
export default class Air extends React.Component  {
    state = {
      fontsLoaded: false,
      aq: '',
      pm1 :[],
      isLoading: true,
    };
    
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }

    async getAirData(){
        fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/getimmunoaqbyuid', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uid":"auth0|5f2f23987ee0f0003d8cb8c5",    

        })
})
     .then((response) => response.json())
     .then((responseJson) => {
       
        this.setState({
           aq: responseJson
        })
        
        console.log(responseJson)
        obj=responseJson;
        var i=0;
        for(i=0;i<6;i++){
            pm25[i]=parseFloat(responseJson['PM2.5'][i])
           // console.log(pm25[i])
            pm5[i]=parseFloat(responseJson["PM5"][i])
           // console.log(pm4[i])
            pm10[i]=parseFloat(responseJson["PM10"][i])
           // console.log(pm10.length)
            tmp[i]= parseFloat(responseJson.temperature[i])
           // console.log(tmp[i])
            hum[i]=parseFloat(responseJson.humidity[i])
            //console.log(hum[i])
            voc[i]=parseFloat(responseJson["VOC"][i])
            //console.log(hum[i])
        }
        this.setState({isLoading:false})
        
     })
     .catch((error) => {
        console.error(error);
     });
    }
  
    componentDidMount() {
        this._loadFontsAsync();
        this.getAirData();
    
      
    
    }

    
  
    render(){
    if(this.state.isLoading==true){
        return <ActivityIndicator/>
    }
     else {
        return (
        <View style={styles.container}>
    
            <Text style={styles.qh1}>Air Quality</Text>

          <View style={styles.chart}>
            <LineChart
                data={{
                    labels:["0","2","5"],
                datasets:  [
                  {
                  data: 
                      voc
                  ,color: () => '#c0e1f0', strokeWidth: 0},
                  
                  {
                  data: 
                    pm25
                ,color: () => '#1acfd5', strokeWidth: 0},
                {
                  data: 
                    pm5
                ,color: () => '#0D3824', strokeWidth: 0},
                {
                  data: 
                    pm10
                ,color: () => '#1afcd5', strokeWidth: 0},
                {
                  data: 
                    tmp
                ,color: () => '#e87461', strokeWidth: 0},
                {
                  data: 
                    hum
                ,color: () => '#e0c879', strokeWidth: 0},
                
              ]
              }}
                width={Dimensions.get("window").width} // from react-native
                height={600}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 0.75) => `rgba(110,212,143, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(110,212,143, ${opacity})`,
                propsForDots: {
                    r: "2",
                    strokeWidth: "2",
                    stroke: "#7ac74f",
                    fill:"#c0e1f0"
                }
                }}
                bezier
                style={{
                marginVertical: 10,
                }}
            />
            
            </View>
        </View>
        );
        }
      }
    }

    const styles = StyleSheet.create({
        container: {
          height:'100%',
          position:'relative',
          backgroundColor: '#fff',
        },
        
        q:{
            height:'20%',
            width:'50%',
            resizeMode:'contain',
            zIndex:1,
            position:'absolute',
            alignSelf:'center',
            top:'20%',
            right:'10%'
          },
          qh1:{
            fontSize:40,
            fontFamily:'Gadugi',
            position:'absolute',
            zIndex:2,
            top:'5%',
            
            alignSelf:'center',
            color:'#6ed48f',
        },
       
        chart:{
            bottom:-45,
            position:'absolute',
        }
        
      });