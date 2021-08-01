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
import { Colors } from "react-native/Libraries/NewAppScreen";
import Indicator from "../Components/Indicator";
const Clubs = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch(Links.clubs, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => setClubs(json.clubs))
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
          data={clubs}
          style={{ padding: 24 }}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="#DDDDDD"
              style={styles.container}
              onPress={() =>
                navigation.navigate("SingleClub", { clubId: item.id })
              }
            >
              <View>
                <Text style={{ fontSize: 22 }}>{item.name}</Text>
                <Text>Rank: {++index}</Text>
                <Text>City: {item.city}</Text>
                <Text>Owner: {item.club_owner.user.name}</Text>
                <Text>Coach Name: {item.coach_name}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 30,
    marginBottom: 20
  }
});

export default Clubs;
