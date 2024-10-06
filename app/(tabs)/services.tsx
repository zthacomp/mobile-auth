import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { LinkedServices } from "@/components/linkedServices";

const services = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Servicos vinculados</Text>
      <View style={styles.content}>
        <LinkedServices
          title="Cardeneta Digital"
          image={require("../../assets/images/Logo.png")}
          inscription="30/09/2024"
          access="02/10/2024"
          time="10:23"
        />
        <LinkedServices
          title="Cardeneta Digital"
          image={require("../../assets/images/Logo.png")}
          inscription="30/09/2024"
          access="02/10/2024"
          time="10:23"
        />
        <LinkedServices
          title="Cardeneta Digital"
          image={require("../../assets/images/Logo.png")}
          inscription="30/09/2024"
          access="02/10/2024"
          time="10:23"
        />
      </View>
    </View>
  );
};

export default services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "5%",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 25,
    fontFamily: "Inter_700Bold",
    paddingTop: "15%",
    paddingBottom: "5%",
  },
});
