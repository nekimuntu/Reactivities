import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../../common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup"
import ValidationError from "../error/ValidationError";

function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: "",  password: "",displayName: "", username: "", error: null }}
            onSubmit={(values, { setErrors }) =>
                (userStore.register(values)).catch((error) => 
                    setErrors({ error }))
            }
            validationSchema={Yup.object({                
                email: Yup.string().required(),
                password: Yup.string().required("Please provide a valid password"),
                username: Yup.string().required(),
                displayName: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => {
                return (
                    <Form
                        className="ui form error"
                        onSubmit={handleSubmit}
                        autoComplete="off">
                        <Header as="h2" content="Signup to Reactivities" color="teal" textAling="center" />
                        <MyTextInput placeholder="email" name="email" />
                        <MyTextInput id="password" placeholder="Password" name="password" type="password"/>
                        <MyTextInput placeholder="Display Name" name="displayName" />
                        <MyTextInput placeholder="Username" name="username" />   
                        <ErrorMessage
                            name="error" render={ () =>
                                <ValidationError errors={errors.error} />
                            } />
                        <Button loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            positive
                            content="Register"
                            type="submit"
                            fluid />
                    </Form>
                );
            }}
        </Formik>
    )
}

export default observer(RegisterForm)