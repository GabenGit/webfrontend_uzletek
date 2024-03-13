import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity,StyleSheet} from 'react-native';

const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const letolt_uzlet = async () => {
    try {
      const response = await fetch(IP.Ipcim + "uzlet");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    letolt_uzlet();
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
        
        fetch(IP.Ipcim + "Torles_uzlet", {
            method: "DELETE",
            body: JSON.stringify(bemenet),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        
        )
        .then(x => x.text())
        .then(y => {
            alert(y)
            letolt_uzlet()
            
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
          keyExtractor={({uzlet_id}) => uzlet_id}
          renderItem={({item}) => (
            <View>
            <Text style={{color:"white",fontWeight:"bold",fontSize:22,fontStyle:"italic"}}>
              {item.uzlet_nev} | {item.uzlet_cim}
            </Text>

            <TouchableOpacity
        style={styles.torlesgomb}
        onPress={async ()=>torles(item.uzlet_id)}
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
  
    torlesgomb: {
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