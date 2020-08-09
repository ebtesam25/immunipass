import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Hospital({ name,id}) {
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rads}></Text>
        
    </View>
)}



const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 50,
        backgroundColor: '#E8D391',
        alignSelf:'center',
        justifyContent:'center',
        width:'90%'
        
    },
    name: {
        fontSize: 20,
        color: '#000',
        fontFamily:'Gadugi',
        marginTop: '5%',
        textAlign:'center',
    },
    rads: {
        fontSize: 30,
        color: '#000',
        fontFamily:'Gadugi',
        marginTop: '5%',
        marginLeft:'20%',
    },
     photo: {
        height: 50,
        width: 50,
        justifyContent:'center',
        paddingHorizontal:'10%',
        borderRadius:30,
        marginTop:'-30%',
        resizeMode:'contain'
        
        
    },
    fishdeets: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 30,
        marginTop:20,
        marginRight: 30,
        justifyContent: 'center',
        
    },
    score:{
        fontSize:40,
        fontFamily:'Gadugi',
        position:'absolute',
        top:'5%',
        right:'-2%',
        backgroundColor:'#379DA6',
        padding:'5%',
        borderRadius:35,
        color:'#fff',
        width:70,
        height:70,
        textAlignVertical:'center',
        textAlign:'center',
    },
    attr:{
        fontFamily:'Gadugi',
        fontSize:20,
        color:'#1C353D'
    },
    description: {
        fontSize: 18,
        fontFamily:'Futura',
        color:'#379DA6'
    },
   deets:{
       borderRadius:30,
       fontFamily:'Gadugi',
       elevation:2,
       backgroundColor:'#379DA6',
       color:'#FFF',
       fontSize:15,
       padding:'5%',
       textAlign:'center',
       width:'50%',
       left:'22.5%',
       marginTop:'5%',
       marginBottom:'7.5%',
   }
});