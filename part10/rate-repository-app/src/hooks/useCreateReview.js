import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repoOwnerName, repoName, repoRating, repoReview }) => {
    const review = {
      ownerName: repoOwnerName,
      rating: repoRating,
      repositoryName: repoName,
      text: repoReview,
    };

    await mutate({
      variables: { review },
      onCompleted: data => console.log("added a new review", data),
      onError: error => console.log("error adding review", error),
    });
  };

  return [createReview, result];
};

export default useCreateReview;
