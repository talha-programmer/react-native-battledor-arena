import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from "react-native";
import React from "react";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHockeyPuck,
  faRunning,
  faVolleyballBall,
  faTableTennis
} from "@fortawesome/free-solid-svg-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Carousel from "react-native-snap-carousel";
import { useState, useEffect } from "react";
import Indicator from "../Components/Indicator";
import { Links } from "../config/Api";

const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(Links.news, {
      method: "GET",
      Accept: "application/json",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => setNews(json.news))
      .catch((error) => {})
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          height: 250,
          padding: 20,
          marginRight: 25
        }}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        onPress={() => navigation.navigate("SingleNews", { newsId: item.id })}
      >
        <View>
          <Text style={{ fontSize: 20, marginBottom: 7 }}>
            {item.title.split(" ").splice(0, 10).join(" ").concat("...")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {item.details.split(" ").splice(0, 45).join(" ").concat("...")}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "white",
          marginVertical: 10,
          borderRadius: 30
        }}
      >
        <View style={{ flex: 1, flex: 0.6, marginRight: 10 }}>
          <Image
            source={require("../assets/icon.png")}
            style={{
              height: 70,
              width: 70,
              resizeMode: "contain",
              alignSelf: "flex-end"
            }}
          />
        </View>
        <Text style={{ fontSize: 30, marginTop: 15, color: Colors.primary }}>
          Battledor Arena
        </Text>
      </View>

      <View style={{ flex: 1, marginBottom: 20 }}>
        <SwiperFlatList autoplay autoplayDelay={3} index={5} autoplayLoop>
          <View style={styles.sliderChild}>
            <Image
              style={styles.sliderImage}
              source={require("../assets/header-image.jpg")}
            />
          </View>
          <View style={styles.sliderChild}>
            <Image
              style={styles.sliderImage}
              source={require("../assets/header-image-1.jpg")}
            />
          </View>
          <View style={styles.sliderChild}>
            <Image
              style={styles.sliderImage}
              source={require("../assets/header-image-2.jpg")}
            />
          </View>
          <View style={styles.sliderChild}>
            <Image
              style={styles.sliderImage}
              source={require("../assets/header-image-3.jpg")}
            />
          </View>
          <View style={styles.sliderChild}>
            <Image
              style={styles.sliderImage}
              source={require("../assets/header-image-4.jpg")}
            />
          </View>
          <View style={styles.sliderChild}>
            <Image
              style={styles.sliderImage}
              source={require("../assets/header-image-5.jpg")}
            />
          </View>
        </SwiperFlatList>
      </View>

      <View
        style={{
          paddingVertical: 20,
          backgroundColor: "white",
          borderRadius: 30,
          marginHorizontal: 20,
          marginBottom: 20
        }}
      >
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate("Clubs")}
          >
            <View style={styles.categoryIcon}>
              <FontAwesomeIcon icon={faHockeyPuck} size={32} color="white" />
            </View>
            <Text style={styles.categoryBtnTxt}>Clubs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate("Players")}
          >
            <View style={styles.categoryIcon}>
              <FontAwesomeIcon icon={faRunning} size={32} color="white" />
            </View>
            <Text style={styles.categoryBtnTxt}>Players</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.categoryContainer]}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("Matches");
            }}
          >
            <View style={styles.categoryIcon}>
              <FontAwesomeIcon icon={faTableTennis} size={32} color="white" />
            </View>
            <Text style={styles.categoryBtnTxt}>Matches</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("Tournaments");
            }}
          >
            <View style={styles.categoryIcon}>
              <FontAwesomeIcon
                icon={faVolleyballBall}
                size={32}
                color="white"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Tournaments</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginLeft: 25, marginBottom: 30 }}>
        <Text style={{ fontSize: 22, marginVertical: 20 }}>Latest News</Text>
        {isLoading ? (
          <Indicator />
        ) : (
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Carousel
              layout={"default"}
              data={news}
              sliderWidth={300}
              itemWidth={300}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  sliderChild: {
    width,
    justifyContent: "center",
    height: 220
  },
  sliderImage: { resizeMode: "cover", width: "100%", height: "100%" },

  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 30
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center"
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: Colors.primary,
    borderRadius: 50
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: Colors.primary
  }
});

export default Home;
