import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import { useAuthStorage } from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    await mutate({
      variables: { credentials: { username, password } },
      onCompleted: async data => {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
      },
    });

    const data = await authStorage.getAccessToken();
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
