import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const IP=require('./Ipcim')
 
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const LetoltEtelek = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'etelek');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    LetoltEtelek();
  }, []);

  const torles = (szam) => {
    alert(szam)
    const biztos = window.confirm("Biztos ki szeretnéd törölni az adatot?")
    if (biztos){
      var bemenet={
        bevitel1:szam
      }
    }

    fetch(IP.Ipcim + "torlesetelek", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
    )
    .then(x => x.text())
    .then(y => {
      alert(y)
      LetoltEtelek()
    });
  }

  return (
    <View style={{flex: 1, padding: 24, }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({etelek_id}) => etelek_id}
          renderItem={({item}) => (
            <View style={{ padding: 10, marginBottom: 10, alignItems: "center", borderWidth: 1, marginLeft: 400, marginRight: 400, backgroundColor: "green", }}>

              <View/>

              <Text style={{fontWeight: "bold", fontStyle: "italic", textDecorationLine: "underline"}}>
                {item.etelek_nev}
              </Text>

              <TouchableOpacity
                style={styles.kekgomb}
                onPress={async ()=> torles(item.etelek_id)}
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