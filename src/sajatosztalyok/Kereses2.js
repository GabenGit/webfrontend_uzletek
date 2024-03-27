import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TextInput,Button,TouchableOpacity,StyleSheet,Image} from 'react-native';
import Ipcim from './Ipcim';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  
  

  const keresesfuggveny=async()=>{
    //alert(text)
    var adatok = {
        "bevitel1":text
    }
    try {
        const response = await fetch(Ipcim.Ipcim+'keresetterem',
        {
            method: "POST",
            body: JSON.stringify(adatok),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          }
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  }

  return (
    <View style={{flex: 1, padding: 24}}>

    <TextInput
        style={{height: 40}}
        placeholder="Kérem írja be, a keresendő üzletet!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />

      <TouchableOpacity
      onPress={()=>keresesfuggveny()}
      style={styles.button}>
        <Text style={styles.text}>keresés</Text>


      </TouchableOpacity>
    
      



      {isLoading ? (
        null
      ) : (
        <FlatList
          data={data}
          keyExtractor={({komment_id}) => komment_id}
          renderItem={({item}) => (
            <View style={{backgroundColor:'#FFEBCD',margin: 3, borderRadius:10,padding:14}}>
            <Text style={{textAlign:'center',textDecorationLine:'underline',fontWeight:'bold',}}>{item.uzlet_nev}</Text>
            
            <Text style={{textAlign:'justify',fontStyle:'italic'}}>{item.uzlet_cim}</Text>
            
            
            <Image source={{uri:Ipcim.Ipcim+item.uzlet_kep}} style={{width:300,height:300}}   />


            



            </View>
          )}
        />
      )}
    </View>
  );
};

const styles=StyleSheet.create({
  button: {
    backgroundColor: 'darkorchid',
    borderRadius: 50,
    padding: 15,
  },
  text:{
    color:'white',
    fontSize:16,
    textAlign: 'center'

  },

})

export default App;