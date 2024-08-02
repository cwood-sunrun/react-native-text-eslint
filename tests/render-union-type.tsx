import React from "react";
import { Text, View } from "react-native";

export function Second() {
  const test = () => {
    return Math.random() > 0.5 ? "string" : null;
  };
  return <View>{test()}</View>;
}
