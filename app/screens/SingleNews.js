import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Indicator from "../Components/Indicator";
import { Links } from "../config/Api";

const SingleNewsScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  // The navigation object stores all the parameters like this
  const newsId = navigation.state.params.newsId;

  const url = Links.news + newsId + "/";

  useEffect(() => {
    fetch(url, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => setNews(json.news))
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
        <View
          style={{
            margin: 30,
            backgroundColor: "white",
            borderRadius: 30,
            padding: 20
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 7 }}>{news.title}</Text>
          <Text style={{ fontSize: 16 }}>{news.details}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default SingleNewsScreen;
