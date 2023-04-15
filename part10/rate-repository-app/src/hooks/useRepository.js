import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = repositoryId => {
  console.log("repositoryId in hook", repositoryId);

  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "network-only",
    variables: { repositoryId },
    onCompleted: data => console.log("data on complete", data),
    onError: error => console.log("error getting repo", error),
  });

  console.log("data in hook", data);
  console.log("error in hook", error);

  const repository = data && data.repository;

  return { repository, loading, error };
};

export default useRepository;
