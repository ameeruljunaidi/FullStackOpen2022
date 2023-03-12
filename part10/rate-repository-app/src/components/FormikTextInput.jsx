import { StyleSheet, View } from "react-native"
import { useField } from "formik"

import TextInput from "./TextInput"
import Text from "./Text"

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginHorizontal: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 4,
    },
    mainDefault: {
        borderColor: "black",
    },
    mainError: {
        borderColor: "red",
    },
    errorText: {
        marginTop: 5,
        marginHorizontal: 12,
        color: "red"
    }
})

const FormikTextInput = ({ name, ...props}) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    const errorMessage = showError && meta.error[0].toUpperCase() + meta.error.substring(1);

    return (
        <View>
            <TextInput
                style={showError ? [styles.main, styles.mainError] : [styles.main, styles.mainDefault]}
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    )
}

export default FormikTextInput;