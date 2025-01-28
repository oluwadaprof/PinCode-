import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { MotiView } from "moti";

const { width } = Dimensions.get("window");

const pinLength = 4;
const pinContainerSize = width / 2;
const pinMaxSize = pinContainerSize / pinLength;
const _pinSpacing = 10;
const pinSize = pinMaxSize - _pinSpacing * 2;

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const _spacing = 20;

type Props = {
  onPress: (item: (typeof dialPad)[number]) => void;
};

function DialPad({ onPress }: Props) {
  return (
    <FlatList
      numColumns={3}
      data={dialPad}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{ gap: _spacing }}
      columnWrapperStyle={{ gap: _spacing }}
      scrollEnabled={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={item === ""}
            onPress={() => {
              onPress(item);
            }}
          >
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize,
                borderWidth: typeof item !== "number" ? 0 : 1,
                borderColor: "black",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item === "del" ? (
                <Text>del</Text>
              ) : (
                // <Ionicons
                //   name="backspace-outline"
                //   color={"black"}
                //   size={dialPadTextSize}
                // />
                <Text style={{ fontSize: dialPadTextSize }}>{item}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default function App() {
  const [code, setCode] = useState<number[]>([]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: _pinSpacing * 2,
          marginBottom: _spacing * 2,
          // backgroundColor: "green",
          height: pinSize * 2,
          alignItems: "flex-end",
        }}
      >
        {[...Array(pinLength).keys()].map((i) => {
          const isSelected = !!code[i];
          return (
            <MotiView
              key={`pin-${i}`}
              style={{
                width: pinSize,
                borderRadius: pinSize,
                backgroundColor: "red",
              }}
              transition={{
                type: "timing",
                duration: 200,
              }}
              animate={{
                height: isSelected ? pinSize : 2,
                marginBottom: isSelected ? pinSize / 2 : 0
              }}
            ></MotiView>
          );
        })}
      </View>
      <DialPad
        onPress={(item) => {
          if (item === "del") {
            setCode((prevCode) => prevCode.slice(0, prevCode.length - 1));
          } else if (typeof item === "number") {
            if(code.length === pinLength) return
            setCode((prevCode) => [...prevCode, item]);
          }
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
