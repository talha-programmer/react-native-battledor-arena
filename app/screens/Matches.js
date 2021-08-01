import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { useState, useEffect } from "react";
import { Links } from "../config/Api";
import {
  faCalendar,
  faClock,
  faMapMarker
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ErrorMessages from "../config/ErrorMessages";
import Indicator from "../Components/Indicator";

const Matches = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(Links.matches, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => {
        setMatches(json.matches);
      })
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
        <View>
          <FlatList
            data={matches}
            keyExtractor={({ id }, index) => id}
            style={{ padding: 24 }}
            renderItem={({ item, index }) => (
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="#DDDDDD"
                style={styles.container}
                onPress={() =>
                  navigation.navigate("SingleMatch", { matchId: item.id })
                }
              >
                <View>
                  <View style={styles.matchTimeContainer}>
                    <Text style={styles.matchDate}>
                      <FontAwesomeIcon icon={faCalendar} color="white" />
                      {"  "}
                      {item.match_date}
                    </Text>

                    <Text style={styles.matchTime}>
                      {item.match_time}
                      {"  "}
                      <FontAwesomeIcon icon={faClock} color="white" />
                    </Text>
                  </View>

                  <Text style={styles.teamsName}>
                    {item.team_one.name} {"\n"} VS {"\n"} {item.team_two.name}
                  </Text>

                  <Text style={{ textAlign: "center", color: "white" }}>
                    <FontAwesomeIcon icon={faMapMarker} color="white" />
                    {"  "}
                    {item.venue}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default Matches;
