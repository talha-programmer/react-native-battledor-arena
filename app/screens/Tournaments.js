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
import ErrorMessages from "../config/ErrorMessages";
import Indicator from "../Components/Indicator";

const TournamentsScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [tournaments, setTournaments] = useState();

  useEffect(() => {
    fetch(Links.tournaments, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => {
        setTournaments(json.tournaments);
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
        <FlatList
          data={tournaments}
          keyExtractor={({ id }, index) => id}
          style={{ padding: 24 }}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="#DDDDDD"
              style={{
                marginVertical: 20,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                flex: 1,
                width: "100%"
              }}
              onPress={() =>
                navigation.navigate("SingleTournament", {
                  tournamentId: item.id
                })
              }
            >
              <View>
                <Text style={{ fontSize: 22 }}>{item.name}</Text>
                <View style={styles.flexContainer}>
                  <Text style={styles.flexStart}>Starting Date </Text>
                  <Text style={styles.flexEnd}>{item.start_date}</Text>
                </View>

                <View style={styles.flexContainer}>
                  <Text style={styles.flexStart}>Ending Date</Text>
                  <Text style={styles.flexEnd}>{item.end_date}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
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
export default TournamentsScreen;
