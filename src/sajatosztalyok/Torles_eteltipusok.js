import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const IP=require('./Ipcim')
 
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const LetoltEteltipusok = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'eteltipusok');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    LetoltEteltipusok();
  }, []);

  const torles = (szam) => {
    alert(szam)
    const biztos = window.confirm("Biztos ki szeretnéd törölni az adatot?")
    if (biztos){
      var bemenet={
        bevitel1:szam
      }
    }

    fetch(IP.Ipcim + "torleseteltipusok", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
    )
    .then(x => x.text())
    .then(y => {
      alert(y)
      LetoltEteltipusok()
    });
  }

  return (
    <View style={{flex: 1, padding: 24, }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({eteltipusok_id}) => eteltipusok_id}
          renderItem={({item}) => (
            <View style={{ padding: 10, marginBottom: 10, alignItems: "center", borderWidth: 1, marginLeft: 400, marginRight: 400, backgroundColor: "green",}}>

              <Text style={{fontWeight: "bold", fontStyle: "italic", textDecorationLine: "underline"}}>
                {item.eteltipusok_nev}
              </Text>

              <TouchableOpacity
                style={styles.kekgomb}
                onPress={async ()=> torles(item.eteltipusok_id)}
              >
                <Text style={{color: "white", fontWeight: "bold", fontSize: 20, textTransform: "uppercase"}} >Törlés</Text>
              </TouchableOpacity>
            </View>
            
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  kekgomb: {
    backgroundColor: "grey",
    width: 100,
    textAlign: "center",
    padding: 5,
    margin: 5,
  },
});

export default App;