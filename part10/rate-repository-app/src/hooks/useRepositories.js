import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     // Replace the IP address part with your own IP address!
//     const response = await fetch("http://192.168.1.64:5001/api/repositories");
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const variables = { orderBy, orderDirection, searchKeyword, first: 4 };

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: "cache-and-network",
  });

  const repositories = data && data.repositories;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repositories, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;
