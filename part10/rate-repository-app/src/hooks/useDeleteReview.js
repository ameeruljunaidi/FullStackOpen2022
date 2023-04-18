import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { GET_ME } from "../graphql/queries";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ reviewId }) => {
    await mutate({
      variables: { deleteReviewId: reviewId },
      refetchQueries: [
        {
          query: GET_ME,
          variables: { includeReviews: true },
        },
      ],
    });
  };

  return [deleteReview, result];
};

export default useDeleteReview;
