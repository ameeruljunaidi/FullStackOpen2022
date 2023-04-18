import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import TextInput from "./TextInput";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  main: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
  },
  mainDefault: {
    borderColor: "black",
  },
});

// const repositories = [
//   {
//     id: "jaredpalmer.formik",
//     fullName: "jaredpalmer/formik",
//     description: "Build forms in React, without the tears",
//     language: "TypeScript",
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
//   },
//   {
//     id: "rails.rails",
//     fullName: "rails/rails",
//     description: "Ruby on Rails",
//     language: "Ruby",
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
//   },
//   {
//     id: "django.django",
//     fullName: "django/django",
//     description: "The Web framework for perfectionists with deadlines.",
//     language: "Python",
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
//   },
//   {
//     id: "reduxjs.redux",
//     fullName: "reduxjs/redux",
//     description: "Predictable state container for JavaScript apps",
//     language: "TypeScript",
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
//   },
// ];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryHeader = ({ selectedSort, setSelectedSort, search, setSearch }) => {
  return (
    <View>
      <TextInput
        style={[styles.main, styles.mainDefault]}
        onChangeText={value => setSearch(value)}
        value={search}
        placeholder="Search"
      />
      <Picker
        mode="dialog"
        selectedValue={selectedSort}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedSort(itemValue);
          console.log("selected sort changed to", itemValue, itemIndex);
        }}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, selectedSort, setSelectedSort, search, setSearch }) => {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <RepositoryHeader
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          search={search}
          setSearch={setSearch}
        />
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState("latest");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const map = {
    latest: { orderBy: "CREATED_AT", orderDirection: "DESC", searchKeyword: debouncedSearch },
    highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword: debouncedSearch },
    lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword: debouncedSearch },
  };

  const { repositories } = useRepositories(map[selectedSort]);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default RepositoryList;
