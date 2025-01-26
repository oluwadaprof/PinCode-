import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LuDelete } from "react-icons/lu";

const { width } = Dimensions.get("window");

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const _spacing = 20;

function DialPad() {
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
              console.log(item);
            }}
          >
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize,
                borderWidth: item === "" ? 0 : 1,
                borderColor: "black",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item === "del" ? (
                <LuDelete />
                // <Ionicons
                //   name="backspace-outline"
                //   color={"black"}
                //   size={dialPadTextSize}
                // />
              ) : (
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
  return (
    <View style={styles.container}>
      <DialPad />
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
