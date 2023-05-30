import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = repositoryId => {
  console.log("repositoryId in hook", repositoryId);

  const variables = { repositoryId, first: 4 };

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cached-and-network",
    variables: variables,
    onCompleted: data => console.log("data on complete", data),
    onError: error => console.log("error getting repo", error),
  });

  console.log("data in hook", data);
  console.log("error in hook", error);

  const repository = data && data.repository;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });

    console.log("Fetched more in hook");
  };

  return { repository, loading, error, fetchMore: handleFetchMore };
};

export default useRepository;
