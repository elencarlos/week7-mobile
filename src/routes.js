import React from "react";
import { Image } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Feed from "./pages/Feed";
import New from "./pages/New";

import logo from "./assets/logo.png";

export default createAppContainer(
   createStackNavigator(
      {
         Feed,
         New
      },
      {
         defaultNavigationOptions: {
            headerTitle: (
               <Image style={{ marginHorizontal: 20 }} source={logo} />
            ),
            headerTintColor: "#000",
            headerBackTitle: null
         },
         mode: "modal"
      }
   )
);
