import React from "react";
import { useState, useEffect } from "react";
import { Links } from "../config/Api";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Row, Rows, Table } from "react-native-table-component";
import Player from "../Components/Player";
import ErrorMessages from "../config/ErrorMessages";
import Indicator from "../Components/Indicator";

const Teams = ({ teams }) => {
  const tableHead = ["Pos", "Team", "Match", "Won", "Lost", "Tied"];
  let rowData = [];

  let index = 1;
  teams.forEach((team) => {
    rowData.push([
      index++,
      team.name,
      team.total_matches,
      team.won_matches,
      team.lost_matches,
      team.tied_matches
    ]);
  });

  const tableStyles = StyleSheet.create({
    head: {
      height: 40,
      backgroundColor: Colors.primary
    },
    headText: {
      margin: 6,
      textAlign: "center",

      color: "white"
    },
    text: {
      margin: 6,
      textAlign: "center"
    }
  });

  return (
    <Table borderStyle={{ borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
      <Row
        data={tableHead}
        style={tableStyles.head}
        textStyle={tableStyles.headText}
      />

      <Rows
        data={rowData}
        style={{ borderBottomWidth: 0.5 }}
        textStyle={tableStyles.text}
      />
    </Table>
  );
};

const SingleClubScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [club, setClub] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  // The navigation object stores all the parameters like this
  const clubId = navigation.state.params.clubId;

  const url = Links.clubs + clubId + "/";

  useEffect(() => {
    fetch(url, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => {
        setClub(json.club);
        setTeams(json.club.teams);
        setPlayers(json.club.players);
      })
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
          <View>
            <Text style={{ fontSize: 26, marginBottom: 8 }}>{club.name}</Text>
            <View
              style={{
                borderBottomColor: "grey",
                borderBottomWidth: 0.5
              }}
            ></View>
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
              <Text style={styles.flexEnd}>{club.rank}</Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Owner</Text>
              <Text style={styles.flexEnd}>{club.owner_name}</Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>City</Text>
              <Text style={styles.flexEnd}>{club.city}</Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Address</Text>
              <Text style={styles.flexEnd}>{club.address}</Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Membership Fee</Text>
              <Text style={styles.flexEnd}>{club.membership_fee}</Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Coach Name</Text>
              <Text style={styles.flexEnd}>{club.coach_name}</Text>
            </View>
          </View>

          {/* Teams */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 22, marginBottom: 8 }}>Teams</Text>

            <Teams teams={teams} />
          </View>

          {/* Players */}

          <Text style={{ fontSize: 22, marginBottom: 8, marginTop: 20 }}>
            Players
          </Text>
          {players.map((player) => (
            <View
              key={player.id}
              style={{ borderWidth: 0.5, borderRadius: 10, marginBottom: 15 }}
            >
              <Player player={player} navigation={navigation} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default SingleClubScreen;

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
    flex: 0.7,
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
