import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

// {
//     id: 'jaredpalmer.formik',
//     fullName: 'jaredpalmer/formik',
//     description: 'Build forms in React, without the tears',
//     language: 'TypeScript',
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
// },

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
  },
  avatar: {
    width: 42,
    height: 42,
    margin: 12,
    borderRadius: 4,
  },
  detail: {
    margin: 12,
    marginLeft: 0,
  },
  detailItem: {
    padding: 4,
  },
  language: {
    alignSelf: "flex-start",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 8,
  },
  languageText: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 4,
  },
  summary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 12,
    marginTop: 4,
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  showRepoButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: "#0265d4",
    borderRadius: 4,
    color: "white",
    alignItems: "center",
  },
});

const RepositoryItem = ({ repository, showButton }) => {
  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository;

  const navigate = useNavigate();

  const onShowRepoPress = () => {
    console.log("going to repo url");
    Linking.openURL(url);
  };

  const onCardPress = () => {
    console.log("going to repo view");
    navigate(`/repository/${id}`);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <Pressable onPress={onCardPress}>
        {/* Top */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
          <View style={styles.detail}>
            <Text fontWeight={"bold"} style={styles.detailItem}>
              {fullName}
            </Text>
            <Text style={styles.detailItem}>{description}</Text>
            <View style={styles.language}>
              <Text fontWeight={"bold"} style={styles.languageText}>
                {language}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom */}
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text fontWeight={"bold"} style={{ marginBottom: 8 }}>
              {parseFloat(stargazersCount / 1000).toFixed(1)}k
            </Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text fontWeight={"bold"} style={{ marginBottom: 8 }}>
              {parseFloat(forksCount / 1000).toFixed(1)}k
            </Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text fontWeight={"bold"} style={{ marginBottom: 8 }}>
              {reviewCount}
            </Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text fontWeight={"bold"} style={{ marginBottom: 8 }}>
              {ratingAverage}
            </Text>
            <Text>Rating</Text>
          </View>
        </View>
      </Pressable>

      {/* Show Repo Button */}
      {showButton && (
        <Pressable onPress={onShowRepoPress} style={styles.showRepoButton}>
          <Text fontWeight="bold" style={styles.showRepoButton}>
            Open in Github
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
