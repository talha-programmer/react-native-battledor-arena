import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Indicator = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  );
};

export default Indicator;
