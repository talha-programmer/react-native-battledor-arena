import React from "react";
import { useState, useEffect } from "react";
import { Links } from "../config/Api";
import Colors from "../config/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClock,
  faCalendar,
  faMapMarker
} from "@fortawesome/free-solid-svg-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from "react-native";
import ErrorMessages from "../config/ErrorMessages";
import Indicator from "../Components/Indicator";

const SingleMatchScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [match, setMatch] = useState([]);

  // The navigation object stores all the parameters like this
  const matchId = navigation.state.params.matchId;

  const url = Links.matches + matchId + "/";

  useEffect(() => {
    fetch(url, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => {
        setMatch(json.match);
      })
      .catch((error) => {
        alert(ErrorMessages.connectionError);
        navigation.goBack();
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <Indicator />
      ) : (
        <ScrollView style={{ padding: 24 }}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="#DDDDDD"
            style={styles.container}
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

              {match.result_added === false ? (
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Result not added yet
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      marginVertical: 20,
                      color: "white",
                      textAlign: "center"
                    }}
                  >
                    Match Result
                  </Text>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        borderRightWidth: 1,
                        borderRightColor: "white"
                      }}
                    >
                      <Text style={styles.teamHeading}>
                        {match.team_one.name}
                      </Text>
                      <View style={{ marginBottom: 8 }}>
                        {match.team_one_players.map((player) => (
                          <Text style={styles.centeredText} key={player.id}>
                            {player.user.name}: {player.pivot.points} Pt
                          </Text>
                        ))}
                      </View>

                      <Text style={styles.centeredBoldText}>
                        Total: {match.team_one_points} Points
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column"
                      }}
                    >
                      <Text style={styles.teamHeading}>
                        {match.team_two.name}
                      </Text>
                      <View style={{ marginBottom: 8 }}>
                        {match.team_two_players.map((player) => (
                          <Text style={styles.centeredText} key={player.id}>
                            {player.user.name}: {player.pivot.points} Pt
                          </Text>
                        ))}
                      </View>

                      <Text style={styles.centeredBoldText}>
                        Total: {match.team_two_points} Points
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{ flexDirection: "column", flex: 1, marginTop: 20 }}
                  >
                    <Text style={styles.centeredBoldText}>
                      {match.match_result}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </TouchableHighlight>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  },
  teamHeading: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 8
  },
  centeredText: {
    color: "white",
    textAlign: "center"
  },
  centeredBoldText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default SingleMatchScreen;
