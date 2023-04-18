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
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  const repositories = data && data.repositories;

  return { repositories, loading, error };
};

export default useRepositories;
