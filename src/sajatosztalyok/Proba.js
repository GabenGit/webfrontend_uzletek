import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
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
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({uzlet_id}) => uzlet_id}
          renderItem={({item}) => (
            <Text style={{color:"black",fontWeight:"bold",fontSize:22,fontStyle:"italic"}}>
              {item.uzlet_nev} | {item.uzlet_cim}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;