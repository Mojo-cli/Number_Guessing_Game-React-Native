import React,{ useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../Components/Card';
import Colors from '../Constants/Colors';
import Input from "../Components/Input";
import NumberContainer from "../Components/NumberContainer"

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState( false );
  const [selectedNumber,setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g), '');
  };


  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed( false );
  };


  const confirmInputHandler = () =>{

      const chosenNumber = parseInt(enteredValue);
      if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99){
        Alert.alert('Invalid Number', 'Number has to be a number between 1 & 99.', [{text:'Okay', style:'destructive', onPress: resetInputHandler }])
        return;
      }

      setConfirmed( true );
      setEnteredValue('');
      setSelectedNumber(chosenNumber);
      setEnteredValue('');
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <View style={{alignItems:'center', height:100, width:300 }}>
      <NumberContainer>Number Selected By You: {selectedNumber}</NumberContainer>
      </View>
);
}


  return(
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
    <View style = {styles.screenStartGame}>
      <Text style={styles.title}> Start a new game! </Text>
        <View style={styles.inputContainer}>
          <Text style={{marginTop:5, fontFamily:"open-sans"}}> Select a number</Text>
          <Input style={styles.input}
            blurOnsubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='numeric'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
            />
          <View style={styles.buttonContainer}>
           <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
           <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View>
          </View>
          <Card/>
          {confirmedOutput}
      </View>
      <View style={{width:150, marginTop:150}}><Button title="Start Game!" onPress={()=> props.onStartGame(selectedNumber)}/></View>
    </View>
    </TouchableWithoutFeedback>
  );
};



const styles = StyleSheet.create({
  screenStartGame:{
    flex:1,
    padding:10,
    alignItems:'center'
  },
  title:{
    fontSize:20,
    marginVertical:10,
    marginTop:5,
    fontFamily:'open-sans-bold'
  },
  inputContainer:{
    height:150,
    width:300,
    maxWidth:'80%',
    alignItems:'center',
    shadowColor:'black',
    shadowOffset: {width:0,height:2},
    shadowOpacity:0.26,
    backgroundColor:'white',
    elevation:10,
    shadowRadius:6,
    borderRadius:10
  },
  buttonContainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    paddingHorizontal: 15
  },
  button:{
    width:100
  },
  input:{
    width:50,
    textAlign:'center'
  }
});

export default StartGameScreen;
