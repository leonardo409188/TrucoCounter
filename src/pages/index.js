import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import RadioForm from 'react-native-simple-radio-button';

var radio_props = [
    { label: 'Melhor de 3', value: 3 },
    { label: 'Melhor de 5', value: 5 },
    { label: 'Mehltor de 7', value: 7 }
  ];

const App = ({ navigation }) => {
    const [modoJogo, setModoJogo] = useState(3);

    function entrar(){
        navigation.navigate('Main', {modoJogo})
    }

  return (
    <View style={styles.conteiner}>
      <Text style={styles.text}>Mimi's Truco</Text>
      <View style={{ marginVertical: 50 }}>
            <RadioForm
              radio_props={radio_props}
              buttonSize={14}
              initial={0}
              labelStyle={{ fontSize: 15, color: '#fff' }}
              formHorizontal={true}
              buttonInnerColor={'#ffffff'}
              buttonOuterColor={'#ffffff'}
              labelHorizontal={false}
              selectedButtonColor={'#ffffff'}
              buttonColor={'#ffffff'}
              animation={true}
              onPress={(value) => { setModoJogo(value) }}
            />
    </View>
      <TouchableOpacity onPress={entrar} style={styles.button}>
        <Text style={styles.buttonText}>Novo Jogo</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    conteiner: {
        flex: 1, 
        backgroundColor: 'rgba(223,71,35, .8)', 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    text: {
        color: '#fff', 
        fontSize: 34, 
        fontWeight: "bold"
    },

    button:{
        width: 180,
        height: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    buttonText: {
        color: '#df4723', 
        fontSize: 16, 
        fontWeight: "bold"
    }
});

export default App;
