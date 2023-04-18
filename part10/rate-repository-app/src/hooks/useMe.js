import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useMe = ({ includeReviews }) => {
  const { data, loading, error } = useQuery(GET_ME, {
    variables: { includeReviews },
    fetchPolicy: "network-only",
    onCompleted: data => console.log("getMe data: ", data),
  });

  const me = data && data.me;
  const meLoading = loading;
  const meError = error;

  return { me, meLoading, meError };
};

export default useMe;
