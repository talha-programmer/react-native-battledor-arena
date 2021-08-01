import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Links } from "../config/Api";
import Player from "../Components/Player";
import ErrorMessages from "../config/ErrorMessages";
import Indicator from "../Components/Indicator";

const Players = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(Links.players, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => setPlayers(json.players))
      .catch((error) => {
        alert(ErrorMessages.connectionError);
        navigation.goBack();
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {isLoading ? (
        <Indicator />
      ) : (
        <FlatList
          data={players}
          keyExtractor={({ id }, index) => id}
          style={{ padding: 24 }}
          renderItem={({ item, index }) => (
            <Player
              player={item}
              player_rank={++index}
              navigation={navigation}
            />
          )}
        />
      )}
    </ScrollView>
  );
};

export default Players;
