import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import Plot from 'react-plotly.js';


const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [datCim, setDataCim] = useState([]);
  const [dataDarabszam, setDataDarabszam] = useState([]);

  const getMovies = async () => {
    try {
        const response = await fetch(IP.Ipcim + 'diagram2');
        const json = await response.json();
        setData(json);
        for (let elem of json){
          datCim.push(elem.etelek_nev)
          dataDarabszam.push(elem.darabszam)
        }
    } 
    catch (error) {
      console.error(error);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>

    <Plot
        data={[
          {type: 'bar', x: datCim, y: dataDarabszam},
        ]}
        layout={ {width: 700, height: 500, title: 'Szavazatok',} }
    />

      {/*{isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({etelek_id}) => etelek_id}
          renderItem={({item}) => (
            <Text>
              {item.film_cim}, {item.darabszam}
            </Text>
          )}
        />
          )}*/}

    </View>
  );
};

export default App;