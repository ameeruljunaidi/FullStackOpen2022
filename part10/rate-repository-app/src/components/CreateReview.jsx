import Text from "./Text";
import { View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

const styles = {
  container: {
    display: "flex",
    backgroundColor: "white",
  },
  submitButton: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: "#0265d4",
    borderRadius: 4,
  },
  submitText: {
    color: "white",
    textAlign: "center",
  },
};

const validationSchema = yup.object().shape({
  repoOwnerName: yup.string().required(),
  repoName: yup.string().required(),
  repoRating: yup
    .number()
    .required("Rating is required")
    .typeError("Please enter a valid number")
    .positive("Rating has to a positive number")
    .integer("Please enter a valid rating")
    .min(0, "Minimum rating is 0")
    .max(100, "Maximum rating is 100"),
  repoReview: yup.string().nullable(),
});

const initialValues = {
  repoOwnerName: "",
  repoName: "",
  repoRating: "",
  repoReview: "",
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="repoOwnerName" placeholder="Repository owner name" />
      <FormikTextInput name="repoName" placeholder="Repository name" />
      <FormikTextInput name="repoRating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="repoReview" placeholder="Review" multiline />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" style={styles.submitText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async values => {
    const review = { ...values, repoRating: parseInt(values.repoRating) };

    try {
      await createReview(review);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
