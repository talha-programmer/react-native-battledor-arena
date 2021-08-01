import React from "react";
import { useState, useEffect } from "react";
import { Links } from "../config/Api";
import Colors from "../config/Colors";
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  StyleSheet
} from "react-native";
import {
  faCalendar,
  faClock,
  faMapMarker
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ErrorMessages from "../config/ErrorMessages";
import Indicator from "../Components/Indicator";

const SingleTournamentScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [tournament, setTournament] = useState([]);

  // The navigation object stores all the parameters like this
  const tournamentId = navigation.state.params.tournamentId;

  const url = Links.tournaments + tournamentId + "/";

  useEffect(() => {
    fetch(url, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => setTournament(json.tournament))
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
            <Text style={{ fontSize: 26, marginBottom: 8 }}>
              {tournament.name}
            </Text>
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
              <Text style={styles.flexStart}>Starting Date </Text>
              <Text style={styles.flexEnd}>{tournament.start_date}</Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Ending Date</Text>
              <Text style={styles.flexEnd}>{tournament.end_date}</Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.flexStart}>Tournament Type</Text>
              <Text style={styles.flexEnd}>{tournament.tournament_type}</Text>
            </View>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 22, marginBottom: 8 }}>
              Clubs Participating
            </Text>

            {tournament.clubs.map((club) => (
              <View
                key={club.id}
                style={{
                  marginVertical: 20,
                  borderWidth: 0.5,
                  borderRadius: 10,
                  padding: 10,
                  flex: 1,
                  width: "100%"
                }}
              >
                <Text style={{ fontSize: 22 }}>{club.name}</Text>
                <View style={styles.flexContainer}>
                  <Text style={styles.flexStart}>City</Text>
                  <Text style={styles.flexEnd}>{club.city}</Text>
                </View>

                <View style={styles.flexContainer}>
                  <Text style={styles.flexStart}>Teams Participating</Text>
                  <Text style={styles.flexEnd}>{club.teams_participating}</Text>
                </View>
              </View>
            ))}

            <Text style={{ fontSize: 22, marginBottom: 8 }}>Matches</Text>
            {tournament.matches.map((match) => (
              <TouchableHighlight
                key={match.id}
                activeOpacity={0.5}
                underlayColor="#DDDDDD"
                style={styles.container}
                onPress={() =>
                  navigation.navigate("SingleMatch", { matchId: match.id })
                }
              >
                <View>
                  <View style={styles.matchTimeContainer}>
                    <Text style={styles.matchDate}>
                      <FontAwesomeIcon icon={faCalendar} color="white" />
                      {"  "}
                      {match.match_date}
                    </Text>

                    <Text style={styles.matchTime}>
                      {match.match_time}
                      {"  "}
                      <FontAwesomeIcon icon={faClock} color="white" />
                    </Text>
                  </View>

                  <Text style={styles.teamsName}>
                    {match.team_one.name} {"\n"} VS {"\n"} {match.team_two.name}
                  </Text>

                  <Text style={{ textAlign: "center", color: "white" }}>
                    <FontAwesomeIcon icon={faMapMarker} color="white" />
                    {"  "}
                    {match.venue}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

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
    flex: 0.8,
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
  },
  container: {
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: Colors.primary
  },

  matchTimeContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  matchDate: {
    flex: 1,
    textAlign: "left",
    marginBottom: 5,
    color: "white",
    alignSelf: "flex-start"
  },
  matchTime: {
    flex: 1,
    textAlign: "right",
    marginBottom: 5,
    color: "white",
    alignSelf: "flex-end"
  },
  teamsName: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 15,
    lineHeight: 30,
    color: "white"
  }
});

export default SingleTournamentScreen;
