import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import useMe from "../hooks/useMe";
import { useApolloClient } from "@apollo/client";
import { useAuthStorage } from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
});

const AppBar = () => {
  const { me, meLoading } = useMe();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name={"Repositories"} path="/" />
        {!meLoading && !me && <AppBarTab name={"Sign In"} path="/signin" />}
        {!meLoading && me && <AppBarTab name={"Sign Out"} onPress={signOut} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
