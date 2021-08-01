import React from "react";
import { useState, useEffect } from "react";
import { Links } from "../config/Api";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Table, Row, Rows } from "react-native-table-component";
import ErrorMessages from "../config/ErrorMessages";
import Indicator from "../Components/Indicator";

const PlayerStats = ({ player }) => {
  const tableHead = ["Match", "Won", "Lost", "Tied"];
  let rowData = [
    player.total_matches,
    player.won_matches,
    player.lost_matches,
    player.tied_matches
  ];

  const tableStyles = StyleSheet.create({
    row: {
      height: 40,
      backgroundColor: Colors.primary
    },
    text: {
      margin: 6,
      textAlign: "center",
      fontSize: 20,
      color: "white"
    }
  });

  return (
    <Table borderStyle={{ borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
      <Row
        data={tableHead}
        style={tableStyles.row}
        textStyle={tableStyles.text}
      />

      <Row
        data={rowData}
        style={{ borderBottomWidth: 0.5 }}
        style={tableStyles.row}
        textStyle={tableStyles.text}
      />
    </Table>
  );
};

const SinglePlayerScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [player, setPlayer] = useState([]);

  // The navigation object stores all the parameters like this
  const playerId = navigation.state.params.playerId;

  const url = Links.players + playerId + "/";

  useEffect(() => {
    fetch(url, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => setPlayer(json.player))
      .catch((error) => {
        alert(ErrorMessages.connectionError);
        navigation.goBack();
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <Indicator />
      ) : (
        <View style={{ padding: 24 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 26, marginBottom: 8 }}>
              {player.user.name}
            </Text>
            <View
              style={{
                borderBottomColor: "grey",
                borderBottomWidth: 0.5
              }}
            ></View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Image
              source={{
                uri: Links.home + player.user.profile_picture_url,
                width: "auto",
                height: 400,
                resizeMode: "cover"
              }}
            />
          </View>

          {/* General Details */}
          <View
            style={{
              marginVertical: 20,
              borderWidth: 0.5,
              borderRadius: 10,
              padding: 10,
              flex: 1,
              width: "100%"
            }}
          >
            <Text style={{ fontSize: 22 }}>General Details</Text>
            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Rank</Text>
              <Text style={styles.flexEnd}>{player.rank}</Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Age</Text>
              <Text style={styles.flexEnd}>{player.age}</Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Email</Text>
              <Text style={styles.flexEnd}>{player.user.email}</Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Club Joined</Text>
              <Text style={styles.flexEnd}>{player.club_joined}</Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Team Joined</Text>
              <Text style={styles.flexEnd}>{player.team_joined}</Text>
            </View>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 22, marginBottom: 10 }}>
              Overall Stats
            </Text>

            <PlayerStats player={player} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default SinglePlayerScreen;

const normalFontSize = 20;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 0.5,
    paddingVertical: 10
  },
  flexStart: {
    flex: 0.5,
    alignSelf: "flex-start",
    fontSize: normalFontSize,
    textAlign: "left",
    color: "grey",
    fontStyle: "italic"
  },
  flexEnd: {
    flex: 1,
    alignSelf: "flex-end",
    fontSize: normalFontSize,
    textAlign: "right"
  }
});
