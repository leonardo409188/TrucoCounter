import React, { useState } from 'react';

import {View, Text, StyleSheet, Image} from 'react-native'

import aline from '../../assets/imagens/aline.png'
import leonardo from '../../assets/imagens/leonardo.png'


import { TouchableOpacity } from 'react-native-gesture-handler';

export default function main( {navigation }){
    const quntidadeJogo = navigation.getParam('modoJogo');
    const [modoJogo, setModoJogo] = useState(quntidadeJogo);
    const [openModal, setOpenModal] = useState(false)
    const [numeroDaPartida, setNumeroDaPartida] = useState(1)

    const [leonardoVencedor, setLeonardoVencedor] = useState(false)
    const [alineVencedor, setAlineVencedor] = useState(false)

    const [alinePartidasGanhas, setAlinePartidasGanhas] = useState(0)
    const [leonardoPartidasGanhas, setLeonardoPartidasGanhas] = useState(0)

    const [pontosAline, setPontosAline] = useState(0)
    const [pontosLeonardo, setPontosLeonardo] = useState(0)

    function adicionaPontosLeonardo(pontos){
        if(pontosLeonardo == 0 && pontos == -1){

        }
        else {
            setPontosLeonardo(pontosLeonardo + pontos)
        } 
    }

    function adicionaPontosAline(pontos){
        if(pontosAline == 0 && pontos == -1){}
        else {
            setPontosAline(pontosAline + pontos)
        }    
    }

    function finalizaRodada(vencedor){
        if(vencedor === "aline"){
            setAlinePartidasGanhas(alinePartidasGanhas + 1);
            verificaVencedorFinal();
            setPontosAline(0);
            setPontosLeonardo(0);
            setNumeroDaPartida(numeroDaPartida + 1);
            setOpenModal(false);
           
        }else{
            setLeonardoPartidasGanhas(leonardoPartidasGanhas + 1);
            setPontosAline(0);
            setPontosLeonardo(0);
            setNumeroDaPartida(numeroDaPartida + 1);
            setOpenModal(false);
            verificaVencedorFinal();
        }
    }

   async function verificaVencedorFinal(){
        if(quntidadeJogo == 3){
            if(alinePartidasGanhas == 2){
                setAlineVencedor(true)
            }
            else if(leonardoPartidasGanhas == 2){
                setLeonardoVencedor(true)
            }
        }
        if(quntidadeJogo == 5){
            if(alinePartidasGanhas == 3){
                setAlineVencedor(true)
            }
            else if(leonardoPartidasGanhas == 3){
                setLeonardoVencedor(true)
            }
        }
        if(quntidadeJogo == 7){
            if(alinePartidasGanhas == 4){
                setAlineVencedor(true)
            }
            else if(leonardoPartidasGanhas == 4){
                setLeonardoVencedor(true)
            }
        }
    }

    function sair(){
        navigation.navigate('Index')
    }

    return (
        <View style={styles.container}>
            {openModal == false ?
            <>
            {quntidadeJogo === 3 && alinePartidasGanhas === 2 ?
            
            <View style={styles.vencedorContainer}>  
                <Image style={styles.fotoVencedor} source={aline}></Image>
                <Text onPress={()=> sair()} style={styles.text}>Aline venceu a batalha!!</Text>    
            </View>
            :
            
            (quntidadeJogo === 3 && leonardoPartidasGanhas === 2)

            ?
            <View style={styles.vencedorContainer}>  
                <Image style={styles.fotoVencedor} source={leonardo}></Image> 
                <Text onPress={()=> sair()} style={styles.text}>Leonardo venceu a batalha!!</Text>    
             </View>

            :

            <>  
                <View style={styles.viewFoto}>
                    <Image style={styles.foto} source={aline}></Image>
            <Text style={styles.text}>{alinePartidasGanhas} x {leonardoPartidasGanhas}</Text>
                    <Image style={styles.foto} source={leonardo}></Image>
                </View>
                <View style={styles.viewPartidas}>
                    <Text style={styles.text}>Partida número {numeroDaPartida} de {modoJogo}</Text>
                    <TouchableOpacity onPress={() => setOpenModal(true)} style={styles.button}>
                        <Text style={styles.textButton}>Iniciar</Text>
                    </TouchableOpacity> 
                </View>
                
                    <Text onPress={() => sair()} style={{color: '#fff', fontSize: 28, marginTop: 275, marginRight: 15}}>Sair</Text>
              
                </>
            }

            </>
            : <View style={styles.partidaContainer}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                   <TouchableOpacity onPress={() => adicionaPontosLeonardo(1)} style={styles.botaoPontosPositivos}>
                       <Text style={styles.textButton}>+1</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => adicionaPontosLeonardo(2)} style={styles.botaoPontosPositivos}>
                       <Text style={styles.textButton}>+2</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => adicionaPontosLeonardo(3)} style={styles.botaoPontosPositivos}>
                       <Text style={styles.textButton}>+3</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => adicionaPontosLeonardo(-1)} style={styles.botaoPontosNegativos}>
                       <Text style={styles.text}>-1</Text>
                   </TouchableOpacity>
                </View> 

                {pontosAline >= 24 || pontosLeonardo >= 24 ?
                <View style={styles.containerVencedor}>
                    {pontosAline >= 24 ?
                    <>
                        <Image style={styles.fotoVencedor} source={aline}></Image>
                        <Text style={{color: '#fff', fontSize: 28, marginTop: 10}}>Ihuhuuuu, Aline venceu!!</Text>
                        <TouchableOpacity onPress={() => finalizaRodada("aline")} style={styles.buttonFinalRodada}>
                             <Text style={styles.textButton}>Finalizar Rodada</Text>
                        </TouchableOpacity>
                    </>
                    :  
                    <> 
                    <Image style={styles.fotoVencedor} source={leonardo}></Image> 
                    <Text style={{color: '#fff', fontSize: 28, marginTop: 10}}>Ihuhuuuu, Leonardo venceu!!</Text>
                    <TouchableOpacity onPress={() => finalizaRodada("leonardo")} style={styles.buttonFinalRodada}>
                        <Text style={styles.textButton}>Finalizar Rodada</Text>
                    </TouchableOpacity>
                    </>
                     }
                   
                </View>
                :
                <> 
                <View style={{flex: 2, alignItems: 'flex-end'}}>
                     <Text style={styles.pontuacao}>{pontosLeonardo}</Text>
                </View>

                <View style={{flex: 2, alignItems: 'center', alignSelf: 'flex-start'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>  
                        <Image style={styles.fotoModal} source={leonardo}></Image>
                        <Text style={styles.textPlacar}>{leonardoPartidasGanhas}</Text>
                        <Text style={styles.text}>x</Text>
                        <Text style={styles.textPlacar}>{alinePartidasGanhas}</Text>
                        <Image style={styles.fotoModal} source={aline}></Image>
                    </View>
                    <Text style={styles.text}>Rodada Número {numeroDaPartida}</Text>  
                </View>

                <View style={{flex: 2, alignItems: 'flex-start'}}>
                 <Text style={styles.pontuacao}>{pontosAline}</Text>
                </View>
                    
                </>
                 }
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                 <TouchableOpacity onPress={() => adicionaPontosAline(1)} style={styles.botaoPontosPositivos}>
                       <Text style={styles.textButton}>+1</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => adicionaPontosAline(2)} style={styles.botaoPontosPositivos}>
                       <Text style={styles.textButton}>+2</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => adicionaPontosAline(3)} style={styles.botaoPontosPositivos}>
                       <Text style={styles.textButton}>+3</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => adicionaPontosAline(-1)} style={styles.botaoPontosNegativos}>
                       <Text style={styles.text}>-1</Text>
                   </TouchableOpacity>
                </View> 
             </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'rgba(223,71,35, .8)', 
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15
    },

    partidaContainer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(223,71,35, .5)', 
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row'
    },

    containerPlacar:{
        justifyContent: 'center', 
        alignItems: 'center'
    },
    vencedorContainer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(223,71,35, .5)', 
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    containerVencedor:{
        alignItems: 'center',
        borderWidth: .8,
        borderColor: 'rgba(255,255,255, .6)',
        borderRadius: 10,
        width: 400,
        height: 250,
        padding: 10
    },
    viewFoto:{
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        borderRightColor: '#fff',
        borderRightWidth: .6
    },
    viewPartidas:{
        flexDirection: 'column',
        alignItems: 'center' ,
        flex: 3
    },
    foto:{
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
    fotoModal:{
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 5
    },
    fotoVencedor:{
        width: 110,
        height: 110,
        borderRadius: 55,
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: -50
    },
    pontuacao:{
        color: '#fff', 
        fontSize: 185, 
        marginTop: 15
    },
    text: {
        color: '#fff', 
        fontSize: 26, 
        fontWeight: "bold"
    },
    textPlacar:{
        color: '#fff', 
        fontSize: 40, 
        fontWeight: "bold",
        marginHorizontal: 5
    },
    textButton: {
        color: 'rgba(223,71,35, .8)',
        fontSize: 34, 
        fontWeight: "bold",
    },
    button:{
        minWidth: 200,
        minHeight: 50,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        padding: 5,
        marginTop: 15,
    },
    buttonFinalRodada:{
        minWidth: 200,
        minHeight: 50,
        width: 'auto',
        height: 'auto',
        backgroundColor: 'rgba(255,255,255, .9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        paddingHorizontal: 20,
        marginTop: 70,
    },
    buttonText: {
        color: '#df4723', 
        fontSize: 16, 
        fontWeight: "bold"
    },
    botaoPontosPositivos:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    botaoPontosNegativos:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        opacity: .8
    }
});