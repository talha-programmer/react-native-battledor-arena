import React from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { Links } from "../config/Api";

const Player = ({ player, player_rank, navigation }) => {
  const rank = player_rank == undefined ? player.rank : player_rank;

  return (
    <TouchableHighlight
      underlayColor="#DDDDDD"
      style={styles.container}
      onPress={() =>
        navigation.navigate("SinglePlayer", { playerId: player.id })
      }
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Image
            source={{
              uri: Links.home + player.user.profile_picture_url,
              width: "auto",
              height: "100%",
              resizeMode: "contain"
            }}
          />
        </View>

        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 22 }}>{player.user.name}</Text>
          <Text style={{ fontWeight: "bold" }}>Rank: {rank}</Text>
          <Text>Age: {player.age}</Text>
          <Text>Club Joined: {player.club_joined}</Text>
          <Text>Team Joined: {player.team_joined}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 30,
    marginBottom: 10
  }
});

export default Player;
