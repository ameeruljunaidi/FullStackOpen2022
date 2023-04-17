import { View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Pressable } from "react-native";
import Text from "./Text";
import { Formik } from "formik";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

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

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Minimum username length is 1 character")
    .max(30, "Maximum username length is 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum password length is 5 characters")
    .max(50, "Maximum password length is 50 characters"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Password confirm is required"),
});

// validationSchema: Yup.object({
//     password: Yup.string().required('Password is required'),
//     passwordConfirm: Yup.string()
//        .oneOf([Yup.ref('password'), null])
//        .required('Password confirm is required')
//   })
// source: https://github.com/jaredpalmer/formik/issues/90#issuecomment-354873201

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" style={styles.submitText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      const { data: signUpData } = await signUp({ username, password });

      if (signUpData) {
        const { data: signInData } = await signIn({ username, password });

        if (signInData) navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
