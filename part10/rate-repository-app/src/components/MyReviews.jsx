import { View } from "react-native";
import Text from "./Text";
import useMe from "../hooks/useMe";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={style.separator} />;

const MyReviews = () => {
  const { me, meLoading } = useMe({ includeReviews: true });

  console.log("meLoading in my review", meLoading);

  if (meLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!me) {
    return (
      <View>
        <Text>Cannot retrieve legged in user...</Text>
      </View>
    );
  }

  console.log("me in my reviews", me);
  const reviews = me && me.reviews ? me.reviews.edges.map(edge => edge.node) : [];

  console.log("reviews in my review", reviews);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
