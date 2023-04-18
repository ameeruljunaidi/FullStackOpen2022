import Text from "./Text";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import format from "date-fns/format";
import { Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const borderSize = 42;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    padding: 8,
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
  submitButton: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    marginTop: 24,
    borderRadius: 4,
  },
  submitText: {
    color: "white",
    textAlign: "center",
  },
  viewRepo: {
    backgroundColor: "#0265d4",
  },
  deleteRepo: {
    backgroundColor: "red",
  },
});

const ReviewItem = ({ review, action }) => {
  const navigate = useNavigate();
  const [deleteReviewMutation] = useDeleteReview();

  console.log("review in review", review);

  const date = format(new Date(review.createdAt), "mm.dd.yyyy");

  const viewRepo = () => {
    console.log("view repo", review.repositoryId);
    navigate(`/repository/${review.repositoryId}`);
  };

  const confirmDelete = () =>
    Alert.alert("Delete review", "Are you sure you can to delete review?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Delete", onPress: () => deleteReviewMutation({ reviewId: review.id }) },
    ]);

  const deleteReview = () => {
    console.log("delete review", review.id);
    confirmDelete();
  };

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={styles.score}>
            <Text fontWeight="bold">{review.rating}</Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={styles.header}>
            <Text fontWeight="bold">{review.user.username}</Text>
            <Text>{date}</Text>
          </View>
          <View style={styles.review}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      {action && (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
          <Pressable onPress={viewRepo} style={[styles.submitButton, styles.viewRepo]}>
            <Text fontWeight="bold" style={styles.submitText}>
              View repository
            </Text>
          </Pressable>
          <Pressable onPress={deleteReview} style={[styles.submitButton, styles.deleteRepo]}>
            <Text fontWeight="bold" style={styles.submitText}>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
