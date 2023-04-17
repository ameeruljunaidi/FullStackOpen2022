import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    await mutate({
      variables: { user: { username, password } },
      onCompleted: data => console.log("user created", data),
      onError: error => console.log("error creating user", error),
    });

    return { data: result };
  };

  return [signUp, result];
};

export default useSignUp;
