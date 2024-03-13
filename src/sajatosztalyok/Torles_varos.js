import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity,StyleSheet} from 'react-native';

const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const letolt_varos = async () => {
    try {
      const response = await fetch(IP.Ipcim + "varos");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    letolt_varos();
  }, []);

  const torles =(szam)=>{
    alert(szam)
    
    const biztos=window.confirm("Biztos ki szeretnéd törölni az adatot?")
    if (biztos){
        var bemenet={
            bevitel1:szam
        }

        var bemenet={
             bevitel1:szam
        }
        
        fetch(IP.Ipcim + "Torles_varos", {
            method: "DELETE",
            body: JSON.stringify(bemenet),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        
        )
        .then(x => x.text())
        .then(y => {
            alert(y)
            letolt_varos()
            
        }
        );
    }
  }

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({varos_nev}) => varos_nev}
          renderItem={({item}) => (
            <View>
            <Text style={{color:"white",fontWeight:"bold",fontSize:22,fontStyle:"italic"}}>
              {item.varos_nev}
            </Text>

            <TouchableOpacity
        style={styles.pirosgomb}
        onPress={async ()=>torles(item.varos_id)}
      >
        <Text style={{color:"black",fontWeight:"bold",fontSize:15}}  >TÖRLÉS</Text>
      </TouchableOpacity>

            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
    pirosgomb: {
      alignItems: "center",
      backgroundColor: "cyan",
      padding: 10,
      width:70,
      marginLeft:"auto",
      marginRight:"auto",
      borderRadius:10,
      border:"outset",
      borderRadius:100,
      color:"red"
      
    },
    keresgomb: {
      alignItems: "center",
      backgroundColor: "#0d3f8f",
      padding: 10,
      width:400,
      marginLeft:"auto",
      marginRight:"auto",
      marginBottom:30
    }
  });

export default App;