import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { resetCache } from './metro.config';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
       pesos:"0",
       resultado:"",
    };
  }

  render() {
    const dolarC = () =>{
  var temp = 0.053*this.state.pesos
     this.setState({resultado:temp.toFixed(2)});
    };

    const euroC = () =>{
  var temp = 0.045*this.state.pesos
     this.setState({resultado:temp.toFixed(2)});
    };

    const libraC = () =>{
  var temp = 0.039*this.state.pesos
     this.setState({resultado:temp.toFixed(2)});
    };
    
    const yenC = () =>{
  var temp = 7.25*this.state.pesos
     this.setState({resultado:temp.toFixed(2)});
    };

    
    return (
      <View>
        <Text style={styles.textoi}> Calculadora de divisas </Text>
         <View style={{
            borderRadius:10, 
            borderColor:"red",
            borderWidth:2,
            width:200,
            marginTop:50,
            marginLeft:10,
            }}>
         {/* 
         para leer una variable no es asi a=pesos aqui ees
         a=this.state.pesos
         para asignar unvalor a la variable no es pesos=a
         this.setState({pesos:a})
         */}
                
            <TextInput
            placeholder='Cantidad en Pesos'
            keyboardType='numeric'
            onChangeText={pesos => this.setState({pesos})}
            ></TextInput>
         </View>
         <View style={{
            width:200,
            marginLeft:200,
         }}>
            <Button title="Dolar" onPress={dolarC }></Button>
            <Button title="Euro" onPress={euroC }></Button>
            <Button title="Libra Esterlina" onPress={libraC }></Button>
            <Button title="yen" onPress={yenC }></Button>
         </View>
         <View>
            <Text style={{fontSize:20}}>La cantidad es: {this.state.resultado}</Text>
         </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
textoi:{
    fontSize:30,
    color:"red",
    textAlign:"center"

}
})
