import { Text, View, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tab: {
    color: "white",
    padding: 12,
    fontWeight: "bold",
    fontSize: 16,
  },
});

const AppBarTab = ({ name, path, onPress }) => {
  return (
    <View>
      <Link to={path} onPress={onPress}>
        <Text style={styles.tab}>{name}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
