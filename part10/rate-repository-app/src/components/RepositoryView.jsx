import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  console.log("repo in view", repository);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return <RepositoryItem repository={repository} showButton={true} />;
};

export default RepositoryView;
