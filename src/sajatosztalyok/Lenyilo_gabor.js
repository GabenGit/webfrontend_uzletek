import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const IP=require('./Ipcim')


const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [talalat, setTalalat] = useState([]);
  const [selectedSeged, setSelectedSeged] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch(IP.Ipcim +'uzlettipus');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const kattintas= async ()=>{
    var adatok ={
      "bevitel1":selectedSeged
  }
  try {
      const response = await fetch(IP.Ipcim+'keresuzlet',
      {
          method: "POST",
          body: JSON.stringify(adatok),
          headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      );
      const json = await response.json();
      setTalalat(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getMovies();
    setSelectedSeged(1)
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>

<Picker
  selectedValue={selectedSeged}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedSeged(itemValue)
  }>
{data.map((item)=>{
        return(
            <Picker.Item label={item.uzlettipus_nev} value={item.uzlettipus_id} />
        
	)}
	)}


</Picker>


<Button
        onPress={() => kattintas()}
        title="Keresés"
      />
      <FlatList
          data={talalat}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View>
              <Text style={{fontWeight:'bold', fontSize:25, padding:7,color:"cyan"}}>
                {item.uzlet_nev}
              </Text>
              <Text style={{fontStyle:'italic',fontSize:20,color:"white"}}>
                {item.varos_nev} {item.uzlet_cim}
              </Text>
              </View>
          )}
        />

    </View>
  );
};


export default App;