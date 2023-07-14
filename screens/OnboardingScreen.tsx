import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ["#18D8C8", "#17cfbf", "#70D2E6", "#70E6AB", "#0D9589"];
const image3d = [
  require("../assets/images/webp/3d/join1.webp"),
  require("../assets/images/webp/3d/join2.webp"),
  require("../assets/images/webp/3d/events1.webp"),
  require("../assets/images/webp/3d/events2.webp"),
  require("../assets/images/webp/3d/payment1.webp"),
  require("../assets/images/webp/3d/payment2.webp"),
  require("../assets/images/webp/3d/jobs1.webp"),
  require("../assets/images/webp/3d/job2.webp"),
  require("../assets/images/webp/3d/train1.webp"),
  require("../assets/images/webp/3d/training2.webp"),
];
const onboardingInfo = [
  {
    key: "3571572",
    title: "Search and Join Professional Bodies",
    description:
      "Search and join any professional body that interests you, or have a background  in, in other to expand your network.",
    image: [image3d[0], image3d[1]],
  },
  {
    key: "3571747",
    title: "Find and Attend Conferences & Events",
    description:
      "Find and attend conferences, events, summits of topics that intriges you",
    image: [image3d[2], image3d[3]],
  },
  {
    key: "3571680",
    title: "Online Payment and E-tickets",
    description:
      "Conveinent Payments options and E-tickets for conferences or events with such requirement",
    image: [image3d[4], image3d[5]],
  },
  {
    key: "3571603",
    title: "Job Board ",
    description:
      "Organisation specific job opening, get access to job post from companies looking for professionals",
    image: [image3d[6], image3d[7]],
  },
  {
    key: "357160377",
    title: "Training and Certification",
    description:
      "Get access to a plethora of trainings and certifications to increase your craft profeciency and job prospects ",
    image: [image3d[8], image3d[9]],
  },
];

function Indicator({ scrollX }: any) {
  return (
    <View style={{ position: "absolute", bottom: 100, flexDirection: "row" }}>
      {onboardingInfo.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1.2, 0.6],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              opacity,
              margin: 5,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
}
function BackDrop({ scrollX }: any) {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
}

function Square({ scrollX }: any) {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [{ rotate }, { translateX }],
      }}
    />
  );
}
export default function App() {
  const [counter, setCounter] = React.useState(60);

  // Third Attempts

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 10000);
  }, [counter]);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnimOut = React.useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => fadeOut());
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  const fadeInOut = () => {
    // Will change fadeAnimOut value to 0 in 5 seconds
    Animated.timing(fadeAnimOut, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => fadeOutOut());
  };
  let lock = false;
  const handleFadder = () => {
    if (!lock) {
      lock = true;
      const handler = setTimeout(() => {
        fadeIn(), fadeInOut();
        lock = false;
      }, 2000);
      return () => {
        clearTimeout(handler);
      };
    }
    return;
  };

  const fadeOutOut = () => {
    // Will change fadeAnimOut value to 1 in 3 seconds
    Animated.timing(fadeAnimOut, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        horizontal
        scrollEventThrottle={32}
        pagingEnabled
        onScrollEndDrag={() => handleFadder()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsHorizontalScrollIndicator={false}
        data={onboardingInfo}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const isEnd = index === onboardingInfo.length - 1;
          return (
            <>
              <View style={{ width, alignItems: "center", padding: 20 }}>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Animated.Image
                    source={item.image[0]}
                    style={{
                      width: width / 1.2,
                      height: width,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View style={{ flex: 0.3 }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "800",
                      fontSize: 26.5,
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ color: "white", fontWeight: "300", fontSize: 14 }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              {isEnd && (
                <Pressable style={styles.nextBtn}>
                  <FontAwesome5 name="arrow-right" size={24} color="black" />
                </Pressable>
              )}
            </>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
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
  nextBtn: {
    position: "absolute",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 50,
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
