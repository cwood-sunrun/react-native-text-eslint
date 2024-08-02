import React from "react";
import { Text, View } from "react-native";

export function Second() {
  const test = () => 4;
  return <View>{test()}</View>;
}
