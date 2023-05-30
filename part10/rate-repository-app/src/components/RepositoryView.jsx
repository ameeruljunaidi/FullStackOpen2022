import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

const style = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={style.separator} />;

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository(id);

  console.log("repo in view", repository);

  if (loading) return <Text>Loading</Text>;

  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  const onEndReached = () => {
    fetchMore();
    console.log("Got more reviews");
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} showButton={true} />}
      onEndReached={onEndReached}
    />
  );
};

export default RepositoryView;
