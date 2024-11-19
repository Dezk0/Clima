import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export default class Clima extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempC: null,
      imagenT: '',
      bandera: 0,
      viento: '',
      ciudad: '',
      lluvia: '',
      pronostico: [], // Agregar un array para el pronóstico de 5 días
    };
  }

  render() {
    const buscarC = () => {
      let _this = this;
      const { ciudad } = this.state;  // Obtener la ciudad del estado

      axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d67e1bd2e91541778eb71836242908&q=${ciudad}&days=5&aqi=no&alerts=no`)
        .then(function (response) {
          // manejar respuesta exitosa
          var datos = response.data;
          console.log(datos);

          _this.setState({
            tempC: datos.current.temp_c,
            imagenT: datos.current.condition.icon,
            viento: datos.current.wind_kph,
            lluvia: datos.forecast.forecastday[0].day.daily_chance_of_rain,
            pronostico: datos.forecast.forecastday,  // Guardar el pronóstico de 5 días
            bandera: 1
          });
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        });
    };

    return (
      <View>
        <Text style={{ fontSize: 50, color: "dodgerblue", textAlign: "center" }}>Clima app</Text>

        <View style={{
          borderWidth: 2,
          borderColor: "cornflowerblue",
          borderRadius: 15,
          width: 250,
          marginTop: 40,
          marginLeft: 80,
        }}>
          <TextInput 
            placeholder="Ciudad a buscar"
            style={{ fontSize: 20, paddingLeft: 10 }}
            value={this.state.ciudad}
            onChangeText={(text) => this.setState({ ciudad: text })}
          />

          <TouchableOpacity onPress={buscarC} style={{ position: 'absolute', right: 10, top: 7 }}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("./Imagenes/lupa.png")}
            />
          </TouchableOpacity>
        </View>

        <View>
          {/* Diseño del tiempo del país */}
          {this.state.bandera ? (
            <>
              <View style={{ marginTop: 40, alignItems: 'center' }}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: `http:${this.state.imagenT}` }}
                />
              </View>

              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 50, color: "black" }}>{this.state.tempC}°</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 40 }}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("./Imagenes/lluvia.png")}
                  />
                  <Text style={{ fontSize: 20, color: "black" }}>{this.state.lluvia}%</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("./Imagenes/viento.png")}
                  />
                  <Text style={{ fontSize: 20, color: "black" }}>{this.state.viento} km/h</Text>
                </View>
              </View>

              {/* ScrollView horizontal para los cuadros de pronóstico */}
              <ScrollView horizontal>
                <View style={{
                  flexDirection: 'row',
                  marginTop: 50,
                  marginHorizontal: 20,
                }}>
                  {this.state.pronostico.map((dia, index) => (
                    <View key={index} style={styles.forecastBox}>
                      <Text style={styles.forecastText}>{dia.day.avgtemp_c}°</Text>
                      <Image
                        style={styles.forecastIcon}
                        source={{ uri: `http:${dia.day.condition.icon}` }}
                      />
                      <Text style={styles.forecastText}>{dia.day.daily_chance_of_rain}%</Text>
                      <Text style={styles.forecastDate}>{dia.date}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </>
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Introduce una ciudad para buscar el clima.</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = {
  forecastBox: {
    width: 100,
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  forecastText: {
    fontSize: 18,
    color: 'black',
  },
  forecastIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  forecastDate: {
    fontSize: 14,
    color: 'gray',
  },
};


