import React from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { useState, useEffect } from 'react';
import { Links } from '../config/Api';


const Clubs = ({navigation}) => {
  
  const [isLoading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch(Links()['clubs'], {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((json) => setClubs(json.clubs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={clubs}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item, index }) => (
            <Text>{item.name}, {item.city}, {++index}</Text>
          )}
        />
      )}
    </View>
  );

}

export default Clubs
