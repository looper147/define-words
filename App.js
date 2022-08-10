import { useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-web';
const dict = require("./dictionary_minimal.json"); //json file that contains the words and definitions
const ipa = require("./en_US.json");//json fle that contains the words ipa transcriptons
export default function App() {
  
  const [input,onChangeInput] = useState("");
  const [output,setOutput] = useState([]);
  const displayDef = ()=>{
      setOutput("");//clear the output
      let originalCase,cleanInput,words;
      originalCase= input.replace(/ +/g," ").trim();//remove extra spaces
      originalCase = originalCase.replace(/,/g, '');//remve commas
      cleanInput = originalCase.replace(/\./g, '');//remve dots
      words = cleanInput.split(" "); //make the input into an array of words
      for (let i=0;i<words.length;i++){//loop through the words array
          try {
              let word,wordIpa,meaning;
              word = (words[i]).toLowerCase()//lowercase word because the json keys are lowercase
              meaning =  dict[word]?` ${dict[word]}`:"No definition";
              
              if(ipa["en_US"][0][word]){//check if the word exists in the ipa json file
                  wordIpa=ipa["en_US"][0][word]//if true, assign it to the wordIpa variable
              }
              
              setOutput(output=> [...output,<Text key={i}>{<strong style={{fontSize:18}}>{words[i]} </strong> }{<p style={{fontSize:18}}>{wordIpa}</p>}{`${meaning}.\n\n`}</Text>]) //add each word to the output state array that displays the result
                        
          } catch (error) {
              console.log(error); 
          }
      }
  }
 
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{flex:0.3}}>
          <Text style={styles.title}>Define words</Text>
        </View>

        <View style={{flex:0.4}}>
          <Text style={styles.text}>Paste a text below and click check to get the definition of each word inside the text.</Text>
        </View>

        <View style={{flex:2}}>
          <TextInput onChangeText ={onChangeInput} value = {input} style={styles.inputs} placeholder={"Insert your text here:"} multiline={true} numberOfLines = {20}/>
        </View>

        <View style={{flex:0.3}}>
          <TouchableOpacity onPress={displayDef} style={styles.btn}><Text style={{color:"#ffffff"}}>Check</Text></TouchableOpacity>
        </View>

        <View>
          <Text onChangeText={setOutput} style={styles.inputs}>
            {output}
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    
  },
  title:{
    padding:30,
    color:"#3A6B35",
    fontSize:40
  },
  text:{
    padding:30,
    color:"#3A6B35",
    fontSize:17
  },
  inputs:{
    padding:30,
    height:"100%",
    width:"99%",
    color:"#000000",
    backgroundColor:"#ffffff",
    fontSize:15,
    border:"0.2px solid #3A6B35"
    // opacity:0.5
  },
  btn:{
    padding:10,
    backgroundColor:"#3A6B35",
    textAlign:"center",
    justifyContent:"center",
    height:"100%",
    width:"99%"
  }
});
