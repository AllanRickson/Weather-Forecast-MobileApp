import React, { Component } from 'react';
import { View, Text, ImageBackground, Button, TouchableOpacity, Image } from 'react-native';
import myStyles from "./Styles"
import { ScrollView } from 'react-native';
import axios, { Axios } from 'axios';
import DailyForecast from './interfaces/interface';  // Asegúrate de tener la ruta correcta
export default class Wapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //declaracion de variables
        isVisible:false,
        country:"Mexico",
        region:"Jalisco",
        name:"Guadalajara",
        textoTemp:"Parcialmente Nublado",
        temperatura:"23°",
        imageTemp:"",
        viento:"23km",
        lluvia:"5%",
        amanecer:"6:00am",
        currentDay: new Date(),
        DaysOfWeek:[],
    };
  }
  componentDidMount(){
    const axios = require('axios').default;
    const newDaysOfWeek = []

    const apiUrl = 'http://api.weatherapi.com/v1/forecast.json?key=98132c9c3e6b4c6495f233110243101&q=Guadalajara&days=7&aqi=no&alerts=no';
    axios.get(apiUrl)
    .then(response => {
      for (let index = 1; index < 7; index++) {
        const aux = new DailyForecast();
        aux.imageIcon = 'https:'+response.data.forecast.forecastday[index].day.condition.icon;
        aux.dayOfWeek = this.obtenerDiaDeLaSemana(response.data.forecast.forecastday[index].date)
        aux.temp_c =this.formatearTemp(response.data.forecast.forecastday[index].day.maxtemp_c),
        newDaysOfWeek.push(aux);
      }
      const iconURL = 'https:'+response.data.current.condition.icon;
      const largerIconURL = iconURL.replaceAll('64', '128');
      this.setState({
        temperatura:response.data.current.temp_c+'°C',
        textoTemp:response.data.current.condition.text,
        imageTemp:largerIconURL,
        viento:response.data.current.wind_kph+' km',
        lluvia:response.data.current.humidity+'%',
        amanecer:response.data.forecast.forecastday[0].astro.sunrise,
        DaysOfWeek:newDaysOfWeek
      });

       })
      .catch(error => {
         console.log("Error en la api",error);
        });

  }
  obtenerDiaDeLaSemana(fechaString) {
    const fecha = new Date(fechaString);
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const numeroDia = fecha.getDay();
    const nombreDia = diasSemana[numeroDia];
  
    return nombreDia;
  }
  formatearTemp(tempString){
    const tempFormateada = new String(tempString)

    return tempFormateada.slice(0,-2)+'°C'
  }

  render() {

    const busqueda = () =>{
      this.setState({ isVisible: !this.state.isVisible });
      console.log("Me Pusharon");
  }
    return (
      <View>
        <ImageBackground source={require('./Imagenes/images/bg.png')} style={{height:'100%'}} blurRadius={50}>
        <View style={{margin:20, display:"flex", alignContent:'center', justifyContent:'center'}}>
          {/* BARRA DE BUSQUDA */}
            <TouchableOpacity onPress={busqueda} style={{margin:0,padding:0}}>
              <View style={{display:'flex',justifyContent:'center',alignContent:'center', width:'100%',height:50,borderRadius:20, backgroundColor:"gray", opacity:this.state.isVisible? 1:.1,alignContent:'center'}}>
                <Text style={{margin:10,fontSize:20, color:"white",opacity:this.state.isVisible? 1:.1}}>Buscar Ciudad</Text> 
              </View>
            </TouchableOpacity>

            {/* INFORMACION PRINCIPAL */}
            <View style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center',marginTop:'10%',height:"40%",width:"auto",marginBottom:"5%"}}>
              <View style={{display:"flex",flexDirection:"row",alignItems:"baseline",justifyContent:"center"}}>
                <Text style={myStyles.Title}>{this.state.name}, </Text>
                <Text style={myStyles.subTitle}>{this.state.region}</Text>
              </View>
              <Text style={myStyles.subTitle}>{this.state.country}</Text>
              <View style={myStyles.imageContainer}>
                <Image source ={this.state.imageTemp !='' ? { uri: this.state.imageTemp } : require('./Imagenes/images/partlycloudy.png')} resizeMode="contain" style={this.state.imageTemp !=""? myStyles.imageApi : myStyles.image}></Image>
              </View>
              <Text style={{color:"white", fontSize:40,fontWeight:800}}>{this.state.temperatura}</Text>
              <Text style={{color:"white",fontSize:20,fontWeight:300}}>{this.state.textoTemp}</Text>
            </View>
            {/* INFORMACION COMPLEMENTARIA */}
            <View style={{display:"flex",flexDirection:"row",marginTop:"5%" }}>
                <View  style={{display:"flex",flexDirection:'row',}}>
                    <Image source={require("./Imagenes/icons/wind.png")} style={{width:30,height:30, marginRight:"10%"}}></Image>
                    <Text style={{color:"white",fontSize:20,fontWeight:800,}}>{this.state.viento}</Text>
                  </View>
                  <View  style={{display:"flex",flexDirection:'row'}}>
                    <Image source={require("./Imagenes/icons/drop.png")} style={{width:30,height:30, marginRight:"10%"}}></Image>
                    <Text style={{color:"white",fontSize:20,fontWeight:800,}}>{this.state.lluvia}</Text>
                  </View>
                  <View  style={{display:"flex",flexDirection:'row'}}>
                    <Image source={require("./Imagenes/icons/sun.png")} style={{width:30,height:30, marginRight:"10%"}}></Image>
                    <Text style={{color:"white",fontSize:20,fontWeight:800,}}>{this.state.amanecer}</Text>
                  </View>
            </View>
            {/* INFORMACION SEMANAL */}
            <Text style={{color:"white",fontSize:20,fontWeight:400, marginTop:"10%"}}>Daily Forecast</Text>
            <ScrollView horizontal={true}  style={{marginTop:'4%'}}>
            <View  style={{width:800, height:"auto", display: 'flex', flexDirection: 'row',}}>  
            {this.state.DaysOfWeek.map((day, index) => (
                <View key={index} style={myStyles.dateContainer}>
                  <View style={myStyles.miniImageContainer}>
                    <Image source ={this.state.imageTemp !='' ? { uri: day.imageIcon } : require("./Imagenes/images/heavyrain.png")}resizeMode="contain" style={this.state.imageTemp !=""? myStyles.miniImageApi : myStyles.image}></Image>
                  </View>
                  <Text style={{ color: 'white', fontSize: 15 }}>{day.dayOfWeek}</Text>
                  <Text style={{ color: 'white', fontSize:25}}>{day.temp_c}</Text>
                </View>
            ))}
            </View>
          </ScrollView>

        </View>
        </ImageBackground>

      </View>
    );
  }
}
