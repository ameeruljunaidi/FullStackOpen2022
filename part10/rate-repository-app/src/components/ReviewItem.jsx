import Text from "./Text";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import format from "date-fns/format";

const borderSize = 42;

const style = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    padding: 8,
    flexDirection: "column",
  },
  separator: {
    height: 10,
  },
  score: {
    display: "flex",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    width: borderSize,
    height: borderSize,
    borderRadius: borderSize / 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    padding: 8,
  },
  header: {
    display: "flex",
    marginVertical: 16,
  },
  review: {
    marginRight: 72,
  },
});

const ReviewItem = item => {
  const review = item.review;

  console.log("review in review", review);

  const date = format(new Date(review.createdAt), "mm.dd.yyyy");

  return (
    <View style={style.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={style.score}>
            <Text fontWeight="bold">{review.rating}</Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={style.header}>
            <Text fontWeight="bold">{review.user.username}</Text>
            <Text>{date}</Text>
          </View>
          <View style={style.review}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
