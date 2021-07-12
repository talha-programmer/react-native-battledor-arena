import { Button, View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Links } from "../config/Api";
import { ActivityIndicator } from "react-native";


const Home = ({ navigation }) => {

  

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button title="Clubs" onPress={()=>navigation.push('Clubs')}/>
      <Button title="Matches" onPress={()=>navigation.push('Matches')}/>
      <Button title="Players" onPress={()=>navigation.push('Players')}/>
    </View>
  );

};

export default Home;
