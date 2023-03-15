import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import useMe from "../hooks/useMe";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const styles = StyleSheet.create({
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
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" style={styles.submitText}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const { me, meLoading } = useMe();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log("Access token: ", data);

      if (data) navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  console.log("🚀 | file: SignIn.jsx:77 | me:", me);

  if (meLoading) {
    return <Text>Loading...</Text>;
  }

  if (me) {
    return <Text>{me.username} signed in.</Text>;
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
